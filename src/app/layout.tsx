// 3Patti Blue - Official Deployment - Last Updated: 2026-02-13
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeferredStyles from "@/components/DeferredStyles";
import ScrollToTopWrapper from "@/components/ScrollToTopWrapper";
import WebVitalsTracker from "@/components/WebVitalsTracker";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#06091F",
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://3patiblueapp.com.pk'),
  title: {
    default: "3 Patti Blue APK Download Latest V1.2024(1) for Android 2026",
    template: "%s | 3 Patti Blue"
  },
  description: "3Patti Blue 2026 - Pakistan's #1 Teen Patti app. 1M+ players. Download APK, play Teen Patti & Rummy, win real money. JazzCash & EasyPaisa. PKR 100 bonus!",
  keywords: [
    "3Patti Blue",
    "3patti blue download",
    "3patti blue apk",
    "3patti blue app",
    "3patti blue pakistan",
    "3patti blue game",
    "download 3patti blue",
    "3patti blue online",
    "3patti blue real money",
    "3patti blue earn money",
    "how to play 3patti blue",
    "3patti blue 2026",
    "3patti blue withdrawal",
    "3patti blue bonus",
    "teen patti 3patti blue",
    "Pakistan teen patti",
    "Teen Patti game",
    "teen patti real cash",
    "best teen patti app",
    "teen patti online pakistan",
    "Android gaming app 2026",
    "JazzCash gaming app",
    "EasyPaisa gaming",
    "mobile card games pakistan",
    "real money gaming app",
    "teen patti earning app",
    "Dragon vs Tiger game",
    "rummy online pakistan",
    "best earning app 2026",
    "3patti blue login",
    "3patti blue register",
    // Urdu Keywords for SEO
    "تین پتی بلیو",
    "تین پتی گیم",
    "آن لائن تین پتی پاکستان",
    "پیسے کمانے والی ایپ",
    "جاز کیش سے پیسے کمائیں",
    "ایزی پیسہ گیمنگ",
    "تین پتی بلیو ڈاؤن لوڈ",
    "رمی گیم",
    "ڈریگن ٹائیگر"
  ],
  authors: [{ name: "3Patti Blue Team" }],
  creator: "3Patti Blue",
  publisher: "3Patti Blue Gaming Platform",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/3-patti-blue-logo.webp', type: 'image/webp', sizes: '16x16' },
      { url: '/3-patti-blue-logo.webp', type: 'image/webp', sizes: '32x32' },
      { url: '/3-patti-blue-logo.webp', type: 'image/webp', sizes: '192x192' },
      { url: '/3-patti-blue-logo.webp', type: 'image/webp', sizes: '512x512' }
    ],
    apple: [
      { url: '/3-patti-blue-logo.webp', sizes: '180x180' }
    ],
    shortcut: [
      { url: '/3-patti-blue-logo.webp', type: 'image/webp' }
    ]
  },
  manifest: 'https://3patiblueapp.com.pk/manifest.json',
  verification: {
    google: "8a7c21f6e90a89ef",
  },
  alternates: {
    canonical: "https://3patiblueapp.com.pk",
    languages: {
      "en-PK": "https://3patiblueapp.com.pk",
      "ur-PK": "https://3patiblueapp.com.pk/ur",
    },
  },
  openGraph: {
    title: "3Patti Blue - Pakistan's #1 Teen Patti App | Download & Win Real Cash",
    description: "3Patti Blue 2026 - Trusted by 1M+ players. Authentic Teen Patti gameplay, instant payouts (5-30 min), 100% welcome bonus. JazzCash & EasyPaisa supported. Download now & get PKR 100 free!",
    url: "https://3patiblueapp.com.pk",
    siteName: "3Patti Blue",
    locale: "en_PK",
    type: "website",
    // public/feature/3-patti-blue-OG-image.webp – used when link is shared on Facebook, WhatsApp, etc.
    images: [
      {
        url: "https://3patiblueapp.com.pk/feature/3-patti-blue-OG-image.webp",
        width: 1200,
        height: 630,
        alt: "3 Patti Blue - Pakistan's Most Trusted Teen Patti Gaming Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3 Patti Blue - Pakistan's #1 Teen Patti App | Win Real Money",
    description: "3 Patti Blue 2026 - Join 1M+ players earning daily. Authentic Teen Patti, instant withdrawals, 100% bonus. Download official APK & play now!",
    creator: "@3PattiBlue",
    // public/feature/3-patti-blue-feature-image-twitter.webp – used when link is shared on Twitter/X
    images: [
      {
        url: "https://3patiblueapp.com.pk/feature/3-patti-blue-feature-image-twitter.webp",
        width: 1200,
        height: 600,
        alt: "3 Patti Blue - Authentic Teen Patti Gaming Platform",
      }
    ],
  },
  applicationName: "3Patti Blue",
  category: "Gaming",
  classification: "Card Gaming Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-lang="en-PK">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="icon" href="/3-patti-blue-logo.webp" type="image/webp" sizes="16x16" />
        <link rel="icon" href="/3-patti-blue-logo.webp" type="image/webp" sizes="32x32" />
        <link rel="shortcut icon" href="/3-patti-blue-logo.webp" type="image/webp" />
        <link rel="icon" href="/3-patti-blue-logo.webp" type="image/webp" sizes="192x192" />
        <link rel="icon" href="/3-patti-blue-logo.webp" type="image/webp" sizes="512x512" />
        <link rel="apple-touch-icon" href="/3-patti-blue-logo.webp" sizes="180x180" />
        <meta property="og:image" content="https://3patiblueapp.com.pk/feature/3-patti-blue-OG-image.webp" />
        
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Google Analytics - Load after page is interactive to reduce impact on LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
              send_page_view: false,
              transport_type: 'beacon'
            });
          `}
        </Script>
      </head>
      <body
        className="antialiased bg-primary text-white min-h-screen flex flex-col"
        style={{
          backgroundImage: "radial-gradient(circle at 10% 20%, rgba(10, 16, 41, 0.4) 0%, rgba(6, 9, 31, 0.01) 90%)",
          backgroundAttachment: "fixed",
          minHeight: "100vh"
        }}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <div className="stars-bg fixed inset-0 z-0 opacity-20"></div>
          <Header />
          <main className="flex-grow relative z-10">
          {children}
          </main>
          <DeferredStyles />
          <Footer />
          <ScrollToTopWrapper />
          <WebVitalsTracker />
        </LanguageProvider>
        
        {/* Structured data for Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "3Patti Blue",
              "legalName": "3Patti Blue Gaming Platform",
              "url": "https://3patiblueapp.com.pk",
              "logo": "https://3patiblueapp.com.pk/3-patti-blue-logo.webp",
              "description": "3Patti Blue is Pakistan's most trusted Teen Patti gaming platform since 2024, offering authentic Teen Patti, Rummy, and 30+ card games with instant payouts and verified security.",
              "foundingDate": "2024",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61587903094679",
                "https://x.com/juniper60122",
                "https://www.pinterest.com/3patiblue/"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "bestRating": "5",
                "ratingCount": "1000000",
                "reviewCount": "250000"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@3patiblueapp.com.pk",
                "contactType": "Customer Support",
                "areaServed": "PK",
                "availableLanguage": ["English", "Urdu"]
              }
            })
          }}
        />
        
        {/* Structured data for SoftwareApplication */}
        <Script
          id="app-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "3Patti Blue",
              "alternateName": "3Patti Blue App",
              "operatingSystem": "Android 5.0+",
              "applicationCategory": "GameApplication",
              "applicationSubCategory": "Card Game",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "PKR",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "bestRating": "5",
                "ratingCount": "1000000",
                "reviewCount": "250000"
              },
              "softwareVersion": "1.204(1)",
              "datePublished": "2024-01-15",
              "dateModified": "2026-02-10",
              "fileSize": "49MB",
              "contentRating": "18+",
              "downloadUrl": "https://3patiblueapp.com.pk/download-3-patti-blue",
              "installUrl": "https://3patiblueapp.com.pk/download-3-patti-blue",
              "description": "3 Patti Blue - Pakistan's #1 Teen Patti app with 1M+ players. Authentic gameplay, instant withdrawals, 100% bonus. Download now!"
            })
          }}
        />
      </body>
    </html>
  );
}
