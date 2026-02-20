import { createClient } from "@/lib/supabase/server";

/**
 * Persistent rate limiter using Supabase
 * Note: This replaces the in-memory store for better reliability in serverless environments.
 */

// In-memory fallback if Supabase fails
const fallbackStore = new Map<string, RateLimitEntry>();

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

/**
 * Rate limiter configuration
 */
interface RateLimitConfig {
    windowMs: number;  // Time window in milliseconds
    maxRequests: number;  // Max requests per window
}

/**
 * Default configurations for different endpoints
 */
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
    // Auth endpoints - strict limits
    "auth-login": { windowMs: 15 * 60 * 1000, maxRequests: 5 },      // 5 requests per 15 min
    "auth-signup": { windowMs: 60 * 60 * 1000, maxRequests: 3 },    // 3 requests per hour

    // Payment endpoints - very strict
    "payment": { windowMs: 10 * 60 * 1000, maxRequests: 3 },         // 3 payments per 10 min
    "checkout": { windowMs: 10 * 60 * 1000, maxRequests: 3 },

    // Coupon validation - prevent abuse
    "coupon": { windowMs: 60 * 1000, maxRequests: 10 },              // 10 validations per min

    // Admin actions - moderate limits
    "admin": { windowMs: 60 * 1000, maxRequests: 30 },                // 30 admin actions per min

    // Default for API routes
    "default": { windowMs: 60 * 1000, maxRequests: 60 },              // 60 per min
};


/**
 * Check if request is allowed under rate limit
 * Uses a basic token-bucket/counter logic in Supabase
 */
export async function checkRateLimit(identifier: string, action: string): Promise<{
    allowed: boolean;
    remaining: number;
    resetIn: number;
}> {
    const config = RATE_LIMITS[action] || RATE_LIMITS.default;
    const now = Date.now();
    const key = `${action}:${identifier}`;

    try {
        const supabase = await createClient();

        // 1. Cleanup old entries
        // Note: In production, this should be a cron or background task
        // but for high-security endpoints we check on write.

        // 2. Fetch current window status
        const { data: entry, error } = await supabase
            .from("rate_limits")
            .select("*")
            .eq("key", key)
            .single();

        if (error || !entry || now > new Date(entry.reset_at).getTime()) {
            const resetAt = new Date(now + config.windowMs).toISOString();

            if (!entry) {
                await supabase.from("rate_limits").insert({
                    key,
                    count: 1,
                    reset_at: resetAt
                });
            } else {
                await supabase.from("rate_limits").update({
                    count: 1,
                    reset_at: resetAt
                }).eq("key", key);
            }

            return {
                allowed: true,
                remaining: config.maxRequests - 1,
                resetIn: config.windowMs
            };
        }

        if (entry.count >= config.maxRequests) {
            return {
                allowed: false,
                remaining: 0,
                resetIn: new Date(entry.reset_at).getTime() - now
            };
        }

        // Increment
        await supabase.from("rate_limits")
            .update({ count: entry.count + 1 })
            .eq("key", key);

        return {
            allowed: true,
            remaining: config.maxRequests - (entry.count + 1),
            resetIn: new Date(entry.reset_at).getTime() - now
        };

    } catch (e) {
        console.warn("Rate limit database check failed, falling back to in-memory", e);
        return checkRateLimitFallback(identifier, action);
    }
}

/**
 * In-memory fallback logic
 */
function checkRateLimitFallback(identifier: string, action: string) {
    const config = RATE_LIMITS[action] || RATE_LIMITS.default;
    const key = `${action}:${identifier}`;
    const now = Date.now();

    const entry = fallbackStore.get(key);

    if (!entry || now > entry.resetTime) {
        const resetTime = now + config.windowMs;
        fallbackStore.set(key, { count: 1, resetTime });
        return { allowed: true, remaining: config.maxRequests - 1, resetIn: config.windowMs };
    }

    if (entry.count >= config.maxRequests) {
        return { allowed: false, remaining: 0, resetIn: entry.resetTime - now };
    }

    entry.count++;
    return { allowed: true, remaining: config.maxRequests - entry.count, resetIn: entry.resetTime - now };
}

/**
 * Server action wrapper with rate limiting
 */
export async function withRateLimit<T extends (...args: any[]) => any>(
    action: string,
    identifier: string,
    fn: T
): Promise<ReturnType<T>> {
    const result = await checkRateLimit(identifier, action);

    if (!result.allowed) {
        const resetInSeconds = Math.ceil(result.resetIn / 1000);
        throw new Error(`Rate limit exceeded. Please try again in ${resetInSeconds} seconds.`);
    }

    return fn();
}

/**
 * Simple decorator for Next.js server actions
 */
export function rateLimited(identifier: string, action: string) {
    return function <T extends (...args: any[]) => any>(
        target: T,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        context: ClassMethodDecoratorContext
    ) {
        const originalFn = target;

        const wrappedFn = async function (this: any, ...args: any[]) {
            const result = await checkRateLimit(identifier, action);

            if (!result.allowed) {
                const resetInSeconds = Math.ceil(result.resetIn / 1000);
                throw new Error(`Rate limit exceeded. Please try again in ${resetInSeconds} seconds.`);
            }

            return originalFn.apply(this, args);
        };

        return wrappedFn as unknown as T;
    };
}


