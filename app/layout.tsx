import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Vault",
  description: "Your favorite anime, all in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <StoreProvider>
          <main className="max-w-7xl mx-auto bg-[#0F1117]">
            <Hero />
            {children}
            <Footer />
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
