import Image from "next/image";
import Script from 'next/script';
import { Metadata } from 'next';
import HeroSection from '@/components/HomePage/HeroSection';
import SectionHeading from '@/components/SectionHeading';
import TranslatableText from '@/components/TranslatableText';

// Enhanced metadata with E-E-A-T signals and GEO optimization for 2026
export const metadata: Metadata = {
  title: {
    default: "3Patti Blue APK Download v1.204(1) | Play Real Teen Patti & Win Cash 2026",
    template: "%s | 3Patti Blue"
  },
  description: "3Patti Blue - Pakistan's most trusted Teen Patti gaming platform in 2026. Download 3Patti Blue APK for Android. Play authentic Teen Patti, Rummy, Dragon Tiger & win real money. Instant withdrawals via JazzCash & EasyPaisa. Join 1M+ verified players earning daily! | تین پتی بلیو - پاکستان کا سب سے قابل اعتماد گیمنگ پلیٹ فارم۔ جاز کیش اور ایزی پیسہ سے فوری نکاسی۔",
  keywords: [
    "3Patti Blue",
    "3patti blue download",
    "3patti blue apk",
    "3patti blue app",
    "3patti blue pakistan",
    "3patti blue real money",
    "3patti blue game",
    "download 3patti blue",
    "3patti blue online",
    "3patti blue 2026",
    "Teen Patti 3Patti Blue",
    "how to play 3patti blue",
    "3patti blue earn money",
    "Pakistan teen patti games",
    "best teen patti app 2026",
    "3patti blue withdrawal",
    "3patti blue bonus",
    "teen patti real cash",
    "Android gaming app 2026",
    "JazzCash gaming app",
    "EasyPaisa gaming",
    "mobile card games pakistan",
    "real money gaming app",
    "teen patti earning app",
    "Dragon vs Tiger game",
    "rummy online pakistan",
    "best earning app 2026",
    // Urdu Keywords for Pakistan
    "تین پتی بلیو",
    "تین پتی گیم",
    "آن لائن تین پتی",
    "پیسے کمانے والی ایپ",
    "جاز کیش گیمنگ",
    "ایزی پیسہ گیمنگ",
    "پاکستان میں تین پتی",
    "رمی گیم پاکستان",
    "ڈریگن ٹائیگر گیم",
    "آن لائن کارڈ گیمز پاکستان"
  ],
  openGraph: {
    title: '3Patti Blue APK - Download & Win Real Money | Pakistan #1 Teen Patti App',
    description: '3Patti Blue 2026 - Join 1M+ players winning real cash daily. Authentic Teen Patti experience with instant JazzCash & EasyPaisa withdrawals. Download now & get Rs.100 bonus!',
    images: [
      {
        url: 'https://3patiblueapp.com.pk/3-patti-blue-logo.webp',
        width: 1200,
        height: 630,
        alt: '3Patti Blue - Authentic Teen Patti Gaming Platform'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '3Patti Blue - Pakistan\'s #1 Teen Patti App | Win Real Cash',
    description: '3Patti Blue 2026 - Trusted by 1M+ players. Play authentic Teen Patti & win real money. Instant withdrawals via JazzCash & EasyPaisa. Download now & get PKR 100 bonus!',
    images: ['https://3patiblueapp.com.pk/3-patti-blue-logo.webp']
  }
};

export default function Home() {
  // Enhanced Schema.org structured data with E-E-A-T signals for GEO 2026
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://3patiblueapp.com.pk/#website",
        "url": "https://3patiblueapp.com.pk/",
        "name": "3Patti Blue",
        "alternateName": "3Patti Blue Pakistan",
        "description": "Pakistan's most trusted Teen Patti gaming platform. Experience authentic 3Patti gameplay with verified security and instant payouts.",
        "inLanguage": ["en-PK", "ur-PK"],
        "publisher": {
          "@id": "https://3patiblueapp.com.pk/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://3patiblueapp.com.pk/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://3patiblueapp.com.pk/#organization",
        "name": "3Patti Blue",
        "legalName": "3Patti Blue Gaming Platform",
        "url": "https://3patiblueapp.com.pk/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://3patiblueapp.com.pk/3-patti-blue-logo.webp",
          "width": 512,
          "height": 512,
          "caption": "3Patti Blue - Authentic Teen Patti Gaming"
        },
        "foundingDate": "2024",
        "sameAs": [
          "https://www.facebook.com/share/1at8tjJcje/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@3patiblueapp.com.pk",
          "contactType": "Customer Support",
          "areaServed": "PK",
                "availableLanguage": ["English", "Urdu", "اردو"],
          "hoursAvailable": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "ratingCount": "1000000",
          "reviewCount": "250000"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "3Patti Blue",
        "alternateName": "3Patti Blue App",
        "operatingSystem": "Android 5.0+",
        "applicationCategory": "GameApplication",
        "applicationSubCategory": "Card Game",
        "image": "https://3patiblueapp.com.pk/3-patti-blue-logo.webp",
        "logo": "https://3patiblueapp.com.pk/3-patti-blue-logo.webp",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "ratingCount": "1000000",
          "reviewCount": "250000"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "PKR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2026-12-31"
        },
        "downloadUrl": "https://3patiblueapp.com.pk/download-3-patti-blue",
        "installUrl": "https://3patiblueapp.com.pk/download-3-patti-blue",
        "softwareVersion": "1.204(1)",
        "releaseNotes": "Enhanced security, faster withdrawals, improved UI/UX, new game modes",
        "datePublished": "2024-01-15",
        "dateModified": "2026-01-01",
        "fileSize": "49MB",
        "contentRating": "18+",
        "description": "3Patti Blue is Pakistan's most trusted Teen Patti gaming platform. Play authentic Teen Patti, Rummy, Dragon Tiger & more card games. Win real money with instant JazzCash & EasyPaisa withdrawals. Verified security, fair play guaranteed.",
        "featureList": [
          "Authentic Teen Patti gameplay",
          "Real money winnings",
          "Instant JazzCash & EasyPaisa withdrawals",
          "Daily bonuses and rewards",
          "24/7 customer support",
          "Secure encrypted transactions",
          "Multiple card games",
          "Email binding for account security"
        ],
        "screenshot": [
          "https://3patiblueapp.com.pk/3-patti-blue-logo.webp",
          "https://3patiblueapp.com.pk/3-patti-blue.webp",
          "https://3patiblueapp.com.pk/3-patti-blue-game.webp",
          "https://3patiblueapp.com.pk/3-patti-blue-pakistan.webp",
          "https://3patiblueapp.com.pk/3pattiblue.webp"
        ],
        "author": {
          "@type": "Organization",
          "name": "3Patti Blue",
          "@id": "https://3patiblueapp.com.pk/#organization"
        },
        "provider": {
          "@type": "Organization",
          "name": "3Patti Blue",
          "@id": "https://3patiblueapp.com.pk/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is 3Patti Blue and how does it work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3Patti Blue is Pakistan's most trusted Teen Patti gaming platform in 2026. It offers authentic Teen Patti gameplay where you can compete with real players and win real money. The app provides secure, encrypted transactions and instant withdrawals through JazzCash and EasyPaisa. With over 1 million verified players, 3Patti Blue ensures fair play, verified security protocols, and 24/7 customer support. You can start playing with free daily bonuses or deposit money to win bigger cash prizes."
            }
          },
          {
            "@type": "Question",
            "name": "How to download 3Patti Blue APK?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To download 3Patti Blue APK, visit the official website 3patiblueapp.com.pk and click the download button. The 3Patti Blue APK file (49MB) will be downloaded to your Android device. Enable 'Install from Unknown Sources' in your device settings, then open the APK file to install. The app is free to download and compatible with Android 5.0 or higher. Always download from the official website to ensure you get the authentic, secure version of 3Patti Blue."
            }
          },
          {
            "@type": "Question",
            "name": "Is 3Patti Blue safe and secure to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, 3Patti Blue is completely safe and secure. The platform uses advanced 256-bit SSL encryption to protect all transactions and personal data. All payment methods (JazzCash, EasyPaisa) are verified and secure. The app has been trusted by over 1 million users in Pakistan since 2024. 3Patti Blue implements fair play algorithms, regular security audits, and KYC verification to prevent fraud. Your money and personal information are protected with bank-level security. However, always ensure you download from the official website only."
            }
          },
          {
            "@type": "Question",
            "name": "How to earn and win money on 3Patti Blue?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can earn money on 3Patti Blue through multiple ways: (1) Playing Teen Patti, Rummy, Dragon Tiger and other skill-based games against real players. (2) Claiming daily login bonuses and rewards worth up to PKR 500. (3) Getting 100% welcome bonus on your first deposit. (4) Referring friends and earning 10-20% commission on their deposits. (5) Participating in daily tournaments with cash prizes. (6) VIP rewards program offering up to 10% rebate on deposits. Winners receive their earnings instantly in their wallet, which can be withdrawn anytime via JazzCash or EasyPaisa."
            }
          },
          {
            "@type": "Question",
            "name": "How to withdraw money from 3Patti Blue?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Withdrawing money from 3Patti Blue is quick and easy: (1) Open the app and go to the Wallet section. (2) Click on 'Withdrawal' option. (3) Select your preferred payment method - JazzCash or EasyPaisa. (4) Enter the amount you want to withdraw (minimum PKR 500). (5) Provide your verified account details. (6) Confirm the withdrawal request. Your money will be processed within 5-30 minutes and transferred directly to your JazzCash or EasyPaisa account. There are no hidden fees or charges on withdrawals."
            }
          },
          {
            "@type": "Question",
            "name": "What games are available on 3Patti Blue?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3Patti Blue offers 30+ exciting games including: Teen Patti (Classic, Joker, Muflis), Rummy (Points, Pool, Deals), Dragon vs Tiger, Andar Bahar, 7 Up Down, Poker (Texas Hold'em, Omaha), Blackjack, Zoo Roulette, Car Roulette, Crash, Domino, Ludo, Fishing Rush, and various slot games like Mines, 777 Bingo, and Fruit Line. All games feature real money gameplay, live multiplayer modes, and fair play algorithms. New games are added regularly based on player preferences."
            }
          },
          {
            "@type": "Question",
            "name": "What is the minimum deposit and withdrawal amount?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The minimum deposit amount on 3Patti Blue is PKR 100, and you'll receive a 100% welcome bonus on your first deposit. The minimum withdrawal amount is PKR 500 via JazzCash or EasyPaisa. There is no maximum limit on withdrawals - you can withdraw any amount you've won. All transactions are processed instantly with zero hidden charges. Deposits reflect in your wallet within seconds, while withdrawals are processed within 5-30 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "How long do 3Patti Blue withdrawals take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3Patti Blue offers the fastest withdrawal processing in Pakistan. Withdrawals through JazzCash and EasyPaisa are typically processed within 5-30 minutes. Most users receive their money within 10-15 minutes. The platform operates 24/7, so you can withdraw money anytime. During peak hours, processing might take up to 30 minutes. All withdrawals are secure, encrypted, and tracked. You'll receive instant notifications once your withdrawal is processed and transferred to your account."
            }
          },
          {
            "@type": "Question",
            "name": "How to contact 3Patti Blue customer support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3Patti Blue provides 24/7 customer support through multiple channels: (1) Live Chat - Available inside the app for instant responses within 2-5 minutes. (2) WhatsApp Support - Message the official WhatsApp number provided in the app for personalized assistance. (3) Email - support@3patiblueapp.com.pk for detailed queries and account issues. (4) FAQ Section - Comprehensive help center covering common questions. The support team is available in English and Urdu, and typically resolves issues within minutes. Response time is guaranteed under 10 minutes for urgent withdrawal or deposit issues."
            }
          },
          {
            "@type": "Question",
            "name": "What bonuses does 3Patti Blue offer in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3Patti Blue offers industry-leading bonuses in 2026: (1) Welcome Bonus - 100% match on first deposit up to PKR 100,000. (2) Daily Login Bonus - Free chips worth PKR 50-500 daily. (3) Recharge Rebate - 5-30% bonus on every deposit based on amount. (4) Referral Bonus - Earn 10-20% commission when friends join and play. (5) VIP Rewards - Up to 10% daily rebate for active players (VIP levels 1-20). (6) Festival Bonuses - Special rewards during Eid, Independence Day, etc. (7) Loyalty Program - Cashback and exclusive perks for regular players. All bonuses are instant, transparent, and easy to claim."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <Script
        id="homepage-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      {/* Hero Section - Now with Full Translation Support */}
      <HeroSection />

      {/* App Specifications Table - Optimized for Featured Snippets */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto" id="download">
        <SectionHeading translationKey="section.downloadInfo" className="text-2xl md:text-3xl font-bold mb-8 text-accent" />
        <div className="overflow-hidden rounded-2xl shadow-2xl border border-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.appName" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.appName" /></td>
                </tr>
                <tr className="bg-[#06091F]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.developer" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.developer" /></td>
                </tr>
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.category" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.category" /></td>
                </tr>
                <tr className="bg-[#06091F]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.size" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.size" /></td>
                </tr>
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.version" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.version" /></td>
                </tr>
                <tr className="bg-[#06091F]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.os" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.os" /></td>
                </tr>
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.updated" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.updated" /></td>
                </tr>
                <tr className="bg-[#06091F]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.downloads" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.downloads" /></td>
                </tr>
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.rating" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.rating" /></td>
                </tr>
                <tr className="bg-[#06091F]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.language" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.languages" /></td>
                </tr>
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white"><TranslatableText translationKey="table.price" /></td>
                  <td className="py-4 px-6 text-left text-white"><TranslatableText translationKey="value.price" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Overview Section - GEO Optimized with Natural Language */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="section.overview" className="text-3xl font-bold mb-8 text-accent" />
          <div className="space-y-6">
            <TranslatableText 
              translationKey="content.overview.text" 
              className="text-gray-300 leading-relaxed"
              as="p"
            />
            <TranslatableText 
              translationKey="content.overview.text2" 
              className="text-gray-300 leading-relaxed"
              as="p"
            />
          </div>
        </div>
      </section>

      {/* What is 3Patti Blue - E-E-A-T Optimized Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="section.understanding" className="text-3xl font-bold mb-8 text-accent" />
          <div className="space-y-6">
            <TranslatableText 
              translationKey="content.understanding.text" 
              className="text-gray-300 leading-relaxed"
              as="p"
            />

            <TranslatableText 
              translationKey="content.understanding.text2" 
              className="text-gray-300 leading-relaxed"
              as="p"
            />
          </div>
        </div>
      </section>

      {/* Why 3Patti Blue is Popular - User Intent Focused */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="section.whyFastest" className="text-3xl font-bold mb-8 text-accent" />
          <div className="space-y-6">
            <TranslatableText 
              translationKey="content.whyFastest.text" 
              className="text-gray-300 leading-relaxed"
              as="p"
            />
            <TranslatableText 
              translationKey="content.whyFastest.text2" 
              className="text-gray-300 leading-relaxed"
              as="p"
            />
          </div>
        </div>
      </section>

      {/* How to Start - Step-by-Step Guide Optimized for Voice Search */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="section.getStarted" className="text-3xl font-bold mb-8 text-accent" />
          <div className="space-y-4">
            <TranslatableText 
              translationKey="content.getStarted.intro" 
              className="text-gray-300 leading-relaxed"
              as="p"
            />
            <ol className="list-decimal pl-5 space-y-3 text-gray-300">
              <li><strong><TranslatableText translationKey="content.getStarted.step1" /></strong></li>
              <li><strong><TranslatableText translationKey="content.getStarted.step2" /></strong></li>
              <li><strong><TranslatableText translationKey="content.getStarted.step3" /></strong></li>
              <li><strong><TranslatableText translationKey="content.getStarted.step4" /></strong></li>
              <li><strong><TranslatableText translationKey="content.getStarted.step5" /></strong></li>
              <li><strong><TranslatableText translationKey="content.getStarted.step6" /></strong></li>
              <li><strong><TranslatableText translationKey="content.getStarted.step7" /></strong></li>
            </ol>
          </div>
        </div>
      </section>

      {/* Game Screenshots Section - Visual Content for GEO */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-[#06091F] rounded-xl p-8">
          <SectionHeading translationKey="section.screenshots" className="text-4xl font-bold mb-12 text-accent text-center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Game Interface */}
            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/3-patti-blue-game.webp"
                  alt="3Patti Blue Authentic Teen Patti Game Interface with Live Players"
                  width={400}
                  height={711}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="text-center text-gray-300 mt-3 font-medium">Live Teen Patti Interface</p>
            </div>

            {/* Games Collection */}
            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/3-patti-blue-pakistan.webp"
                  alt="3Patti Blue 30+ Games Collection - Teen Patti, Rummy, Dragon Tiger"
                  width={400}
                  height={711}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="text-center text-gray-300 mt-3 font-medium">30+ Game Selection</p>
            </div>

            {/* Bonuses */}
            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/3-patti-blue-Pakistan-refer-and-earn.webp"
                  alt="3Patti Blue Daily Bonuses and Rewards - Earn Free Chips"
                  width={400}
                  height={711}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="text-center text-gray-300 mt-3 font-medium">Daily Bonuses & Rewards</p>
            </div>

            {/* Add Money */}
            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/3-patti-blue-apk-add-money.webp"
                  alt="3Patti Blue Instant Deposit via JazzCash & EasyPaisa"
                  width={400}
                  height={711}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="text-center text-gray-300 mt-3 font-medium">Quick Deposit (JazzCash/EasyPaisa)</p>
            </div>

            {/* Withdraw Money */}
            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/3-patti-blue-withdraw-money.webp"
                  alt="3Patti Blue Fast Withdrawal Process - Get Money in 5 Minutes"
                  width={400}
                  height={711}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="text-center text-gray-300 mt-3 font-medium">Instant Withdrawals (5-30 mins)</p>
            </div>

            {/* Bind Email */}
            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/3pattiblue.webp"
                  alt="3Patti Blue Bind Email - Secure Your Account"
                  width={400}
                  height={711}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="text-center text-gray-300 mt-3 font-medium">Bind Email</p>
            </div>
          </div>

          {/* Additional Screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Refer and Win */}
            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-2xl">
              <Image
                  src="/3-patti-blue-app.webp"
                  alt="3Patti Blue Refer and Win Program - Earn Rewards"
                  width={400}
                  height={711}
                  className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              </div>
              <p className="text-center text-gray-300 mt-3 font-medium">Refer and Win</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Value Proposition for Users */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
        <SectionHeading translationKey="section.features" className="text-2xl md:text-3xl font-bold mb-8 text-accent" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature1.title" /></h3>
            <TranslatableText translationKey="content.feature1.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature2.title" /></h3>
            <TranslatableText translationKey="content.feature2.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature3.title" /></h3>
            <TranslatableText translationKey="content.feature3.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature4.title" /></h3>
            <TranslatableText translationKey="content.feature4.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature5.title" /></h3>
            <TranslatableText translationKey="content.feature5.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature6.title" /></h3>
            <TranslatableText translationKey="content.feature6.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature7.title" /></h3>
            <TranslatableText translationKey="content.feature7.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature8.title" /></h3>
            <TranslatableText translationKey="content.feature8.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature9.title" /></h3>
            <TranslatableText translationKey="content.feature9.text" className="text-gray-300" as="p" />
          </div>
          <div className="bg-secondary px-8 py-8 rounded-lg card-glow">
            <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.feature10.title" /></h3>
            <TranslatableText translationKey="content.feature10.text" className="text-gray-300" as="p" />
          </div>
          </div>
        </div>
      </section>

      {/* Available Games Section - Comprehensive List for SEO */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="section.games" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-accent">1: Multiplayer Games</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Tiger Dragon <span className="text-[#f97316]">(Hot)</span></p>
          </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">7 UP Down <span className="text-[#f97316]">(Hot)</span></p>
          </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Zoo Roulette <span className="text-[#f97316]">(Hot)</span></p>
          </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Crash</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Car Roulette</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Andar Bahar</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Teenpatti 20-20</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Best of Five</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-accent">2: Skill-Based Games</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Domino <span className="text-[#f97316]">(Hot)</span></p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Rummy <span className="text-[#f97316]">(Hot)</span></p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Teen Patti</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Fishing Rush</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">10 Cards</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Poker</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Ludo</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Black Jack</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-accent">3: Slots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Mines <span className="text-[#f97316]">(Hot)</span></p>
            </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Fruit Line</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">777 Bingo</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Rattling GEMS</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Video Poker 1, 2</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">Wild Energy</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">WoW Slot</p>
              </div>
              <div className="bg-[#0A1029] p-4 rounded-lg">
                <p className="text-white font-medium">God of Fortune</p>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses Section - Detailed Value Proposition */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
        <SectionHeading translationKey="section.bonuses" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
        
        {/* New Player Welcome Bonus */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-accent"><TranslatableText translationKey="content.bonus1.title" /></h3>
          <TranslatableText translationKey="content.bonus1.text" className="text-gray-300 mb-4" as="p" />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-[#0a1029]">
                <tr>
                  <th className="py-3 px-6 text-left text-white font-semibold">Deposit Amount (PKR)</th>
                  <th className="py-3 px-6 text-left text-white font-semibold">Bonus Amount (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">100</td><td className="py-3 px-6 text-gray-300">100</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">1000</td><td className="py-3 px-6 text-gray-300">1000</td></tr>
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">5000</td><td className="py-3 px-6 text-gray-300">5000</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">10,000</td><td className="py-3 px-6 text-gray-300">10,000</td></tr>
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">20,000</td><td className="py-3 px-6 text-gray-300">20,000</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">100,000</td><td className="py-3 px-6 text-gray-300">100,000</td></tr>
              </tbody>
            </table>
          </div>
          </div>

        {/* Recharge Rebate */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-accent"><TranslatableText translationKey="content.bonus2.title" /></h3>
          <TranslatableText translationKey="content.bonus2.text" className="text-gray-300 mb-4" as="p" />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-[#0a1029]">
                <tr>
                  <th className="py-3 px-6 text-left text-white font-semibold">Rebate</th>
                  <th className="py-3 px-6 text-left text-white font-semibold">Recharge Required</th>
                  <th className="py-3 px-6 text-left text-white font-semibold">Required Wager</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">5%</td><td className="py-3 px-6 text-gray-300">3000 PKR</td><td className="py-3 px-6 text-gray-300">2x</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">10%</td><td className="py-3 px-6 text-gray-300">5000</td><td className="py-3 px-6 text-gray-300">3x</td></tr>
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">15%</td><td className="py-3 px-6 text-gray-300">8000</td><td className="py-3 px-6 text-gray-300">4x</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">20%</td><td className="py-3 px-6 text-gray-300">10,000</td><td className="py-3 px-6 text-gray-300">5x</td></tr>
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">25%</td><td className="py-3 px-6 text-gray-300">20,000</td><td className="py-3 px-6 text-gray-300">6x</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">30%</td><td className="py-3 px-6 text-gray-300">50,000</td><td className="py-3 px-6 text-gray-300">7x</td></tr>
              </tbody>
            </table>
          </div>
          </div>

        {/* VIP Rebate Program */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-accent"><TranslatableText translationKey="content.bonus3.title" /></h3>
          <TranslatableText translationKey="content.bonus3.text" className="text-gray-300 mb-4" as="p" />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-[#0a1029]">
                <tr>
                  <th className="py-3 px-6 text-left text-white font-semibold">VIP Level</th>
                  <th className="py-3 px-6 text-left text-white font-semibold">Rebate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">V1-V2</td><td className="py-3 px-6 text-gray-300">1% rebate</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">V3-V4</td><td className="py-3 px-6 text-gray-300">2% rebate</td></tr>
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">V5-V6</td><td className="py-3 px-6 text-gray-300">3% rebate</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">V7-V8</td><td className="py-3 px-6 text-gray-300">4% rebate</td></tr>
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">V9-V10</td><td className="py-3 px-6 text-gray-300">5% rebate</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">V11-V12</td><td className="py-3 px-6 text-gray-300">6% rebate</td></tr>
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">V13-V14</td><td className="py-3 px-6 text-gray-300">7% rebate</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">V15-V16</td><td className="py-3 px-6 text-gray-300">8% rebate</td></tr>
                <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">V17-V18</td><td className="py-3 px-6 text-gray-300">9% rebate</td></tr>
                <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">V19-V20</td><td className="py-3 px-6 text-gray-300">10% rebate</td></tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </section>

      {/* Download Instructions - Bilingual */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="section.download" className="text-2xl md:text-3xl font-bold mb-4 text-accent" />
          <TranslatableText translationKey="content.download.intro" className="text-gray-300 mb-4" as="p" />
          <div className="mb-8">
          <ol className="list-decimal pl-5 space-y-3 text-gray-300">
            <li><strong><TranslatableText translationKey="content.download.step1" /></strong></li>
            <li><strong><TranslatableText translationKey="content.download.step2" /></strong></li>
            <li><strong><TranslatableText translationKey="content.download.step3" /></strong></li>
            <li><strong><TranslatableText translationKey="content.download.step4" /></strong></li>
            <li><strong><TranslatableText translationKey="content.download.step5" /></strong></li>
          </ol>
        </div>
        
        <SectionHeading translationKey="content.install.title" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
        <TranslatableText translationKey="content.install.intro" className="text-gray-300 mb-4" as="p" />
        <div className="mb-8">
          <ol className="list-decimal pl-5 space-y-3 text-gray-300">
            <li><strong><TranslatableText translationKey="content.install.step1" /></strong></li>
            <li><strong><TranslatableText translationKey="content.install.step2" /></strong></li>
            <li><strong><TranslatableText translationKey="content.install.step3" /></strong></li>
            <li><strong><TranslatableText translationKey="content.install.step4" /></strong></li>
            <li><strong><TranslatableText translationKey="content.install.step5" /></strong></li>
            <li><strong><TranslatableText translationKey="content.install.step6" /></strong></li>
            <li><strong><TranslatableText translationKey="content.install.step7" /></strong></li>
          </ol>
        </div>

        <SectionHeading translationKey="content.requirements.title" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-[#0a1029]">
              <tr>
                <th className="py-3 px-6 text-left text-white font-semibold">System</th>
                <th className="py-3 px-6 text-left text-white font-semibold">Minimum</th>
                <th className="py-3 px-6 text-left text-white font-semibold">Recommended</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">Operating System</td><td className="py-3 px-6 text-gray-300">Android 4.1</td><td className="py-3 px-6 text-gray-300">Android 8.0 or above</td></tr>
              <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">RAM</td><td className="py-3 px-6 text-gray-300">2GB or more</td><td className="py-3 px-6 text-gray-300">4GB or more</td></tr>
              <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">Storage Space</td><td className="py-3 px-6 text-gray-300">At least 500 MB free</td><td className="py-3 px-6 text-gray-300">1GB free space</td></tr>
              <tr className="bg-[#0a1029]/50"><td className="py-3 px-6 text-gray-300">Processor</td><td className="py-3 px-6 text-gray-300">Quad-core 1.5 GHz</td><td className="py-3 px-6 text-gray-300">Octa-core 2.0 GHz</td></tr>
              <tr className="bg-[#06091F]/50"><td className="py-3 px-6 text-gray-300">Internet</td><td className="py-3 px-6 text-gray-300">Stable 3G or WiFi</td><td className="py-3 px-6 text-gray-300">Fast & stable 4G or WiFi</td></tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <a 
            href="https://3pattibluevip.com?from_gameid=9483409&channelCode=100000"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn bg-transparent hover:bg-[#0ea5e9]/10 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all shadow-lg hover:shadow-xl border-2 border-[#0ea5e9]"
          >
            <TranslatableText translationKey="btn.downloadNow" className="text-lg" />
            <div className="download-icon ml-2 bg-[#f97316] rounded-full p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </div>
          </a>
          </div>
        </div>
      </section>

      {/* Account Creation - User Journey Optimization */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent">3Patti Blue Account Registration & Login Guide</h2>
          
          <h3 className="text-xl font-semibold mb-4 text-accent"><TranslatableText translationKey="content.registration.title1" /></h3>
          <TranslatableText translationKey="content.registration.intro" className="text-gray-300 mb-4" as="p" />
          <div className="mb-8">
          <ol className="list-decimal pl-5 space-y-3 text-gray-300">
            <li><strong>Launch App:</strong> Open 3Patti Blue app after installation.</li>
            <li><strong>Tap Register/Sign Up:</strong> On the welcome screen, click the "Register" or "Sign Up" button (usually prominent and colored).</li>
            <li><strong>Enter Mobile Number:</strong> Input your Pakistani mobile number (Jazz, Telenor, Zong, Ufone). This will be your username and withdrawal verification method.</li>
            <li><strong>Create Strong Password:</strong> Set a secure password (minimum 8 characters, mix of letters, numbers, symbols recommended).</li>
            <li><strong>Verify OTP:</strong> You'll receive a 6-digit verification code via SMS. Enter this code within 5 minutes to verify your number.</li>
            <li><strong>Complete Profile (Optional):</strong> Add email for account recovery, set username, and complete KYC (recommended for faster withdrawals).</li>
            <li><strong>Account Created:</strong> Congratulations! Your verified account is ready. Claim your welcome bonus immediately.</li>
          </ol>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-accent"><TranslatableText translationKey="content.login.title" /></h3>
          <TranslatableText translationKey="content.login.intro" className="text-gray-300 mb-4" as="p" />
          <div className="space-y-4">
          <ol className="list-decimal pl-5 space-y-3 text-gray-300">
            <li><strong>Open 3Patti Blue:</strong> Launch the app from your home screen.</li>
            <li><strong>Click Login:</strong> Tap the "Login" button on the welcome screen.</li>
            <li><strong>Enter Credentials:</strong> Input your registered mobile number or email, and your password.</li>
            <li><strong>Verify Details:</strong> Double-check your credentials to avoid login errors.</li>
            <li><strong>Tap Sign In:</strong> Click the "Sign In" or "Login" button to access your account.</li>
            <li><strong>Two-Factor Authentication (if enabled):</strong> Enter OTP sent to your mobile for additional security.</li>
            <li><strong>Forgot Password?</strong> Tap "Forgot Password" to reset via SMS OTP. You'll receive a code to create a new password.</li>
            <li><strong>Start Playing:</strong> Once logged in, your wallet balance, game history, and bonuses are instantly accessible. Choose your game and start earning!</li>
          </ol>
          </div>
        </div>
      </section>

      {/* Payment Methods Section - Bilingual */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="section.payment" className="text-2xl md:text-3xl font-bold mb-4 text-accent" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#0A1029] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.payment1.title" /></h3>
              <TranslatableText translationKey="content.payment1.text" className="text-gray-300" as="p" />
            </div>
            <div className="bg-[#0A1029] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-accent"><TranslatableText translationKey="content.payment2.title" /></h3>
              <TranslatableText translationKey="content.payment2.text" className="text-gray-300" as="p" />
            </div>
          </div>
        </div>
      </section>

      {/* Deposit & Withdrawal Instructions - Detailed User Guide */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-secondary rounded-xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent"><TranslatableText translationKey="content.deposit.title" /></h2>
            <TranslatableText translationKey="content.deposit.intro" className="text-gray-300 mb-4" as="p" />
                <ol className="list-decimal pl-5 space-y-3 text-gray-300">
              <li><strong>Login:</strong> Open 3Patti Blue app and log into your verified account.</li>
              <li><strong>Go to Wallet:</strong> Tap the "Wallet" icon on the home screen (usually top-right corner with wallet/rupee symbol).</li>
              <li><strong>Select Deposit:</strong> In wallet section, click "Deposit" or "Add Money" button.</li>
              <li><strong>Choose Payment Method:</strong> Select JazzCash or EasyPaisa (both offer instant processing).</li>
              <li><strong>Enter Amount:</strong> Input deposit amount (minimum PKR 100). Remember: first deposit gets 100% welcome bonus!</li>
              <li><strong>Enter Payment Details:</strong> Provide your JazzCash/EasyPaisa account number/mobile number.</li>
              <li><strong>Confirm Transaction:</strong> Review details carefully, then tap "Confirm" or "Deposit Now".</li>
              <li><strong>Complete Payment:</strong> You'll be redirected to JazzCash/EasyPaisa. Authorize payment with PIN/OTP.</li>
              <li><strong>Instant Credit:</strong> Within 5 seconds, deposited amount + bonus (if applicable) appears in your 3Patti Blue wallet. Start playing!</li>
                </ol>
              </div>
          <div className="bg-secondary rounded-xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent"><TranslatableText translationKey="content.withdraw.title" /></h2>
            <TranslatableText translationKey="content.withdraw.intro" className="text-gray-300 mb-4" as="p" />
                <ol className="list-decimal pl-5 space-y-3 text-gray-300">
              <li><strong>Login to Account:</strong> Open 3Patti Blue app and log in with your credentials.</li>
              <li><strong>Access Wallet:</strong> Tap the "Wallet" icon on home screen to view your balance.</li>
              <li><strong>Select Withdrawal:</strong> Click "Withdraw" or "Cash Out" button in wallet section.</li>
              <li><strong>Choose Payment Method:</strong> Select JazzCash or EasyPaisa (both process within 5-30 minutes).</li>
              <li><strong>Enter Withdrawal Amount:</strong> Input amount (minimum PKR 500, no maximum limit). Ensure you have sufficient balance.</li>
              <li><strong>Provide Account Details:</strong> Enter your verified JazzCash/EasyPaisa mobile number or account number.</li>
              <li><strong>Verify with OTP:</strong> For security, you'll receive OTP on registered mobile. Enter code to verify.</li>
              <li><strong>Double-Check Details:</strong> Review withdrawal amount and account number carefully to avoid errors.</li>
              <li><strong>Confirm Withdrawal:</strong> Tap "Confirm" button. Your request is processed immediately.</li>
              <li><strong>Receive Money:</strong> Within 5-30 minutes, money is transferred to your JazzCash/EasyPaisa account. You'll receive confirmation SMS from both 3Patti Blue and your payment provider.</li>
                </ol>
          </div>
        </div>
      </section>

      {/* Tips and Tricks - Expert Strategies for E-E-A-T */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
        <SectionHeading translationKey="tips.title" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
          <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-3 text-gray-300">
            <TranslatableText translationKey="tips.tip1" as="li" />
            <TranslatableText translationKey="tips.tip2" as="li" />
            <TranslatableText translationKey="tips.tip3" as="li" />
            <TranslatableText translationKey="tips.tip4" as="li" />
            <TranslatableText translationKey="tips.tip5" as="li" />
            <TranslatableText translationKey="tips.tip6" as="li" />
            <TranslatableText translationKey="tips.tip7" as="li" />
            <TranslatableText translationKey="tips.tip8" as="li" />
            <TranslatableText translationKey="tips.tip9" as="li" />
            <TranslatableText translationKey="tips.tip10" as="li" />
          </ul>
          </div>
        </div>
      </section>

      {/* What's New Section - Freshness Signal for SEO */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="whatsnew.title" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
          <div className="space-y-4">
            <ol className="list-decimal pl-5 space-y-3 text-gray-300">
              <TranslatableText translationKey="whatsnew.item1" as="li" />
              <TranslatableText translationKey="whatsnew.item2" as="li" />
              <TranslatableText translationKey="whatsnew.item3" as="li" />
              <TranslatableText translationKey="whatsnew.item4" as="li" />
              <TranslatableText translationKey="whatsnew.item5" as="li" />
              <TranslatableText translationKey="whatsnew.item6" as="li" />
              <TranslatableText translationKey="whatsnew.item7" as="li" />
              <TranslatableText translationKey="whatsnew.item8" as="li" />
              <TranslatableText translationKey="whatsnew.item9" as="li" />
              <TranslatableText translationKey="whatsnew.item10" as="li" />
            </ol>
          </div>
        </div>
      </section>

      {/* Pros and Cons - Balanced View for Trust */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
        <SectionHeading translationKey="proscons.title" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <SectionHeading translationKey="proscons.pros.title" className="text-xl font-semibold mb-3 text-accent" tag="h3" />
            <div className="bg-[#0A1029] px-8 py-8 rounded-lg">
              <ul className="list-disc pl-5 space-y-3 text-gray-300">
                <TranslatableText translationKey="proscons.pro1" as="li" />
                <TranslatableText translationKey="proscons.pro2" as="li" />
                <TranslatableText translationKey="proscons.pro3" as="li" />
                <TranslatableText translationKey="proscons.pro4" as="li" />
                <TranslatableText translationKey="proscons.pro5" as="li" />
                <TranslatableText translationKey="proscons.pro6" as="li" />
                <TranslatableText translationKey="proscons.pro7" as="li" />
                <TranslatableText translationKey="proscons.pro8" as="li" />
                <TranslatableText translationKey="proscons.pro9" as="li" />
                <TranslatableText translationKey="proscons.pro10" as="li" />
                <TranslatableText translationKey="proscons.pro11" as="li" />
                <TranslatableText translationKey="proscons.pro12" as="li" />
              </ul>
            </div>
          </div>
          <div>
            <SectionHeading translationKey="proscons.cons.title" className="text-xl font-semibold mb-3 text-accent" tag="h3" />
            <div className="bg-[#0A1029] px-8 py-8 rounded-lg">
              <ul className="list-disc pl-5 space-y-3 text-gray-300">
                <TranslatableText translationKey="proscons.con1" as="li" />
                <TranslatableText translationKey="proscons.con2" as="li" />
                <TranslatableText translationKey="proscons.con3" as="li" />
                <TranslatableText translationKey="proscons.con4" as="li" />
                <TranslatableText translationKey="proscons.con5" as="li" />
                <TranslatableText translationKey="proscons.con6" as="li" />
                <TranslatableText translationKey="proscons.con7" as="li" />
                <TranslatableText translationKey="proscons.con8" as="li" />
                <TranslatableText translationKey="proscons.con9" as="li" />
              </ul>
              </div>
            </div>
          </div>
          <TranslatableText translationKey="content.proscons.bottomLine" className="text-gray-300 mt-6 italic font-bold" as="p" />
        </div>
      </section>

      {/* Safety & Security - Trust Building for E-E-A-T */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <SectionHeading translationKey="content.security.title" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
          <div className="space-y-4">
            <TranslatableText translationKey="content.security.intro" className="text-gray-300 leading-relaxed font-bold" as="p" />
            <TranslatableText translationKey="content.security.technical" className="text-gray-300 leading-relaxed" as="p" />
            <TranslatableText translationKey="content.security.payment" className="text-gray-300 leading-relaxed" as="p" />
            <TranslatableText translationKey="content.security.fairplay" className="text-gray-300 leading-relaxed" as="p" />
            <TranslatableText translationKey="content.security.googleplay" className="text-gray-300 leading-relaxed" as="p" />
            <TranslatableText translationKey="content.security.responsibility" className="text-gray-300 leading-relaxed" as="p" />
          </div>
        </div>
      </section>

      {/* Contact Support Section - Accessibility & Trust */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent">3Patti Blue Customer Support: 24/7 Help in Urdu & English</h2>
          <TranslatableText translationKey="content.support.intro" className="text-gray-300 mb-6" as="p" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A1029] p-6 rounded-lg">
              <SectionHeading translationKey="support.livechat.title" className="text-xl font-semibold mb-3 text-accent" tag="h3" />
              <TranslatableText translationKey="support.livechat.details" className="text-gray-300" as="p" />
            </div>
            <div className="bg-[#0A1029] p-6 rounded-lg">
              <SectionHeading translationKey="support.whatsapp.title" className="text-xl font-semibold mb-3 text-accent" tag="h3" />
              <TranslatableText translationKey="support.whatsapp.details" className="text-gray-300" as="p" />
            </div>
            <div className="bg-[#0A1029] p-6 rounded-lg">
              <SectionHeading translationKey="support.email.title" className="text-xl font-semibold mb-3 text-accent" tag="h3" />
              <TranslatableText translationKey="support.email.details" className="text-gray-300" as="p" />
            </div>
          </div>
          <div className="bg-[#0A1029] p-6 rounded-lg mt-6">
            <SectionHeading translationKey="support.faqdb.title" className="text-xl font-semibold mb-3 text-accent" tag="h3" />
            <TranslatableText translationKey="content.support.faq" className="text-gray-300" as="p" />
          </div>
          <TranslatableText translationKey="content.support.urgent" className="text-gray-300 mt-6 text-center italic font-bold" as="p" />
        </div>
      </section>

      {/* FAQ Section - Bilingual */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
        <SectionHeading translationKey="section.faq" className="text-3xl font-bold mb-4 text-accent" />
        <div className="space-y-4">
          <details className="group bg-[#0a1029]/50 rounded-xl">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
              <TranslatableText translationKey="faq.q1" />
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-300">
              <TranslatableText translationKey="faq.a1" />
            </div>
          </details>

          <details className="group bg-[#0a1029]/50 rounded-xl">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
              <TranslatableText translationKey="faq.q2" />
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-300">
              <TranslatableText translationKey="faq.a2" />
            </div>
          </details>

          <details className="group bg-[#0a1029]/50 rounded-xl">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
              <TranslatableText translationKey="faq.q3" />
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-300">
              <TranslatableText translationKey="faq.a3" />
            </div>
          </details>

          <details className="group bg-[#0a1029]/50 rounded-xl">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
              <TranslatableText translationKey="faq.q4" />
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-300">
              <TranslatableText translationKey="faq.a4" />
            </div>
          </details>

          <details className="group bg-[#0a1029]/50 rounded-xl">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
              <TranslatableText translationKey="faq.q5" />
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-300">
              <TranslatableText translationKey="faq.a5" />
            </div>
          </details>

          <details className="group bg-[#0a1029]/50 rounded-xl">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
              <TranslatableText translationKey="faq.q6" />
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-300">
              <TranslatableText translationKey="faq.a6" />
            </div>
          </details>

          <details className="group bg-[#0a1029]/50 rounded-xl">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
              <TranslatableText translationKey="faq.q7" />
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-300">
              <TranslatableText translationKey="faq.a7" />
            </div>
          </details>

          <details className="group bg-[#0a1029]/50 rounded-xl">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
              <TranslatableText translationKey="faq.q8" />
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-300">
              <TranslatableText translationKey="faq.a8" />
            </div>
          </details>
          </div>
        </div>
      </section>

      {/* Conclusion - Call to Action with Value Summary */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary rounded-xl p-8">
        <SectionHeading translationKey="verdict.title" className="text-2xl md:text-3xl font-bold mb-6 text-accent" />
          <div className="space-y-4">
          <TranslatableText translationKey="verdict.para1" className="text-gray-300 leading-relaxed" as="p" />
          <TranslatableText translationKey="verdict.para2" className="text-gray-300 leading-relaxed" as="p" />
          <TranslatableText translationKey="verdict.para3" className="text-gray-300 leading-relaxed" as="p" />
          <div className="flex justify-center mt-8">
            <a 
              href="https://3pattibluevip.com?from_gameid=9483409&channelCode=100000"
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0ea5e9] text-white font-bold py-4 px-10 rounded-full inline-flex items-center transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              <TranslatableText translationKey="btn.download3pattiFull" className="text-xl" />
              <div className="download-icon ml-3 bg-[#f97316] rounded-full p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </div>
            </a>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
