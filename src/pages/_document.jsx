import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ── Manifest (PWA install + home screen) ── */}
        <link rel="manifest" href="/app/manifest.json" />

        {/* ── Favicon (browser tab) ── */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="shortcut icon" href="/favicon-32.png" />

        {/* ── Apple home screen icon (iOS "Add to Home Screen") ── */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* ── Theme / status bar colour ── */}
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Love. Eat. KeepFit." />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Love. Eat. KeepFit." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
