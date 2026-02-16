import Navbar from "@/components/navbar";
import Link from "next/link";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <footer className="border-t border-white/5 py-12 px-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} Aryavrat Studio. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <Link href="/terms" className="text-sm text-zinc-500 hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="text-sm text-zinc-500 hover:text-primary transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
