import Navbar from "@/components/navbar";

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
            <footer className="border-t border-white/5 py-8 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Aryavrat Studio. All rights reserved.
            </footer>
        </div>
    );
}
