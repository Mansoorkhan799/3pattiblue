import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://cardrummyapp.com.pk';
  
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
        {
          loc: '/card-rummy.webp',
          title: 'Card Rummy Logo',
          caption: 'The official logo of Card Rummy gaming platform'
        },
        {
          loc: '/card-rummy-logo.webp',
          title: 'Card Rummy Hero Image',
          caption: 'Card Rummy gaming platform showcase'
        }
      ]
    },
    {
      url: '/download-card-rummy',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9,
      images: [
        {
          loc: '/card-rummy.webp',
          title: 'Download Card Rummy',
          caption: 'Download Card Rummy APK for Android'
        }
      ]
    },
    {
      url: '/deposit-money-in-card-rummy',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9
    },
    {
      url: '/withdraw-money-from-card-rummy',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9
    },
    {
      url: '/card-rummy-for-pc',
      lastMod: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9,
      images: [
        {
          loc: '/card-rummy.webp',
          title: 'Card Rummy for PC',
          caption: 'Play Card Rummy on PC using Android Emulator'
        }
      ]
    },
    {
      url: '/about-us',
      lastMod: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7,
      images: [
        {
          loc: '/card-rummy.webp',
          title: 'About Card Rummy',
          caption: 'Learn about Card Rummy gaming platform'
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
          loc: '/card-rummy.webp',
          title: 'Card Rummy Blog',
          caption: 'Guides and tutorials for Card Rummy gaming platform'
        }
      ]
    },
    {
      url: '/contact-us',
      lastMod: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7
    },
    {
      url: '/privacy',
      lastMod: new Date().toISOString(),
      changeFreq: 'yearly',
      priority: 0.6
    },
    {
      url: '/disclaimer',
      lastMod: new Date().toISOString(),
      changeFreq: 'yearly',
      priority: 0.6
    }
  ];

  // Blog posts
  const blogPosts: PageType[] = [
    {
      url: '/blog/is-card-rummy-real-or-fake',
      lastMod: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/blog/create-card-rummy-account-and-login',
      lastMod: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/blog/tips-to-win-big-in-card-rummy',
      lastMod: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8
    }
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