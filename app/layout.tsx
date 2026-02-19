import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AiAssistant } from "@/components/ai-assistant";
import MouseFollower from "@/components/mouse-follower";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "AryavratHQ | Premium Digital Solutions",
  description: "Crafting high-performance digital experiences with premium design and robust engineering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-black text-white selection:bg-primary selection:text-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
        >
          <MouseFollower />
          {children}
          <AiAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
