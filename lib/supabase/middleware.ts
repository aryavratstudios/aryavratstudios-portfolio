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
    // 1. Digital Firewall: Client IP Rate Limiting
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const now = Date.now();
    const clientData = rateLimitMap.get(clientIP);

    if (clientData) {
        if (now - clientData.timestamp < RATE_LIMIT_WINDOW) {
            if (clientData.count >= RATE_LIMIT_MAX) {
                // Potential Security Breach / DOS - Log to console (in real app, trigger Discord)
                console.warn(`[FIREWALL] Rate limit exceeded for IP: ${clientIP}`);
                return new NextResponse("Security Firewall: Too Many Requests", { status: 429 });
            }
            clientData.count++;
        } else {
            rateLimitMap.set(clientIP, { count: 1, timestamp: now });
        }
    } else {
        rateLimitMap.set(clientIP, { count: 1, timestamp: now });
    }

    const { supabase, response } = createClient(request);

    // 2. Refresh session / Get User
    const { data: { user } } = await supabase.auth.getUser();

    // 3. Admin Protection Logic (Integrated into updateSession for better performance)
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const ALLOWED_ADMINS = ["karn.abhinav00@gmail.com", "aryavrat.studios@gmail.com"];
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

        if (!ALLOWED_ADMINS.includes(user.email!) && profile?.role !== 'admin') {
            console.warn(`[FIREWALL] Unauthorized admin access attempt by ${user.email} from IP: ${clientIP}`);
            // This is where we could trigger a Discord Alert if it wasn't on the Edge.
            // Instead, we'll route to dashboard.
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // 4. Hardened Security Headers
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Content-Security-Policy", "upgrade-insecure-requests");

    return response;
}
