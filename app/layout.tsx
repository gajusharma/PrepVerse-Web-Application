import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Providers from "@/components/providers/providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "ThinkPlus Education | Master Competitive Exams with Confidence",
    template: "%s | ThinkPlus Education"
  },
  description:
    "ThinkPlus Education is the modern EdTech platform delivering mentor-led live courses, practice material, and personalised guidance for CAT, CLAT, IPM and more.",
  metadataBase: new URL("https://thinkplus-demo.vercel.app")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          "min-h-screen bg-slate-50 text-slate-900 antialiased"
        )}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
