import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import NavigationButtons from "./components/NavigationButtons";
import { PanelProvider } from "./context/PanelContext";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicolas CAILLET - Portfolio",
  description: "Portfolio créatif et innovant d'un étudiant dans un cycle d'ingérieur CREATECH à l'ESILV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className="antialiased"
      >
        <PanelProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {children}
            </main>
            <div className="fixed top-0 w-full z-30 flex flex-row justify-between items-center px-8 md:px-20 bg-white dark:bg-black">
              <Link href="/" className="text-2xl font-doto">Nicolas</Link>
              <NavigationButtons />
            </div>
            <Footer />
          </div>
        </PanelProvider>
      </body>
    </html>
  );
}