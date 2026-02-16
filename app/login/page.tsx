"use client";

import { login, signup } from "./actions";
import { createBrowserClient } from "@supabase/ssr";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button"; // Will create this later, use standard HTML for now or inline styles
import { Input } from "@/components/ui/input"; // Will create this later
import { Label } from "@/components/ui/label"; // Will create this later
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Will create this later
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Will create this later
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Will create this later
import { Loader2 } from "lucide-react";
import Image from "next/image";

// Since I haven't created the UI components yet, I will create a basic version first.
// Wait, I should create the UI components first to make it look good as per "Rich Aesthetics".
// I'll create the UI components after this. For now, I'll use standard Tailwind classes.

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}

function LoginForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    const handleGoogleLogin = async () => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-md space-y-8 glass-card p-8 rounded-2xl animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-black"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
                    <p className="text-sm text-zinc-400">Enter your credentials to access the portal</p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md text-center">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="p-3 text-sm text-green-500 bg-green-500/10 border border-green-500/20 rounded-md text-center">
                        {message}
                    </div>
                )}

                <div className="grid gap-6">
                    <form>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none text-zinc-300" htmlFor="email">Email</label>
                                <input className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-white transition-all hover:bg-white/10" id="email" name="email" placeholder="name@example.com" type="email" required />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none text-zinc-300" htmlFor="password">Password</label>
                                <input className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-white transition-all hover:bg-white/10" id="password" name="password" type="password" required />
                            </div>
                            <button formAction={login} className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-black hover:bg-primary/90 h-11 px-4 py-2 w-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">Sign In</button>
                            <button formAction={signup} className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/10 bg-transparent hover:bg-white/5 text-white h-11 px-4 py-2 w-full">Create Account</button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black/40 px-2 text-zinc-500 backdrop-blur-md rounded-full">Or continue with</span>
                        </div>
                    </div>

                    <button onClick={handleGoogleLogin} className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/10 bg-white/5 hover:bg-white/10 text-white h-11 px-4 py-2 w-full group">
                        <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
}
