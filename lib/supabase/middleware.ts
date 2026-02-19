import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // max requests per window

export function createClient(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        }
    );

    return { supabase, response };
}

export async function updateSession(request: NextRequest) {
    // Get client IP for rate limiting
    const clientIP = request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown";

    // Rate limiting check
    const now = Date.now();
    const clientData = rateLimitMap.get(clientIP);

    if (clientData) {
        if (now - clientData.timestamp < RATE_LIMIT_WINDOW) {
            if (clientData.count >= RATE_LIMIT_MAX) {
                return new NextResponse("Too Many Requests", { status: 429 });
            }
            clientData.count++;
        } else {
            rateLimitMap.set(clientIP, { count: 1, timestamp: now });
        }
    } else {
        rateLimitMap.set(clientIP, { count: 1, timestamp: now });
    }

    const { supabase, response } = createClient(request);

    // Verify user session
    await supabase.auth.getUser();

    // Add security headers to response
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return response;
}
