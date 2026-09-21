import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation/Navigation";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { AudioProvider } from "@/providers/AudioProvider";
import { MouseInteractionProvider } from "@/providers/MouseInteractionProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "For You - Our Cinematic Love Story",
  description: "An interactive cinematic love story made exclusively for you",
  icons: {
    icon: "♡",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MouseInteractionProvider>
          <AudioProvider>
            <SmoothScrollProvider>
              <Navigation />
              <Suspense>
                {children}
              </Suspense>
            </SmoothScrollProvider>
          </AudioProvider>
        </MouseInteractionProvider>
      </body>
    </html>
  );
}
