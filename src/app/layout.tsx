import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const SITE_URL = "https://messageto.link";
const TITLE = "messagetolink — Send private markdown messages with no server, no trace";
const DESCRIPTION =
  "Share encrypted markdown messages via URL. Zero server storage. Password protected. No sign-up required. Open source.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "encrypted message",
    "private message",
    "markdown",
    "zero knowledge",
    "serverless",
    "no tracking",
    "open source",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "messagetolink",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#F9F8F6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#141416" media="(prefers-color-scheme: dark)" />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-bg-base text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "messagetolink",
              url: "https://messageto.link",
              description:
                "Share encrypted markdown messages via URL. Zero server storage. Password protected. No sign-up required.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <a
          href="#main"
          className="
            sr-only focus-visible:not-sr-only
            fixed top-2 left-2 z-50
            px-4 py-2 rounded-[var(--radius-sm)]
            bg-[var(--accent)] text-white text-[14px] font-medium
            focus-visible:outline-none
          "
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
