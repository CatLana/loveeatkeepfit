import "@/styles/globals.css";
import { Playfair_Display, Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";

// Playfair Display: elegant warm serif for headings — conveys care, expertise and femininity
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display"
});

// Nunito: rounded friendly sans-serif for body — warm and approachable for women 35-50
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans"
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={`${playfair.variable} ${nunito.variable}`}>
        <Component {...pageProps} />
        <Analytics />
      </div>
    </SessionProvider>
  );
}
