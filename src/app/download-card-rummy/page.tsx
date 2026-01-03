import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Download Card Rummy Game Free APK For Android | Latest Version 2026',
  description: 'Download Card Rummy APK free for Android. Play Teen Patti, Rummy, Dragon Tiger & more. Earn real cash with JazzCash & EasyPaisa. Latest version V1.225 - 49MB.',
  keywords: [
    'Download Card Rummy',
    'Card Rummy APK download',
    'Card Rummy Android',
    'Teen Patti download',
    'Free card game APK',
    'Card Rummy latest version',
    'Download 3 Patti Card Rummy'
  ],
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
    canonical: "https://cardrummyapp.com.pk/download-card-rummy",
  },
  openGraph: {
    title: 'Download Card Rummy Game Free APK For Android',
    description: 'Download Card Rummy APK free. Play Teen Patti, Rummy & more. Earn real cash with secure payments. 500K+ downloads!',
    url: "https://cardrummyapp.com.pk/download-card-rummy",
    siteName: "Card Rummy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cardrummyapp.com.pk/card-rummy-logo.webp",
        width: 1200,
        height: 630,
        alt: "Download Card Rummy APK",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Download Card Rummy Game Free APK For Android',
    description: 'Download Card Rummy APK free. Play Teen Patti, Rummy & more. Earn real cash with secure payments. 500K+ downloads!',
    images: ["https://cardrummyapp.com.pk/card-rummy-logo.webp"],
  },
};

