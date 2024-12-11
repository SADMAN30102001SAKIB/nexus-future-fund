"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const defaultMetadata = {
  title: "Nexus Future Fund - Guaranteed 24% Yearly Return | Safe Investments",
  description:
    "Invest with Nexus Future Fund for a guaranteed 24% Yearly return on safe, risk-free investments. Trusted by clients, backed by world-class market researchers and traders. Experience secure growth with a proven, reliable team!",
  keywords:
    "investment, mutual fund, secure investment, Nexus Future Fund, high returns, financial planning, investment strategies, safe investments",
  authors: [
    { name: "Nexus Future Fund", url: "https://nexusfuturefund.vercel.app" },
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Nexus Future Fund - Guaranteed 24% Yearly Return | Safe Investments",
    description:
      "Invest with Nexus Future Fund for a guaranteed 24% Yearly return on safe, risk-free investments. Trusted by clients, backed by world-class market researchers and traders. Experience secure growth with a proven, reliable team!",
    url: "https://nexusfuturefund.vercel.app",
    siteName: "Nexus Future Fund",
    images: [
      {
        url: "https://pbs.twimg.com/profile_images/1842614833533104128/5XdqT1mT_400x400.jpg",
        width: 400,
        height: 400,
        alt: "Nexus Future Fund - Guaranteed 24% Yearly Return | Safe Investments",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Nexus Future Fund - Guaranteed 24% Yearly Return | Safe Investments",
    description:
      "Invest with Nexus Future Fund for a guaranteed 24% Yearly return on safe, risk-free investments. Trusted by clients, backed by world-class market researchers and traders. Experience secure growth with a proven, reliable team!",
    images: [
      "https://pbs.twimg.com/profile_images/1842614833533104128/5XdqT1mT_400x400.jpg",
    ],
    site: "@nexusfuturefund",
  },
  charset: "UTF-8",
};

const subscriptionMetadata = {
  title:
    "Nexus Future Trade Signals | risk-free 10%+ Monthly Profits, 24/7 Support",
  description:
    "Maximize your Crypto profits with Nexus Future Trade Signals! Enjoy 10%+ monthly returns and 70% accuracy. Get real-time signals, full transparency, and 24/7 support. Limited-time offer: Join our trusted, risk-free subscription for just $50/month!",
  keywords:
    "investment, mutual fund, secure investment, Nexus Future Fund, high returns, financial planning, investment strategies, safe investments, trade signals, Crypto signals, crypto signals, Nexus Future Trade, 10% returns, trading support, financial freedom",
  authors: [
    { name: "Nexus Future Fund", url: "https://nexusfuturefund.vercel.app" },
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Nexus Future Trade Signals | risk-free 10%+ Monthly Profits, 24/7 Support",
    description:
      "Maximize your Crypto profits with Nexus Future Trade Signals! Enjoy 10%+ monthly returns and 70% accuracy. Get real-time signals, full transparency, and 24/7 support. Limited-time offer: Join our trusted, risk-free subscription for just $50/month!",
    url: "https://nexusfuturefund.vercel.app",
    siteName: "Nexus Future Fund",
    images: [
      {
        url: "https://pbs.twimg.com/profile_images/1842614833533104128/5XdqT1mT_400x400.jpg",
        width: 400,
        height: 400,
        alt: "Nexus Future Trade Signals | risk-free 10%+ Monthly Profits, 24/7 Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Nexus Future Trade Signals | risk-free 10%+ Monthly Profits, 24/7 Support",
    description:
      "Maximize your Crypto profits with Nexus Future Trade Signals! Enjoy 10%+ monthly returns and 70% accuracy. Get real-time signals, full transparency, and 24/7 support. Limited-time offer: Join our trusted, risk-free subscription for just $50/month!",
    images: [
      "https://pbs.twimg.com/profile_images/1842614833533104128/5XdqT1mT_400x400.jpg",
    ],
    site: "@nexusfuturefund",
  },
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const currentMetadata =
    pathname === "/signals" || pathname === "/howtosubscribe"
      ? subscriptionMetadata
      : defaultMetadata;

  return (
    <html lang="en">
      <head>
        {/* Standard Meta Tags */}
        <meta charSet={currentMetadata.charset} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover"
        />
        <meta name="description" content={currentMetadata.description} />
        <meta name="keywords" content={currentMetadata.keywords} />
        <meta name="robots" content={currentMetadata.robots} />
        <meta name="theme-color" content="#111827" />

        {/* Open Graph */}
        <meta property="og:title" content={currentMetadata.openGraph?.title} />
        <meta
          property="og:description"
          content={currentMetadata.openGraph?.description}
        />
        <meta property="og:url" content={currentMetadata.openGraph?.url} />
        <meta
          property="og:site_name"
          content={currentMetadata.openGraph?.siteName}
        />
        <meta
          property="og:image"
          content={currentMetadata.openGraph?.images[0]?.url}
        />
        <meta
          property="og:image:width"
          content={currentMetadata.openGraph?.images[0]?.width}
        />
        <meta
          property="og:image:height"
          content={currentMetadata.openGraph?.images[0]?.height}
        />
        <meta
          property="og:locale"
          content={currentMetadata.openGraph?.locale}
        />
        <meta property="og:type" content={currentMetadata.openGraph?.type} />

        {/* Twitter */}
        <meta name="twitter:card" content={currentMetadata.twitter?.card} />
        <meta name="twitter:title" content={currentMetadata.twitter?.title} />
        <meta
          name="twitter:description"
          content={currentMetadata.twitter?.description}
        />
        <meta
          name="twitter:image"
          content={currentMetadata.twitter?.images[0]}
        />
        <meta name="twitter:site" content={currentMetadata.twitter?.site} />

        {/* Apple */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InvestmentOrDeposit",
              name: "Nexus Future Fund",
              description: "Guaranteed 24% Yearly return on safe investments.",
              url: "https://nexusfuturefund.vercel.app",
              sameAs: "https://twitter.com/nexusfuturefund",
              potentialAction: {
                "@type": "InvestAction",
                target: "https://nexusfuturefund.vercel.app",
              },
            }),
          }}
        />

        <link rel="canonical" href={currentMetadata.openGraph?.url} />
        <link rel="manifest" href="/manifest.json" />

        <title>{currentMetadata.title}</title>
        <meta
          name="google-site-verification"
          content="RF9MA_ckfQK4-31eFkaHfioB3xgDXxkOEUNSthsFgEc"
        />
      </head>
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
