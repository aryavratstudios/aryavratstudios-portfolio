import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    // 1. Digital Firewall & Session Management
    // This handles rate limiting, security headers, and session refreshing (Fixes Deprecation)
    const response = await updateSession(request);

    // 2. Custom Business Logic (e.g. Admin Protection)
    // Note: session is refreshed inside updateSession. We can check the path here or inside updateSession.
    // For clean architecture, we'll keep the session update and base security in updateSession
    // and route-specific redirects can stay here or in layout.tsx.

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images/logos (static assets)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
