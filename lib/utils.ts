import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteUrl(request?: Request) {
  // 1. Explicit Env Override
  if (process?.env?.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    return url.includes("0.0.0.0") ? url.replace("0.0.0.0", "localhost") : url;
  }

  // 2. Request-based detection (Server-side)
  if (request) {
    const url = new URL(request.url);
    const host = request.headers.get("host") || url.host;
    const proto = request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
    const finalHost = host.includes("0.0.0.0") ? host.replace("0.0.0.0", "localhost") : host;
    return `${proto}://${finalHost}`;
  }

  // 3. Client-side detection
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // 4. Platform Envs (Netlify)
  if (process?.env?.URL) return process.env.URL.replace(/\/$/, "");

  // 5. Hardcoded fallback
  return "http://localhost:3000";
}
