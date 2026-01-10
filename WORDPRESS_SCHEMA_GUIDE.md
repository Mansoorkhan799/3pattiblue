# Complete Guide: Adding Schema Markup to WordPress

## 🎯 Quick Answer: Best Methods

### **Method 1: Using Plugins (EASIEST - Recommended)** ⭐

#### **Option A: Rank Math SEO (Free & Best)**
1. Install **Rank Math SEO** plugin
2. Go to **Rank Math → General Settings → Schema**
3. Enable Schema Markup
4. Configure for your site type (SoftwareApplication, Organization, etc.)
5. Done! Automatically adds schema to all pages

#### **Option B: Yoast SEO (Popular)**
1. Install **Yoast SEO** plugin
2. Go to **SEO → General → Features**
3. Enable "Schema" toggle
4. Configure schema types in page editor
5. Done!

#### **Option C: Schema Pro (Premium - Most Advanced)**
1. Install **Schema Pro** plugin (paid)
2. Most comprehensive schema options
3. Visual schema builder
4. Best for complex sites

---

## 📝 Method 2: Manual Implementation (Advanced)

### **Step 1: Add Schema to WordPress Theme**

#### **A. Using functions.php (Recommended)**

Add this code to your theme's `functions.php` file:

```php
<?php
// Add Schema Markup to WordPress
function add_card_rummy_schema() {
    if (is_front_page()) {
        ?>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://cardrummyapp.com.pk/#website",
              "url": "https://cardrummyapp.com.pk/",
              "name": "Card Rummy",
              "description": "Pakistan's premier card game platform with Teen Patti, Rummy, Dragon Tiger and more",
              "inLanguage": "en-US",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://cardrummyapp.com.pk/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Organization",
              "@id": "https://cardrummyapp.com.pk/#organization",
              "name": "Card Rummy",
              "url": "https://cardrummyapp.com.pk/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cardrummyapp.com.pk/card-rummy-logo.webp",
                "width": 512,
                "height": 512
              },
              "sameAs": [
                "https://www.facebook.com/share/1at8tjJcje/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@cardrummyapp.com.pk",
                "contactType": "Customer Support",
                "areaServed": "PK"
              }
            },
            {
              "@type": "SoftwareApplication",
              "name": "Card Rummy",
              "operatingSystem": "Android 5.0+",
              "applicationCategory": "GameApplication",
              "image": "https://cardrummyapp.com.pk/card-rummy-logo.webp",
              "logo": "https://cardrummyapp.com.pk/card-rummy-logo.webp",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.5",
                "ratingCount": "500000"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "PKR"
              },
              "downloadUrl": "https://cardrummyapp.com.pk/download-card-rummy",
              "softwareVersion": "V1.225",
              "fileSize": "49MB",
              "description": "Play Teen Patti, Rummy, Dragon Tiger and other card games. Earn real money with JazzCash & EasyPaisa withdrawals.",
              "screenshot": [
                "https://cardrummyapp.com.pk/card-rummy-logo.webp",
                "https://cardrummyapp.com.pk/card-rummy.webp"
              ],
              "author": {
                "@type": "Organization",
                "name": "Card Rummy"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is Card Rummy?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Card Rummy is Pakistan's premier online card game platform where you can play Teen Patti, Rummy, Dragon vs Tiger, and many other exciting casino games."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How to download Card Rummy?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can download Card Rummy APK from the official website cardrummyapp.com.pk. The app is available for Android devices."
                  }
                }
              ]
            }
          ]
        }
        </script>
        <?php
    }
}
add_action('wp_head', 'add_card_rummy_schema');
?>
```

#### **B. Using a Custom Plugin (Better Practice)**

Create a new file: `wp-content/plugins/card-rummy-schema/card-rummy-schema.php`

