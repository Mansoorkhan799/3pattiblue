import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://cardrummyapp.com.pk';
  
  // Note: This API route serves as fallback. The static /public/robots.txt takes precedence.
  // The static file is more comprehensive and includes AI bot restrictions.
  const robotsTxt = `# robots.txt for cardrummyapp.com.pk

# Allow search engines, but prevent AI training
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Priority pages
Allow: /download-card-rummy
Allow: /deposit-money-in-card-rummy
Allow: /withdraw-money-from-card-rummy
Allow: /card-rummy-for-pc
Allow: /about-us
Allow: /blog
Allow: /blog/is-card-rummy-real-or-fake
Allow: /blog/create-card-rummy-account-and-login
Allow: /blog/tips-to-win-big-in-card-rummy

# Standard pages
Allow: /contact-us
Allow: /privacy
Allow: /disclaimer

# Search Engine Bots (Explicitly Allow)
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Mobile
Allow: /

User-agent: Bingbot
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap-index.xml
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/image-sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
} 
