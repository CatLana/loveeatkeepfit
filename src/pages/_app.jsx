import "@/styles/globals.css";
import { Poppins, Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter"
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={`${poppins.variable} ${inter.variable}`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
