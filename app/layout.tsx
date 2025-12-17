import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import NavigationButtons from "./components/NavigationButtons";
import { PanelProvider } from "./context/PanelContext";
import PageTransition from "./components/pageTransition";
import TransitionLink from "./components/TransitionLink";

export const metadata: Metadata = {
  title: "Nicolas CAILLET - Portfolio",
  description:
    "Portfolio créatif et innovant d'un photographe basé à Paris qui aime voyager et plonger voir nos amis les poissons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <PanelProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {/* <PageTransition>{children}</PageTransition> */}
              {children}
            </main>
            <div className="fixed top-0 w-full z-30 flex flex-row justify-between items-center py-4 md:py-0 px-8 md:px-20 bg-white dark:bg-black">
              <TransitionLink href="/" className="text-2xl font-doto">
                Nicolas
              </TransitionLink>
              <NavigationButtons />
            </div>
            <Footer />
          </div>
        </PanelProvider>
      </body>
    </html>
  );
}