```php
<?php
/**
 * Plugin Name: Card Rummy Schema Markup
 * Description: Adds structured data schema for Card Rummy website
 * Version: 1.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

function card_rummy_schema_markup() {
    if (is_front_page()) {
        $schema = array(
            '@context' => 'https://schema.org',
            '@graph' => array(
                array(
                    '@type' => 'WebSite',
                    '@id' => 'https://cardrummyapp.com.pk/#website',
                    'url' => 'https://cardrummyapp.com.pk/',
                    'name' => 'Card Rummy',
                    'description' => "Pakistan's premier card game platform",
                    'inLanguage' => 'en-US',
                    'potentialAction' => array(
                        '@type' => 'SearchAction',
                        'target' => 'https://cardrummyapp.com.pk/?s={search_term_string}',
                        'query-input' => 'required name=search_term_string'
                    )
                ),
                array(
                    '@type' => 'Organization',
                    '@id' => 'https://cardrummyapp.com.pk/#organization',
                    'name' => 'Card Rummy',
                    'url' => 'https://cardrummyapp.com.pk/',
                    'logo' => array(
                        '@type' => 'ImageObject',
                        'url' => 'https://cardrummyapp.com.pk/card-rummy-logo.webp',
                        'width' => 512,
                        'height' => 512
                    ),
                    'sameAs' => array(
                        'https://www.facebook.com/share/1at8tjJcje/'
                    ),
                    'contactPoint' => array(
                        '@type' => 'ContactPoint',
                        'email' => 'support@cardrummyapp.com.pk',
                        'contactType' => 'Customer Support',
                        'areaServed' => 'PK'
                    )
                ),
                array(
                    '@type' => 'SoftwareApplication',
                    'name' => 'Card Rummy',
                    'operatingSystem' => 'Android 5.0+',
                    'applicationCategory' => 'GameApplication',
                    'image' => 'https://cardrummyapp.com.pk/card-rummy-logo.webp',
                    'logo' => 'https://cardrummyapp.com.pk/card-rummy-logo.webp',
                    'aggregateRating' => array(
                        '@type' => 'AggregateRating',
                        'ratingValue' => '4.5',
                        'ratingCount' => '500000'
                    ),
                    'offers' => array(
                        '@type' => 'Offer',
                        'price' => '0',
                        'priceCurrency' => 'PKR'
                    ),
                    'downloadUrl' => 'https://cardrummyapp.com.pk/download-card-rummy',
                    'softwareVersion' => 'V1.225',
                    'fileSize' => '49MB',
                    'description' => 'Play Teen Patti, Rummy, Dragon Tiger and other card games.',
                    'screenshot' => array(
                        'https://cardrummyapp.com.pk/card-rummy-logo.webp',
                        'https://cardrummyapp.com.pk/card-rummy.webp'
                    ),
                    'author' => array(
                        '@type' => 'Organization',
                        'name' => 'Card Rummy'
                    )
                )
            )
        );
        
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
    }
}
add_action('wp_head', 'card_rummy_schema_markup');
```

Then activate the plugin from WordPress admin.

---

## 🎨 Method 3: Using WordPress Block Editor (Gutenberg)

### **For Individual Pages/Posts:**

1. Install **Schema & Structured Data for WP** plugin
2. Edit your page/post
3. Look for "Schema" block in block inserter
4. Choose schema type (Article, FAQ, etc.)
5. Fill in the fields
6. Publish!

---

## 📋 Schema Types for Card Rummy Website

### **1. Homepage Schema:**
- ✅ WebSite
- ✅ Organization
- ✅ SoftwareApplication
- ✅ FAQPage

### **2. Blog Post Schema:**
```php
{
  "@type": "BlogPosting",
  "headline": "Your Blog Post Title",
  "description": "Post description",
  "image": "https://cardrummyapp.com.pk/featured-image.jpg",
  "author": {
    "@type": "Organization",
    "name": "Card Rummy"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Card Rummy",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cardrummyapp.com.pk/card-rummy-logo.webp"
    }
  },
  "datePublished": "2026-01-10",
  "dateModified": "2026-01-10"
}
```

### **3. Product/App Page Schema:**
```php
{
  "@type": "SoftwareApplication",
  "name": "Card Rummy",
  "operatingSystem": "Android",
  "applicationCategory": "GameApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "PKR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "500000"
  }
}
```

### **4. FAQ Page Schema:**
```php
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Your Question?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your answer here"
      }
    }
  ]
}
```

---

## 🔧 Step-by-Step: Using Rank Math (Recommended)

### **Installation:**
1. Go to **WordPress Admin → Plugins → Add New**
2. Search for "Rank Math SEO"
3. Click **Install** then **Activate**

### **Configuration:**
1. Go to **Rank Math → General Settings**
2. Click **Schema** tab
3. Enable **Schema Markup**
4. Choose **Schema Type** for homepage:
   - Select **SoftwareApplication** (for app)
   - Or **Organization** (for company)

