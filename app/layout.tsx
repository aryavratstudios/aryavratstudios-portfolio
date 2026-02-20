import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AiAssistant } from "@/components/ai-assistant";
import MouseFollower from "@/components/mouse-follower";
import { BackgroundVibe } from "@/components/home/background-vibe";
import { CustomCursor } from "@/components/ui/custom-cursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "AryavratHQ | Premium Digital Solutions",
  description: "Crafting high-performance digital experiences with premium design and robust engineering.",
  metadataBase: new URL("https://aryavrat.vercel.app"), // Placeholder, usually replaced by env var
  openGraph: {
    title: "AryavratHQ | Premium Digital Solutions",
    description: "Crafting high-performance digital experiences with premium design and robust engineering.",
    url: "https://aryavrat.vercel.app",
    siteName: "AryavratHQ",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "AryavratHQ Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AryavratHQ | Premium Digital Solutions",
    description: "Crafting high-performance digital experiences with premium design and robust engineering.",
    images: ["/logo.jpg"],
  },
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
          <CustomCursor />
          <BackgroundVibe />
          {children}
          <AiAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
