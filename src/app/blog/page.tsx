import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Card Rummy Blog - Guides, Tips & Tutorials',
  description: 'Learn how to create an account, earn money, and get the most out of Card Rummy with our helpful guides and tutorials.',
  keywords: ['Card Rummy blog', 'Card Rummy account', 'Card Rummy login', 'Card Rummy guide', 'Card Rummy tutorial', 'Card Rummy real or fake'],
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
};

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-accent">Card Rummy Blog</h1>
      <p className="text-gray-300 mb-8 text-lg">Stay updated with the latest guides, tips, and tutorials for Card Rummy</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Featured Post - Is Card Rummy Real or Fake */}
        <div className="bg-secondary px-8 py-8 rounded-lg hover:shadow-lg transition-all border-2 border-[#FFA500]">
          <div className="inline-block bg-[#FFA500] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            ⭐ FEATURED
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Is Card Rummy Real or Fake to Earn Money?</h2>
          <p className="text-gray-300 mb-4">Discover the truth about Card Rummy legitimacy, payment methods, and how to identify fake apps. Complete guide for 2026.</p>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <span>📅 January 2026</span>
            <span>•</span>
            <span>7 min read</span>
          </div>
          <Link href="/blog/is-card-rummy-real-or-fake" className="text-accent hover:underline font-semibold">
            Read More →
          </Link>
        </div>

        {/* Second Post */}
        <div className="bg-secondary px-8 py-8 rounded-lg hover:shadow-lg transition-all border-2 border-gray-700 hover:border-accent">
          <h2 className="text-2xl font-bold mb-4 text-white">How to Create a Card Rummy Account and Login</h2>
          <p className="text-gray-300 mb-4">Learn how to create your Card Rummy account and login to start playing your favorite games and earning real money.</p>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <span>📅 January 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <Link href="/blog/create-card-rummy-account-and-login" className="text-accent hover:underline font-semibold">
            Read More →
          </Link>
        </div>
        
        {/* Third Post */}
        <div className="bg-secondary px-8 py-8 rounded-lg hover:shadow-lg transition-all border-2 border-gray-700 hover:border-accent">
          <h2 className="text-2xl font-bold mb-4 text-white">Tips to Win Big in Card Rummy</h2>
          <p className="text-gray-300 mb-4">Discover expert strategies and tips to maximize your winnings in Teen Patti, Rummy, and other card games.</p>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <span>📅 January 2026</span>
            <span>•</span>
            <span>6 min read</span>
          </div>
          <Link href="/blog/tips-to-win-big-in-card-rummy" className="text-accent hover:underline font-semibold">
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
} 