export default function DownloadPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Download </span>
            <span className="text-[#FFA500]">Card Rummy Game</span>
            <span className="text-white"> Free APK</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
            For Android
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            <Link href="/" className="text-accent hover:underline font-semibold">Card Rummy</Link> is a hub of top popular casino games like cards, poker, Rummy, Crash, Dragon Tiger, and much more. You can download this game free of cost.
          </p>
        </div>

        {/* Download Button - Prominent */}
        <div className="flex justify-center my-12">
          <a 
            href="https://pkcardrummy.com/?from_gameid=5784509&channelCode=100000"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center px-12 py-6 text-white font-bold text-xl rounded-full border-2 border-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-all group shadow-2xl"
          >
            <span className="mr-4">DOWNLOAD NOW</span>
            <div className="bg-[#f97316] rounded-full p-3 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </div>
          </a>
        </div>

        <div className="flex justify-center mb-8">
          <span className="bg-[#0A1029] text-[#4ade80] px-6 py-2 rounded-full text-sm font-semibold">
            ⚡ Fast APK Download
          </span>
        </div>

        {/* Logo/Image Section */}
        <div className="flex justify-center mb-12">
          <div className="relative" style={{ width: '320px', height: '320px', maxWidth: '100%' }}>
            <Image
              src="/card-rummy.webp"
              alt="Card Rummy Logo"
              width={320}
              height={320}
              className="object-contain drop-shadow-2xl"
              priority={true}
              fetchPriority="high"
              quality={90}
            />
          </div>
        </div>
      </section>

      {/* Download Info Table */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto" id="download-info">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFA500] text-center">Download Information</h2>
        <div className="overflow-hidden rounded-2xl shadow-2xl border border-gray-800 max-w-3xl mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white">App Name</td>
                  <td className="py-4 px-6 text-left text-white">Card Rummy</td>
                </tr>
                <tr className="bg-[#06091F]/50">
                  <td className="py-4 px-6 text-left font-medium text-white">Version</td>
                  <td className="py-4 px-6 text-left text-white">V1.225</td>
                </tr>
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white">Size</td>
                  <td className="py-4 px-6 text-left text-white">49MB</td>
                </tr>
                <tr className="bg-[#06091F]/50">
                  <td className="py-4 px-6 text-left font-medium text-white">Required OS</td>
                  <td className="py-4 px-6 text-left text-white">Android 5.0+</td>
                </tr>
                <tr className="bg-[#0a1029]/50">
                  <td className="py-4 px-6 text-left font-medium text-white">Update</td>
                  <td className="py-4 px-6 text-left text-white">1st January 2026</td>
                </tr>
                <tr className="bg-[#06091F]/50">
                  <td className="py-4 px-6 text-left font-medium text-white">Price</td>
                  <td className="py-4 px-6 text-left text-white">Free (0$)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Button After Table */}
        <div className="flex justify-center mt-8">
          <a 
            href="https://pkcardrummy.com/?from_gameid=5784509&channelCode=100000"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn bg-transparent hover:bg-[#0ea5e9]/10 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all shadow-lg hover:shadow-xl border-2 border-[#0ea5e9]"
          >
            <span className="text-lg">DOWNLOAD NOW</span>
            <div className="download-icon ml-2 bg-[#f97316] rounded-full p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Download & Install Process */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto" id="download-steps">
        <div className="bg-secondary rounded-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFA500] text-center">
            Process to Download & Install Card Rummy
          </h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Step 01 */}
            <div className="bg-[#0A1029] rounded-lg p-6 border-l-4 border-[#FFA500]">
              <h3 className="text-xl font-bold text-[#FFA500] mb-3">Step 01: Download APK</h3>
              <p className="text-gray-300 leading-relaxed">
                Click on download button to get Card Rummy Game APK. Wait for automatic download completion.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-[#0A1029] rounded-lg p-6 border-l-4 border-[#4ade80]">
              <h3 className="text-xl font-bold text-[#4ade80] mb-3">Step 02: Enable Unknown Sources</h3>
              <p className="text-gray-300 leading-relaxed">
                Go to device privacy settings and allow "install from unknown resources".
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-[#0A1029] rounded-lg p-6 border-l-4 border-[#60a5fa]">
              <h3 className="text-xl font-bold text-[#60a5fa] mb-3">Step 03: Install APK</h3>
              <p className="text-gray-300 leading-relaxed">
                Locate the downloaded file, tap on it and click on install. Let this process to be done automatically.
              </p>
            </div>

            {/* Step 04 */}
            <div className="bg-[#0A1029] rounded-lg p-6 border-l-4 border-[#f97316]">
              <h3 className="text-xl font-bold text-[#f97316] mb-3">Step 04: Start Earning</h3>
              <p className="text-gray-300 leading-relaxed">
                Finally, Card Rummy is successfully installed on your device, open it and start your journey with your first deposit in this earning app and grab opportunity to earn a lot of money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFA500] text-center">
          Why Download Card Rummy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-secondary px-8 py-8 rounded-lg text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFA500]">Real Money Earning</h3>
            <p className="text-gray-300">Earn real cash by playing your favorite card games</p>
          </div>
          
          <div className="bg-secondary px-8 py-8 rounded-lg text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFA500]">Multiple Games</h3>
            <p className="text-gray-300">Teen Patti, Rummy, Dragon Tiger, and many more</p>
          </div>
          
          <div className="bg-secondary px-8 py-8 rounded-lg text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFA500]">Fast Withdrawals</h3>
            <p className="text-gray-300">Quick withdrawals through JazzCash & EasyPaisa</p>
          </div>
          
          <div className="bg-secondary px-8 py-8 rounded-lg text-center">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFA500]">Daily Bonuses</h3>
            <p className="text-gray-300">Get daily login bonuses and rewards</p>
          </div>
          
          <div className="bg-secondary px-8 py-8 rounded-lg text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFA500]">Safe & Secure</h3>
            <p className="text-gray-300">Protected transactions and data security</p>
          </div>
          
          <div className="bg-secondary px-8 py-8 rounded-lg text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFA500]">Easy to Use</h3>
            <p className="text-gray-300">Simple interface and smooth gameplay</p>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <Link href="/" className="text-[#0ea5e9] hover:text-[#6366f1] font-medium transition-colors">
          ← Back to Home
        </Link>
      </section>
    </>
  );
}

