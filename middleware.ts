import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const { data: { user } } = await supabase.auth.getUser();

    // Protected Route: /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user || !user.email) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // 1. Check strict whitelist first (Super Admins) - imported helper would be ideal but middleware runtimes can be tricky with imports.
        // We will duplicate the list here for middleware safety or fetch from a shared config if possible.
        // For now, let's strictly check the database role OR the whitelist.

        const ALLOWED_ADMIN_EMAILS = [
            "karn.abhinav00@gmail.com",
            "abhinavytagain666@gmail.com",
            "inkly412@gmail.com",
            "aryavrat.studios@gmail.com"
        ];

        const isWhitelisted = ALLOWED_ADMIN_EMAILS.includes(user.email);

        // Fetch user role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        const isAdmin = profile?.role === 'admin' || isWhitelisted;

        if (!isAdmin) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
