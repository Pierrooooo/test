import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import NavigationButtons from "./components/NavigationButtons";
import { PanelProvider } from "./context/PanelContext";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maison De Vinci",
  description: "Portfolio créatif et innovant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PanelProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {children}
            </main>
            <div className="fixed top-0 w-full z-30 flex flex-row justify-between items-center px-20 bg-white dark:bg-black">
              <Link href="/" className="text-2xl">Maxime</Link>
              <NavigationButtons />
            </div>
            <Footer />
          </div>
        </PanelProvider>
      </body>
    </html>
  );
}