### **For Homepage:**
1. Edit your homepage
2. Scroll to **Rank Math** meta box
3. Click **Schema** tab
4. Select **SoftwareApplication**
5. Fill in:
   - App Name: Card Rummy
   - Operating System: Android
   - Application Category: Game
   - Price: 0
   - Rating: 4.5
   - Download URL: Your download link
6. Save!

### **For Blog Posts:**
1. Edit your blog post
2. In **Rank Math** meta box → **Schema** tab
3. Select **BlogPosting**
4. Fill in article details
5. Save!

---

## ✅ Testing Your Schema

### **Method 1: Google Rich Results Test**
1. Go to: https://search.google.com/test/rich-results
2. Enter your WordPress URL
3. Click **Test URL**
4. Check if schema is detected

### **Method 2: Schema Markup Validator**
1. Go to: https://validator.schema.org/
2. Enter your URL
3. Check for errors

### **Method 3: View Page Source**
1. Visit your WordPress site
2. Right-click → **View Page Source**
3. Search for `application/ld+json`
4. Verify schema is present

---

## 🎯 Best Practices

### **1. Use Plugins (Easier)**
- ✅ Rank Math SEO (Free, best)
- ✅ Yoast SEO (Popular)
- ✅ Schema Pro (Premium, advanced)

### **2. Don't Duplicate Schema**
- Only add schema once per page
- Don't use multiple plugins that add schema
- Check if your theme already includes schema

### **3. Validate Always**
- Test with Google Rich Results Test
- Fix any errors immediately
- Re-test after changes

### **4. Keep It Updated**
- Update schema when content changes
- Keep ratings/reviews current
- Update dates regularly

### **5. Use @graph for Multiple Schemas**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", ... },
    { "@type": "Organization", ... },
    { "@type": "SoftwareApplication", ... }
  ]
}
```

---

## 🚀 Quick Setup Checklist

- [ ] Install Rank Math SEO plugin
- [ ] Enable Schema Markup in settings
- [ ] Configure homepage schema (SoftwareApplication)
- [ ] Configure blog post schema (BlogPosting)
- [ ] Add FAQ schema if you have FAQs
- [ ] Test with Google Rich Results Test
- [ ] Fix any validation errors
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor in Search Console for schema errors

---

## 📞 Recommended Plugins (Ranked)

### **1. Rank Math SEO** ⭐⭐⭐⭐⭐
- **Price:** Free
- **Best For:** Most users
- **Features:** Complete SEO + Schema
- **Rating:** 5/5

### **2. Yoast SEO** ⭐⭐⭐⭐
- **Price:** Free (Premium available)
- **Best For:** Beginners
- **Features:** Good schema support
- **Rating:** 4/5

### **3. Schema Pro** ⭐⭐⭐⭐⭐
- **Price:** $79/year
- **Best For:** Advanced users
- **Features:** Most comprehensive
- **Rating:** 5/5 (if budget allows)

---

## 💡 Pro Tips

1. **Start with Rank Math** - It's free and does everything
2. **Test Everything** - Always validate your schema
3. **Keep It Simple** - Don't overcomplicate
4. **Update Regularly** - Keep schema current
5. **Monitor Performance** - Check Google Search Console

---

## 🎓 Example: Complete Homepage Schema for Card Rummy

Here's the complete schema you can copy-paste into your WordPress:

```php
<?php
// Add to functions.php or custom plugin
function card_rummy_complete_schema() {
    if (is_front_page()) {
        ?>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "url": "https://cardrummyapp.com.pk/",
              "name": "Card Rummy",
              "description": "Pakistan's premier card game platform",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://cardrummyapp.com.pk/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Organization",
              "name": "Card Rummy",
              "url": "https://cardrummyapp.com.pk/",
              "logo": "https://cardrummyapp.com.pk/card-rummy-logo.webp",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@cardrummyapp.com.pk",
                "contactType": "Customer Support"
              }
            },
            {
              "@type": "SoftwareApplication",
              "name": "Card Rummy",
              "operatingSystem": "Android 5.0+",
              "applicationCategory": "GameApplication",
              "image": "https://cardrummyapp.com.pk/card-rummy-logo.webp",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.5",
                "ratingCount": "500000"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "PKR"
              }
            }
          ]
        }
        </script>
        <?php
    }
}
add_action('wp_head', 'card_rummy_complete_schema');
?>
```

---

**That's it!** Choose the method that works best for you. I recommend starting with **Rank Math SEO** plugin - it's the easiest and most comprehensive solution! 🚀

