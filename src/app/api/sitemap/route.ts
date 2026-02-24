import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://3patiblueapp.com.pk';
  
  // Define page type
  type PageType = {
    url: string;
    lastMod: string;
    changeFreq: string;
    priority: number;
    images?: Array<{
      loc: string;
      title: string;
      caption: string;
    }>;
  };
  
  // Main pages with high priority
  const mainPages: PageType[] = [
    {
      url: '/',
      lastMod: new Date().toISOString(),
      changeFreq: 'daily',
      priority: 1.0,
      images: [
        { loc: '/3-patti-blue.webp', title: '3 Patti Blue Logo', caption: 'The official logo of 3 Patti Blue gaming platform' },
        { loc: '/3-patti-blue-logo.webp', title: '3 Patti Blue Hero Image', caption: '3 Patti Blue gaming platform showcase' },
        { loc: '/3-patti-blue-game.webp', title: '3 Patti Blue Game', caption: '3 Patti Blue Teen Patti and card games' },
        { loc: '/3-patti-blue-pakistan.webp', title: '3 Patti Blue Pakistan', caption: '3 Patti Blue - Pakistan\'s trusted Teen Patti app' },
        { loc: '/3-patti-blue-Pakistan-refer-and-earn.webp', title: '3 Patti Blue Refer and Earn', caption: 'Refer friends and earn with 3 Patti Blue' },
        { loc: '/3-patti-blue-apk-add-money.webp', title: '3 Patti Blue Add Money', caption: 'Add money to 3 Patti Blue via JazzCash and EasyPaisa' },
        { loc: '/3-patti-blue-withdraw-money.webp', title: '3 Patti Blue Withdraw Money', caption: 'Withdraw winnings from 3 Patti Blue instantly' },
        { loc: '/3pattiblue.webp', title: '3Patti Blue App', caption: '3 Patti Blue mobile app for Android' },
        { loc: '/3-patti-blue-app.webp', title: '3 Patti Blue App', caption: 'Download 3 Patti Blue APK for Android' },
        { loc: '/feature/3-patti-blue-OG-image.webp', title: '3 Patti Blue - Pakistan Teen Patti', caption: '3 Patti Blue - Pakistan\'s most trusted Teen Patti gaming platform (OG share image)' },
        { loc: '/feature/3-patti-blue-feature-image-twitter.webp', title: '3 Patti Blue Twitter Card', caption: '3 Patti Blue - Authentic Teen Patti gaming platform (Twitter share image)' }
      ]
    },
    {
      url: '/ur',
      lastMod: new Date().toISOString(),
      changeFreq: 'daily',
      priority: 0.95,
      images: [
        {
          loc: '/3-patti-blue.webp',
          title: '3 Patti Blue اردو',
          caption: '3 Patti Blue - Pakistan\'s most trusted Teen Patti platform in Urdu'
        }
      ]
    },
    {
      url: '/download-3-patti-blue',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9,
      images: [
        {
          loc: '/3-patti-blue.webp',
          title: 'Download 3 Patti Blue APK',
          caption: 'Download official 3 Patti Blue APK for Android'
        }
      ]
    },
    {
      url: '/deposit-money-in-3-patti-blue',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9,
      images: [
        { loc: '/3-patti-blue-apk-add-money.webp', title: '3 Patti Blue Deposit', caption: 'Deposit money in 3 Patti Blue via JazzCash and EasyPaisa' },
        { loc: '/3-patti-blue-logo.webp', title: '3 Patti Blue', caption: '3 Patti Blue - Deposit and play' }
      ]
    },
    {
      url: '/withdraw-money-from-3-patti-blue',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9,
      images: [
        { loc: '/3-patti-blue-withdraw-money.webp', title: '3 Patti Blue Withdraw', caption: 'Withdraw money from 3 Patti Blue via JazzCash and EasyPaisa' },
        { loc: '/3-patti-blue-logo.webp', title: '3 Patti Blue', caption: '3 Patti Blue - Withdraw winnings' }
      ]
    },
    {
      url: '/3-patti-blue-for-pc',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9,
      images: [
        {
          loc: '/3-patti-blue.webp',
          title: '3 Patti Blue for PC',
          caption: 'Play 3 Patti Blue on PC using Android Emulator'
        }
      ]
    },
    {
      url: '/3-patti-blue-pakistan-about-us',
      lastMod: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      images: [
        {
          loc: '/3-patti-blue.webp',
          title: 'About 3 Patti Blue Pakistan',
          caption: 'Learn about 3 Patti Blue gaming platform in Pakistan'
        }
      ]
    },
    {
      url: '/blog',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
      images: [
        {
          loc: '/3-patti-blue.webp',
          title: '3 Patti Blue Blog',
          caption: 'Guides and tutorials for 3 Patti Blue gaming platform'
        }
      ]
    },
    {
      url: '/contact-us',
      lastMod: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      images: [
        { loc: '/3-patti-blue-logo.webp', title: '3 Patti Blue Contact', caption: 'Contact 3 Patti Blue support' }
      ]
    },
    {
      url: '/privacy',
      lastMod: new Date().toISOString(),
      changeFreq: 'yearly',
      priority: 0.6,
      images: [
        { loc: '/3-patti-blue-logo.webp', title: '3 Patti Blue Privacy', caption: '3 Patti Blue privacy policy' }
      ]
    },
    {
      url: '/disclaimer',
      lastMod: new Date().toISOString(),
      changeFreq: 'yearly',
      priority: 0.6,
      images: [
        { loc: '/3-patti-blue-logo.webp', title: '3 Patti Blue Disclaimer', caption: '3 Patti Blue disclaimer' }
      ]
    }
  ];

  const blogImage = [
    { loc: '/3-patti-blue.webp', title: '3 Patti Blue Blog', caption: '3 Patti Blue - Guides and tips' }
  ];

  // Blog posts
  const blogPosts: PageType[] = [
    { url: '/blog/is-3-patti-blue-real-or-fake', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/create-3-patti-blue-account-and-login', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/ips-exceed-issue-3-patti-blue-how-to-fix', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/tips-to-win-big-in-3-patti-blue', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3patti-blue-vs-other-apps', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3patti-gold-vs-3patti-blue', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3patti-lucky-vs-3patti-blue', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3patti-room-vs-3patti-blue', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3-patti-blue-app-review-2026', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3-patti-blue-bonuses-vip-guide', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3-patti-blue-tips-10-smart-tricks', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/create-account-login', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/dragon-vs-tiger-andar-bahar-high-payout-games', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/how-to-use-3-patti-blue-app-pakistan-guide-2026', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/is-3-patti-blue-safe-legal-pakistan', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/responsible-gaming-guide-3-patti-blue', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3patti-blue-old-version-features-review-and-details-2026', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3patti-blue-latest-version-new-features-and-2026-updates', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/how-to-claim-welcome-bonus-on-3patti-blue-2026-guide', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/3patti-blue-login-problems-and-solutions-2026-guide', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage },
    { url: '/blog/latest-offers-and-rewards-on-3patti-blue-2026', lastMod: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8, images: blogImage }
  ];

  // Only include existing pages
  const allPages = [...mainPages, ...blogPosts];
  
  // Generate XML with mobile and image extensions
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastMod}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
    <mobile:mobile/>
    ${page.images?.map(img => `
    <image:image>
      <image:loc>${baseUrl}${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>`).join('') || ''}
  </url>
  `).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
} 