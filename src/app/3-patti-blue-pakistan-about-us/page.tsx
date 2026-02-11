import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'About 3Patti Blue - Pakistan\'s Most Trusted Teen Patti Platform',
  description: 'Learn about 3Patti Blue, our journey since 2024, mission to provide authentic Teen Patti gaming, and vision for Pakistan\'s #1 card gaming platform with 1M+ players and instant payouts.',
  keywords: ['3Patti Blue about', 'about 3patti blue', 'teen patti company Pakistan', '3Patti Blue history', 'authentic teen patti platform', 'Teen Patti gaming', '3 Patti Blue story', 'trusted gaming app Pakistan'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://3patiblueapp.com.pk/3-patti-blue-pakistan-about-us",
  },
  openGraph: {
    title: 'About 3Patti Blue - Pakistan\'s Most Trusted Teen Patti Platform',
    description: 'Discover 3Patti Blue\'s journey from 2024 to becoming Pakistan\'s #1 Teen Patti platform. Join 1M+ players earning real cash with instant withdrawals.',
    url: "https://3patiblueapp.com.pk/3-patti-blue-pakistan-about-us",
    siteName: "3Patti Blue",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "https://3patiblueapp.com.pk/3-patti-blue-logo.webp",
        width: 1200,
        height: 630,
        alt: "About 3Patti Blue - Pakistan's Most Trusted Teen Patti Platform",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'About 3Patti Blue - Pakistan\'s #1 Teen Patti Platform',
    description: '3Patti Blue story: From startup to 1M+ players. Authentic Teen Patti gaming with instant payouts and verified security.',
    images: ["https://3patiblueapp.com.pk/3-patti-blue-logo.webp"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Us</h1>
          </div>
          
          {/* Main Content */}
          <div className="bg-secondary rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="flex justify-center md:justify-start">
                <Link href="/" className="block">
                  <div className="relative mx-auto" style={{ width: '280px', height: '280px', maxWidth: '100%' }}>
                    <Image 
                      src="/3-patti-blue.webp" 
                      alt="3Patti Blue - Pakistan's Most Trusted Teen Patti Platform" 
                      width={280}
                      height={280}
                      className="object-contain drop-shadow-2xl rounded-lg"
                      priority
                    />
                  </div>
                </Link>
              </div>
              <div className="md:w-2/3">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Welcome to <a href="https://www.3patiblueapp.com.pk/" className="text-accent hover:text-accent font-semibold" target="_blank" rel="noopener noreferrer">www.3patiblueapp.com.pk</a>, Pakistan's most trusted platform for authentic Teen Patti gaming. <Link href="/" className="text-accent hover:underline font-semibold">3Patti Blue</Link> has become the nation's #1 Teen Patti platform since 2024, now serving <span className="font-bold text-accent">1 Million+ verified users</span> who trust us daily. <Link href="/download-3-patti-blue" className="text-accent hover:underline font-semibold">Download 3Patti Blue APK</Link> now to join millions of players earning real money with instant withdrawals via JazzCash & EasyPaisa.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Thousands of players are winning daily in authentic Teen Patti games and earning substantial amounts ranging from PKR 5,000 to PKR 50,000+ monthly. With our 4.7-star rating from 250,000+ verified reviews and PKR 10 billion+ in successful withdrawals, we're proud to be Pakistan's most trusted real money gaming platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Mission Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Our Mission & Vision</h2>
            <p className="text-lg md:text-xl text-white leading-relaxed text-center mb-4">
              Our mission is to provide Pakistan's most authentic, secure, and rewarding Teen Patti gaming experience. We're committed to fair play, instant payouts, transparent operations, and exceptional customer support that truly puts players first.
            </p>
            <p className="text-lg md:text-xl text-white leading-relaxed text-center">
              Vision: To be South Asia's #1 trusted card gaming platform, empowering millions to enjoy traditional games with modern technology, bank-grade security, and life-changing earning opportunities.
            </p>
          </div>
          
          {/* Our Aim Section */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Why We Exist</h2>
            <p className="text-lg md:text-xl text-white leading-relaxed text-center">
              We created 3Patti Blue to provide authentic Teen Patti gaming with complete transparency, verified security, and real earning opportunities. Our goal is to keep you informed with the latest updates, expert winning strategies, and helpful guides. For any questions or assistance, visit our <Link href="/contact-us" className="underline hover:text-orange-100 font-semibold">24/7 support page</Link>.
            </p>
          </div>
          
          {/* Contact CTA */}
          <div className="bg-secondary rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Have Questions?</h2>
            <p className="text-gray-300 mb-6 text-lg">
              We're here to help 24/7! Contact our dedicated support team for any information or queries about 3Patti Blue.
            </p>
            <Link 
              href="/contact-us" 
              className="inline-block bg-accent hover:bg-accent/90 text-primary font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "3Patti Blue",
              "legalName": "3Patti Blue Gaming Platform",
              "alternateName": ["3Patti Blue App", "3 Patti Blue"],
              "url": "https://3patiblueapp.com.pk",
              "logo": "https://3patiblueapp.com.pk/3-patti-blue-logo.webp",
              "description": "3Patti Blue is Pakistan's most trusted Teen Patti gaming platform since 2024, serving 1M+ players with authentic gameplay, instant payouts, and verified security.",
              "foundingDate": "2024",
              "foundingLocation": {
                "@type": "Country",
                "name": "Pakistan"
              },
              "slogan": "Pakistan's Most Trusted Teen Patti Platform",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "50+"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "bestRating": "5",
                "ratingCount": "1000000",
                "reviewCount": "250000"
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61587903094679",
                "https://x.com/juniper60122",
                "https://www.pinterest.com/3patiblue/"
              ],
              "founder": {
                "@type": "Person",
                "name": "3Patti Blue Development Team"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@3patiblueapp.com.pk",
                "contactType": "Customer Support",
                "areaServed": "PK",
                "availableLanguage": ["English", "Urdu"],
                "hoursAvailable": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"
              }
            },
            "about": {
              "@type": "Thing",
              "name": "Teen Patti Gaming Platform",
              "description": "Authentic Teen Patti and card gaming platform with instant payouts, serving 1M+ Pakistani players with verified security and fair play"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://3patiblueapp.com.pk/about"
            }
          })
        }}
      />
    </div>
  );
} 