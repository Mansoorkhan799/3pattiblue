import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://3patiblueapp.com.pk';
  
  // This API route ensures consistent robots.txt across all URL variations
  // (HTTP/HTTPS, www/non-www). Matches the static file exactly.
  const robotsTxt = `# robots.txt for 3patiblueapp.com.pk

# ============================================
# AI CONTENT USAGE POLICY
# ============================================
# As a condition of accessing this website, you agree to abide by the following
# content signals:
#
# (a) If a content-signal = yes, you may collect content for the corresponding use.
# (b) If a content-signal = no, you may not collect content for the corresponding use.
# (c) If no signal is present, the website operator neither grants nor restricts
#     permission via content signal with respect to the corresponding use.
#
# Content signals:
# - search:    Building search index and providing search results
# - ai-input:  Using content for AI-generated answers and responses
# - ai-train:  Training or fine-tuning AI models
#
# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS RESERVATIONS OF
# RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN UNION DIRECTIVE 2019/790 ON COPYRIGHT
# AND RELATED RIGHTS IN THE DIGITAL SINGLE MARKET.

# ============================================
# MAIN CRAWLER RULES
# ============================================

# Allow search engines, but prevent AI training
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Priority pages (3Patti Blue routes)
Allow: /download-card-rummy
Allow: /deposit-money-in-card-rummy
Allow: /withdraw-money-from-card-rummy
Allow: /card-rummy-for-pc
Allow: /about-us
Allow: /blog
Allow: /blog/is-card-rummy-real-or-fake
Allow: /blog/create-card-rummy-account-and-login
Allow: /blog/tips-to-win-big-in-card-rummy
Allow: /blog/3patti-blue-vs-card-rummy
Allow: /blog/3patti-gold-vs-card-rummy
Allow: /blog/3patti-lucky-vs-card-rummy
Allow: /blog/dragon-vs-tiger-andar-bahar-high-payout-games

# Standard pages
Allow: /contact-us
Allow: /privacy
Allow: /disclaimer

# ============================================
# AI BOT RESTRICTIONS (Training Prevention)
# ============================================

# OpenAI GPTBot - Block training, but allow via main rule for answers
User-agent: GPTBot
Disallow: /

# Anthropic ClaudeBot - Block training
User-agent: ClaudeBot
Disallow: /

# Google Extended (AI Training) - Block training
User-agent: Google-Extended
Disallow: /

# Meta AI External Agent
User-agent: meta-externalagent
Disallow: /

# Amazon Bot
User-agent: Amazonbot
Disallow: /

# Apple AI Extended
User-agent: Applebot-Extended
Disallow: /

# ByteDance/TikTok Spider
User-agent: Bytespider
Disallow: /

# Common Crawl Bot
User-agent: CCBot
Disallow: /

# Perplexity AI Bot
User-agent: PerplexityBot
Disallow: /

# Cohere AI Bot
User-agent: cohere-ai
Disallow: /

# ============================================
# SEARCH ENGINE BOTS (Explicitly Allow)
# ============================================

# Google Search Bot (Not AI training)
User-agent: Googlebot
Allow: /

# Google Image Bot
User-agent: Googlebot-Image
Allow: /

# Google Mobile Bot
User-agent: Googlebot-Mobile
Allow: /

# Bing Bot
User-agent: Bingbot
Allow: /

# Baidu Spider (Chinese search)
User-agent: Baiduspider
Allow: /

# Yandex Bot (Russian search)
User-agent: Yandex
Allow: /

# ============================================
# SITEMAPS
# ============================================

Sitemap: ${baseUrl}/sitemap-index.xml
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/image-sitemap.xml

# ============================================
# IMPORTANT: DO NOT ADD Host DIRECTIVE
# ============================================
# The Host directive is DEPRECATED and IGNORED by Googlebot.
# Adding it will cause warnings in Google Search Console.
# Use canonical URLs and redirects instead (handled at hosting level).
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
} 
