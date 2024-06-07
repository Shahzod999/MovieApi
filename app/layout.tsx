import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import CommentsSection from "@/components/CommentsSection";
import CommentsToggle from "@/components/CommentsToggle";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Movie",
  description: "Your favorite movies, all in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex justify-center m-auto max-w-screen-2xl  bg-[#0F1117] ${dmSans.className}`}>
        <StoreProvider>
          <div className="flex-[3] w-full max-w-screen-2xl">
            <Header />
            {children}
            <Footer />
          </div>
          <CommentsToggle />

          {/* <aside className="p-[15px] flex-1 hidden md:block">
            <CommentsSection />
          </aside> */}
        </StoreProvider>
      </body>
    </html>
  );
}
// mx-auto
