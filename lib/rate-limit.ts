/**
 * Simple in-memory rate limiter for server actions
 * Note: This resets on server restart - for production use Upstash Redis or similar
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store - use Upstash Redis for production
const rateLimitStore = new Map<string, RateLimitEntry>();

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
 * Get rate limit key for a user
 */
function getKey(identifier: string, action: string): string {
    return `${action}:${identifier}`;
}

/**
 * Check if request is allowed under rate limit
 * Returns { allowed: boolean, remaining: number, resetIn: number }
 */
export function checkRateLimit(identifier: string, action: string): {
    allowed: boolean;
    remaining: number;
    resetIn: number;
} {
    const config = RATE_LIMITS[action] || RATE_LIMITS.default;
    const key = getKey(identifier, action);
    const now = Date.now();
    
    const entry = rateLimitStore.get(key);
    
    // No existing entry - allow request
    if (!entry || now > entry.resetTime) {
        const resetTime = now + config.windowMs;
        rateLimitStore.set(key, {
            count: 1,
            resetTime
        });
        
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs
        };
    }
    
    // Check if limit exceeded
    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: entry.resetTime - now
        };
    }
    
    // Increment count
    entry.count++;
    
    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetIn: entry.resetTime - now
    };
}

/**
 * Server action wrapper with rate limiting
 */
export function withRateLimit<T extends (...args: any[]) => any>(
    action: string,
    identifier: string,
    fn: T
): ReturnType<T> {
    const result = checkRateLimit(identifier, action);
    
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
        context: ClassMethodDecoratorContext
    ) {
        const originalFn = target;
        
        const wrappedFn = function (...args: any[]) {
            const result = checkRateLimit(identifier, action);
            
            if (!result.allowed) {
                const resetInSeconds = Math.ceil(result.resetIn / 1000);
                throw new Error(`Rate limit exceeded. Please try again in ${resetInSeconds} seconds.`);
            }
            
            return originalFn.apply(this, args);
        };
        
        return wrappedFn;
    };
}
