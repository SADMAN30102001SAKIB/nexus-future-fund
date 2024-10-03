import localFont from 'next/font/local';
import './globals.css';

// Load fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Metadata configuration
export const metadata = {
  title: 'Nexus Future Fund - Secure & Trusted Investment',
  description:
    'Nexus Future Fund offers secure, reliable, and high-performing investment opportunities. Trusted by investors globally for guaranteed returns and top-notch support.',
  keywords:
    'investment, mutual fund, secure investment, Nexus Future Fund, high returns, financial planning, investment strategies, safe investments',
  authors: [{ name: 'Nexus Future Fund', url: 'https://nexus-future-fund-website.vercel.app' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Nexus Future Fund - Secure & Trusted Investment',
    description: 'Join Nexus Future Fund for safe investments with guaranteed returns and top-level security.',
    url: 'https://nexus-future-fund-website.vercel.app',
    siteName: 'Nexus Future Fund',
    images: [
      {
        url: 'https://pbs.twimg.com/profile_images/1841518093069385730/d4OGBccC_400x400.jpg',
        width: 400,
        height: 400,
        alt: 'Nexus Future Fund - Secure Investment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus Future Fund - Secure & Trusted Investment',
    description: 'Invest securely with Nexus Future Fund for guaranteed returns.',
    images: ['https://pbs.twimg.com/profile_images/1841518093069385730/d4OGBccC_400x400.jpg'],
    site: '@nexusfuturefund', // Twitter handle
  },
  charset: 'UTF-8',
};

export const viewport = 'width=device-width, initial-scale=1, viewport-fit=cover';

export const themeColor = '#6c63ff';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Standard Meta Tags */}
        <meta charSet={metadata.charset} />
        <meta name="viewport" content={viewport} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <meta name="theme-color" content={themeColor} />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        <meta name="twitter:site" content={metadata.twitter.site} />

        <title>{metadata.title}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
