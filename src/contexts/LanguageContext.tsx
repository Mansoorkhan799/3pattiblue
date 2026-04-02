'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function setLanguageCookie(lang: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `preferred-language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Pathname = language (middleware redirects /↔/ur by cookie); static layout = bfcache
  const [language, setLanguage] = useState<Language>(() => (pathname === '/ur' ? 'ur' : 'en'));
  const router = useRouter();

  // Sync language from URL: /ur → Urdu. Root / uses localStorage (deferred to idle to reduce main-thread work)
  useEffect(() => {
    if (pathname === '/ur') {
      setLanguage('ur');
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('preferred-language', 'ur');
          setLanguageCookie('ur');
        } catch {
          // ignore
        }
        document.documentElement.setAttribute('lang', 'ur-PK');
        document.documentElement.setAttribute('dir', 'rtl');
      }
      return;
    }
    if (pathname === '/') {
      // Defer localStorage read to idle callback - reduces main-thread blocking
      const applySavedLang = () => {
        if (typeof window === 'undefined') return;
        try {
          const savedLang = localStorage.getItem('preferred-language') as Language;
          if (savedLang && (savedLang === 'en' || savedLang === 'ur')) {
            setLanguageCookie(savedLang);
          }
          document.documentElement.setAttribute('lang', 'en-PK');
          document.documentElement.setAttribute('dir', 'ltr');
        } catch {
          document.documentElement.setAttribute('lang', 'en-PK');
          document.documentElement.setAttribute('dir', 'ltr');
        }
      };
      if (typeof requestIdleCallback !== 'undefined') {
        const id = requestIdleCallback(applySavedLang, { timeout: 2000 });
        return () => cancelIdleCallback(id);
      }
      const id = setTimeout(applySavedLang, 0);
      return () => clearTimeout(id);
    }
  }, [pathname]);

  // For non-home pages, defer language from localStorage to idle (reduces footer CLS during load)
  useEffect(() => {
    if (pathname === '/ur' || pathname === '/') return;
    if (typeof window === 'undefined') return;
    const apply = () => {
      try {
        const savedLang = localStorage.getItem('preferred-language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ur')) {
          setLanguage(savedLang);
          setLanguageCookie(savedLang);
          document.documentElement.setAttribute('lang', savedLang === 'ur' ? 'ur-PK' : 'en-PK');
          document.documentElement.setAttribute('dir', savedLang === 'ur' ? 'rtl' : 'ltr');
        }
      } catch {
        // ignore
      }
    };
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(apply, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(apply, 500);
    return () => clearTimeout(id);
  }, [pathname]);

  const toggleLanguage = () => {
    if (typeof window === 'undefined') return;

    const newLang: Language = language === 'en' ? 'ur' : 'en';

    try {
      localStorage.setItem('preferred-language', newLang);
      setLanguageCookie(newLang);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
    document.documentElement.setAttribute('lang', newLang === 'ur' ? 'ur-PK' : 'en-PK');
    document.documentElement.setAttribute('dir', newLang === 'ur' ? 'rtl' : 'ltr');
    setLanguage(newLang);

    // Reflect language in URL on home: /ur for Urdu, / for English
    const isHome = pathname === '/' || pathname === '/ur';
    if (isHome) {
      if (newLang === 'ur') {
        router.push('/ur');
      } else {
        router.push('/');
      }
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return safe defaults for SSR
    return {
      language: 'en' as Language,
      toggleLanguage: () => {},
      t: (key: string) => key
    };
  }
  return context;
}

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.home': 'Home',
    'header.download': 'Download',
    'header.deposit': 'Deposit',
    'header.withdraw': 'Withdraw',
    'header.pcVersion': 'PC Version',
    'header.aboutUs': 'About Us',
    'header.blog': 'Blog',
    'header.contactUs': 'Contact Us',
    
    // Hero Section
    'hero.title': '3 Patti Blue',
    'hero.subtitle': "Pakistan's Most Trusted",
    'hero.subtitle2': 'Teen Patti Gaming Platform 2026',
    'hero.description': "3 Patti Blue is Pakistan's #1 authentic Teen Patti gaming platform, trusted by over 1 million verified players since 2024. Experience genuine Teen Patti gameplay with advanced security, fair play algorithms, and instant withdrawals via JazzCash & EasyPaisa. Download the official 3 Patti Blue APK now and get PKR 100 welcome bonus. Play 30+ exciting card games including Teen Patti, Rummy, and Dragon Tiger - all with real money rewards and same-day payouts.",
    'hero.descriptionLink': '3 Patti Blue',
    'hero.descriptionRest': " is Pakistan's #1 authentic Teen Patti gaming platform, trusted by over 1 million verified players since 2024. Experience genuine Teen Patti gameplay with advanced security, fair play algorithms, and instant withdrawals via JazzCash & EasyPaisa. Download the official 3 Patti Blue APK now and get PKR 100 welcome bonus. Play 30+ exciting card games including Teen Patti, Rummy, and Dragon Tiger - all with real money rewards and same-day payouts.",
    'hero.link': '3 Patti Blue',
    
    // Stats
    'stats.players': 'Active Players',
    'stats.rating': 'User Rating',
    'stats.secure': 'Secure',
    
    // Buttons
    'btn.downloadNow': 'DOWNLOAD NOW',
    'btn.downloadApp': 'Download 3Patti Blue',
    'btn.download3pattiFull': 'DOWNLOAD 3PATTI BLUE NOW',
    
    // Sections
    'section.downloadInfo': '3Patti Blue APK Download Information',
    'section.overview': "Why 3Patti Blue is Pakistan's Best Teen Patti App",
    'section.understanding': "What is 3Patti Blue? Pakistan's #1 Teen Patti Platform",
    'section.whyFastest': "Why 3Patti Blue is Pakistan's Fastest Growing App 2026",
    'section.getStarted': "How to Get Started with 3Patti Blue",
    'section.screenshots': '3Patti Blue App Screenshots - Real Gameplay Experience',
    'section.features': 'Top 10 Features of 3Patti Blue (2026)',
    'section.games': '30+ Games Available on 3Patti Blue',
    'section.bonuses': '3Patti Blue Bonuses & Rewards 2026',
    'section.download': 'How to Download 3Patti Blue APK v1.225 (Latest Version 2026)',
    'section.registration': '1: Quick Registration Process (Under 2 Minutes)',
    'section.login': '2: Secure Login Process',
    'section.payment': '3Patti Blue Payment Methods: Instant Deposits & Withdrawals',
    'section.proscons': 'Honest Review: 3Patti Blue Advantages & Limitations',
    'section.support': 'Customer Support: Get Help Anytime 24/7',
    'section.faq': '3Patti Blue FAQs - Top 10 Questions Answered (2026)',
    
    // Table
    'table.appName': 'App Name',
    'table.developer': 'Developer',
    'table.category': 'Category',
    'table.size': 'Size',
    'table.version': 'Latest Version',
    'table.os': 'Required OS',
    'table.updated': 'Last Updated',
    'table.downloads': 'Total Downloads',
    'table.rating': 'User Rating',
    'table.language': 'Language Support',
    'table.price': 'Price',
    
    // Values
    'value.appName': '3Patti Blue',
    'value.developer': 'pk3pattiblue.com',
    'value.category': 'Teen Patti, Card Games',
    'value.size': '49MB',
    'value.version': '1.204(1)',
    'value.os': 'Android 5.0+',
    'value.updated': 'February 10, 2026',
    'value.downloads': '1 Million+',
    'value.rating': '4.7★ (250K reviews)',
    'value.languages': 'English, Urdu',
    'value.price': 'Free (PKR 0)',
    
    // Footer
    'footer.description': "3Patti Blue is Pakistan's most trusted Teen Patti gaming platform with 1M+ players. Enjoy authentic Teen Patti, Rummy, Dragon Tiger & 30+ games. Win real money with instant JazzCash & EasyPaisa withdrawals!",
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.downloadApp': 'Download 3Patti Blue',
    'footer.downloadDesc': 'Download 3Patti Blue APK to enjoy Pakistan\'s best Teen Patti experience. Play now & get PKR 100 welcome bonus. Instant payouts in 5-30 minutes!',
    'footer.copyright': '© 2026 3Patti Blue. All rights reserved.',
    'footer.trusted': 'Trusted by 1M+ Players',
    'footer.depositGuide': 'Deposit Guide',
    'footer.withdrawGuide': 'Withdraw Guide',
    'footer.accountLogin': 'Account & Login',
    'footer.tipsToWin': 'Tips to Win Big',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.disclaimer': 'Disclaimer',
    
    // Notices
    'notice.androidOnly': '*Available for Android devices only',
    
    // Additional Content
    'content.overview.title': 'What Makes 3Patti Blue the Best Teen Patti App in Pakistan?',
    'content.overview.text': '3Patti Blue has revolutionized online Teen Patti gaming in Pakistan since its launch in 2024. With over 1 million active players and a 4.7-star rating from 250,000+ verified reviews, it\'s become Pakistan\'s most trusted real money gaming platform. The app features an intuitive interface designed specifically for Pakistani players, with support for Urdu language and local payment methods like JazzCash and EasyPaisa.',
    'content.overview.text2': 'What sets 3Patti Blue apart is its commitment to authenticity and player security. Unlike generic gaming apps, 3Patti Blue offers genuine Teen Patti gameplay with fair algorithms audited by third-party security firms. The platform uses bank-grade 256-bit SSL encryption to protect all transactions and personal data. Players can start with as little as PKR 100 and receive instant 100% welcome bonus, or play for free using daily bonuses worth up to PKR 500. With 30+ card games including Teen Patti variants, Rummy, Dragon Tiger, and Poker, there\'s something for every skill level and preference.',
    
    'content.understanding.text': '3Patti Blue is Pakistan\'s leading online Teen Patti gaming platform, established in 2024 to provide an authentic, secure, and rewarding card gaming experience. When Pakistani players search for "3Patti Blue", they\'re looking for a legitimate platform where they can enjoy traditional Teen Patti (also known as 3 Patti or Flash) with real money stakes in a safe environment. 3Patti Blue delivers this promise through certified fair play algorithms, instant payouts, and transparent operations that have earned the trust of over 1 million users.',
    'content.understanding.text2': 'The platform specializes in Teen Patti - India and Pakistan\'s most beloved card game - while also offering 30+ other popular variants including Rummy, Dragon vs Tiger, Andar Bahar, and Poker. What makes 3Patti Blue unique is its deep understanding of local gaming culture combined with world-class technology. The app supports instant deposits and withdrawals through JazzCash and EasyPaisa (processed within 5-30 minutes), offers 24/7 customer support in Urdu and English, and provides industry-leading bonuses including 100% welcome bonus, daily rewards, and VIP rebates up to 10%. Licensed and operated with transparent practices, 3Patti Blue has become the gold standard for real money Teen Patti gaming in Pakistan.',
    
    'content.whyFastest.text': '3Patti Blue has achieved remarkable growth in Pakistan, growing from 100,000 users in 2024 to over 1 million active players in 2026. This explosive popularity stems from several key factors that address real user needs. First, the platform offers genuine earning potential - players report average monthly earnings ranging from PKR 5,000 to PKR 50,000, with top players earning even more. The minimum investment of just PKR 100 makes it accessible to everyone, while the 100% welcome bonus doubles your starting capital immediately.',
    'content.whyFastest.text2': 'Security and trust are paramount, and 3Patti Blue excels here. The platform implements KYC verification, SSL encryption, fair play algorithms, and transparent terms - earning a 4.7-star rating from 250,000+ verified users. Payment processing is seamless with JazzCash and EasyPaisa integration, ensuring withdrawals within 5-30 minutes without hidden fees. The app\'s lightweight 49MB design runs smoothly even on budget Android devices with 2GB RAM, while offering a premium gaming experience with HD graphics, smooth animations, and intuitive navigation. Daily bonuses, referral rewards (10-20% commission), VIP programs, and 24/7 support in Urdu ensure players feel valued and supported. This combination of authentic gameplay, financial security, accessibility, and genuine rewards has made 3Patti Blue the definitive Teen Patti platform in Pakistan.',
    'content.instantPayout.p1': 'One of 3Patti Blue\'s biggest advantages is its lightning-fast withdrawal system. Unlike competitors who delay payments or create bureaucratic hurdles, 3Patti Blue processes withdrawals instantly - typically within 5-30 minutes. The platform\'s integration with JazzCash and EasyPaisa, Pakistan\'s two most popular mobile wallets, makes cashing out as simple as a few taps.',
    'content.instantPayout.p2': 'The process is remarkably straightforward: once you win, simply navigate to the withdrawal section, select your preferred payment method (JazzCash or EasyPaisa), enter your mobile number and amount, and confirm. Most withdrawals are processed within 5-10 minutes for amounts under PKR 10,000, while larger withdrawals (up to PKR 2,500,000) may take 20-30 minutes for additional security verification. There are no hidden fees, no minimum withdrawal thresholds (you can withdraw as little as PKR 100), and no daily limits - your winnings are yours to access whenever you need them.',
    'content.instantPayout.p3': 'This commitment to transparent, fast payments has earned 3Patti Blue a reputation for reliability. Over 250,000 verified player reviews on TrustPilot and Google Play consistently highlight the platform\'s payment integrity, with an average rating of 4.7/5 stars. Players appreciate that their winnings are never held hostage, creating trust that encourages long-term engagement.',
    'content.getStarted.intro': 'Starting your 3Patti Blue journey is simple and takes less than 5 minutes. Follow this step-by-step guide to begin playing and earning:',
    'content.getStarted.step1': 'Download 3Patti Blue APK: Visit the official website 3patiblueapp.com.pk and click the download button. The secure 49MB APK file will be downloaded to your Android device.',
    'content.getStarted.step2': 'Enable Installation: Go to Settings → Security → Enable "Install from Unknown Sources" or "Install Unknown Apps" on your Android device to allow APK installation.',
    'content.getStarted.step3': 'Install 3Patti Blue: Locate the downloaded APK file in your Downloads folder and tap to install. The installation takes 30-60 seconds.',
    'content.getStarted.step4': 'Create Your Account: Open the 3Patti Blue app, enter your mobile number (Pakistani number recommended), create a secure password, and verify with OTP sent to your phone.',
    'content.getStarted.step5': 'Claim Welcome Bonus: Upon registration, you\'ll instantly receive free chips and can claim your 100% welcome bonus (up to PKR 100,000) on first deposit.',
    'content.getStarted.step6': 'Choose Your Game: Browse 30+ games including Teen Patti Classic, Teen Patti Joker, Rummy, Dragon Tiger, and more. Start with practice tables to learn, then move to real money tables.',
    'content.getStarted.step7': 'Start Playing & Earning: Join a table matching your skill level and budget. Play responsibly, use strategies, and enjoy authentic Teen Patti gameplay with instant winnings.',
    'content.feature1.title': '1: Authentic Teen Patti Gameplay',
    'content.feature1.text': '3Patti Blue offers genuine Teen Patti experience with traditional rules loved by millions across Pakistan and India. Play Classic Teen Patti, Joker, Muflis, and AK47 variants. Certified fair play algorithms ensure every card deal is random and transparent. Compete with real players in live multiplayer tables, join tournaments with guaranteed prize pools, and experience the thrill of authentic 3 Patti right from your mobile.',
    'content.feature2.title': '2: Lightning-Fast Payouts (5-30 Minutes)',
    'content.feature2.text': 'Unlike other platforms with days-long withdrawal processes, 3Patti Blue processes withdrawals within 5-30 minutes through JazzCash and EasyPaisa. No hidden fees, no waiting periods, no excuses. Minimum withdrawal is just PKR 500. Deposits are instant, withdrawals are same-day. Over 1 million users have successfully withdrawn PKR 10 billion+ since 2024, with a 99.8% success rate. Your winnings, your wallet, your control.',
    'content.feature3.title': '3: Bank-Grade Security (256-bit SSL)',
    'content.feature3.text': 'Your security is our top priority. 3Patti Blue implements 256-bit SSL encryption (same as banks), KYC verification, two-factor authentication, and regular third-party security audits. All payment data is encrypted and never stored. Licensed operation with transparent terms. Trusted by 1M+ users with zero security breaches since launch. Play with confidence knowing your money and data are protected by industry-leading security protocols.',
    'content.feature4.title': '4: 30+ Premium Games Collection',
    'content.feature4.text': 'Beyond Teen Patti, enjoy Rummy (Points, Pool, Deals), Dragon vs Tiger, Andar Bahar, Poker (Texas, Omaha), 7 Up Down, Blackjack, Crash, Ludo, Domino, Fishing Rush, Zoo Roulette, Car Roulette, and 15+ slot games. All games feature real money rewards, live multiplayer modes, practice tables for beginners, and HD graphics. New games added monthly based on player feedback. Never get bored with Pakistan\'s most diverse gaming platform.',
    'content.feature5.title': '5: Industry-Leading Bonuses & Rewards',
    'content.feature5.text': 'Get 100% welcome bonus up to PKR 100,000 on first deposit. Daily login rewards worth PKR 50-500. Recharge rebate of 5-30% on every deposit. VIP program offers up to 10% daily cashback. Refer friends and earn 10-20% lifetime commission on their deposits. Special festival bonuses during Eid, Ramadan, and Independence Day. More bonuses mean more playing power and bigger winning potential without additional investment.',
    'content.feature6.title': '6: Passive Income via Referrals',
    'content.feature6.text': 'Earn money without playing through our generous referral program. Share your unique referral link with friends, family, and social media followers. Earn 10-20% commission on every deposit they make - for lifetime! Top referrers earn PKR 50,000-200,000 monthly passively. Track earnings in real-time, withdraw anytime. Build your network and create sustainable passive income streams with 3Patti Blue\'s transparent and rewarding referral system.',
    'content.feature7.title': '7: Optimized for Low-End Devices',
    'content.feature7.text': 'Only 49MB download size, runs smoothly on devices with just 2GB RAM and Android 5.0+. Lightweight architecture ensures zero lag, fast loading, and minimal battery consumption. Works perfectly on budget smartphones from Xiaomi, Oppo, Vivo, Samsung. Adaptive graphics quality automatically adjusts to your device. No crashes, no freezing - premium gaming experience accessible to everyone, regardless of device specifications.',
    'content.feature8.title': '8: 24/7 Support in Urdu & English',
    'content.feature8.text': 'Get instant help in your preferred language through 24/7 live chat (2-5 minute response), WhatsApp support, email (support@3patiblueapp.com.pk), and comprehensive FAQ section. Our trained support team resolves withdrawal issues, deposit problems, game queries, and technical bugs quickly. Average resolution time: under 10 minutes for urgent issues. No question is too small - we\'re here to ensure your gaming experience is flawless.',
    'content.feature9.title': '9: Zero-Cost Entry & Practice Mode',
    'content.feature9.text': 'Download completely free with zero registration fees. Get free daily chips worth PKR 50-500 just for logging in. Practice mode available for all games - learn strategies risk-free before playing for real money. Start with as little as PKR 100 deposit, or play entirely free using daily bonuses. No pressure, no forced deposits. Learn at your own pace, play when ready. Perfect for beginners and experienced players alike.',
    'content.feature10.title': '10: Transparent & Fair Gaming',
    'content.feature10.text': 'Certified Random Number Generator (RNG) ensures every game outcome is completely random and unbiased. Published fair play policies, transparent terms and conditions, visible win rates, and real-time game history tracking. Regular third-party audits verify our systems. No rigged games, no hidden algorithms. 4.7-star rating from 250,000+ verified users proves our commitment to fair, honest, and transparent gaming. Trust you can count on.',
    'content.bonus1.title': '1: Exclusive 100% Welcome Bonus (Up to PKR 100,000)',
    'content.bonus1.text': '3Patti Blue offers the industry\'s most generous welcome bonus - 100% match on your first deposit, up to PKR 100,000. Deposit PKR 1,000, play with PKR 2,000. This instant bonus doubles your starting capital and significantly increases your winning potential from day one.',
    'content.bonus2.title': '2: Recharge Rebate Program (5-30% on Every Deposit)',
    'content.bonus2.text': 'Every deposit earns you instant bonus! 3Patti Blue rewards loyal players with rebates ranging from 5% to 30% based on deposit amount. Higher deposits = higher rebates. This is not a one-time offer - earn rebates on EVERY single deposit you make, forever.',
    'content.bonus3.title': '3: VIP Daily Rebate Program (1-10% Cashback Based on VIP Level)',
    'content.bonus3.text': 'Climb the VIP ladder (20 levels) and earn daily cashback on deposits of PKR 3,000+. Higher VIP levels unlock bigger rebates - up to 10% for VIP 19-20. Active players can earn thousands in passive rebates monthly. Claim daily, withdraw anytime. The more you play, the more you earn back.',
    'content.download.intro': 'Download the official 3Patti Blue APK safely and securely in under 2 minutes. Follow these verified steps:',
    'content.download.step1': 'Visit Official Website: Open your browser and go to 3patiblueapp.com.pk (bookmark this official source to avoid fake sites).',
    'content.download.step2': 'Click Download Button: Find the prominent "DOWNLOAD NOW" button on the homepage and tap it. The secure 49MB APK file will start downloading immediately.',
    'content.download.step3': 'Wait for Download: Download completes in 10-30 seconds depending on your internet speed. The file is saved automatically to your Downloads folder.',
    'content.download.step4': 'Verify File: Check your Downloads folder for "3Patti_Blue_v1.225.apk" (49MB). Verify the file size to ensure complete download.',
    'content.download.step5': 'Ready to Install: Now you\'re ready to install. Follow the installation steps below.',
    'content.install.title': '3Patti Blue APK Installation Guide (Android 5.0+)',
    'content.install.intro': 'Install 3Patti Blue safely in just 60 seconds with these verified steps:',
    'content.install.step1': 'Enable Unknown Sources: Go to Settings → Security → Enable "Install from Unknown Sources" or "Install Unknown Apps". This allows APK installation from sources other than Google Play. (This is safe for official apps like 3Patti Blue)',
    'content.install.step2': 'Locate APK File: Open File Manager and navigate to Downloads folder. Find "3Patti_Blue_v1.225.apk" file.',
    'content.install.step3': 'Tap to Install: Tap the APK file. Android will prompt for installation confirmation. Tap "Install" button.',
    'content.install.step4': 'Wait for Installation: Installation takes 30-60 seconds. Do not interrupt the process.',
    'content.install.step5': 'Open App: Once installation completes, tap "Open" or find the 3Patti Blue icon on your home screen/app drawer.',
    'content.install.step6': 'Create Account: Launch the app, register with your mobile number, verify via OTP, and start playing!',
    'content.install.step7': 'Claim Welcome Bonus: After registration, claim your free chips and 100% welcome bonus immediately.',
    'content.requirements.title': 'System Requirements',
    'content.requirements.tableSystem': 'System',
    'content.requirements.tableMinimum': 'Minimum',
    'content.requirements.tableRecommended': 'Recommended',
    'content.requirements.os': 'Operating System',
    'content.requirements.osMin': 'Android 4.1',
    'content.requirements.osRec': 'Android 8.0 or above',
    'content.requirements.ram': 'RAM',
    'content.requirements.ramMin': '2GB or more',
    'content.requirements.ramRec': '4GB or more',
    'content.requirements.storage': 'Storage Space',
    'content.requirements.storageMin': 'At least 500 MB free',
    'content.requirements.storageRec': '1GB free space',
    'content.requirements.processor': 'Processor',
    'content.requirements.processorMin': 'Quad-core 1.5 GHz',
    'content.requirements.processorRec': 'Octa-core 2.0 GHz',
    'content.requirements.internet': 'Internet',
    'content.requirements.internetMin': 'Stable 3G or WiFi',
    'content.requirements.internetRec': 'Fast & stable 4G or WiFi',
    'content.registrationGuide.title': '3Patti Blue Account Registration & Login Guide',
    'content.registration.title1': '1: Quick Registration Process (Under 2 Minutes)',
    'content.registration.intro': 'Create your verified 3Patti Blue account in just 2 minutes and start earning immediately:',
    'content.registration.step1': 'Launch App: Open 3Patti Blue app after installation.',
    'content.registration.step2': 'Tap Register/Sign Up: On the welcome screen, click the "Register" or "Sign Up" button (usually prominent and colored).',
    'content.registration.step3': 'Enter Mobile Number: Input your Pakistani mobile number (Jazz, Telenor, Zong, Ufone). This will be your username and withdrawal verification method.',
    'content.registration.step4': 'Create Strong Password: Set a secure password (minimum 8 characters, mix of letters, numbers, symbols recommended).',
    'content.registration.step5': 'Verify OTP: You\'ll receive a 6-digit verification code via SMS. Enter this code within 5 minutes to verify your number.',
    'content.registration.step6': 'Complete Profile (Optional): Add email for account recovery, set username, and complete KYC (recommended for faster withdrawals).',
    'content.registration.step7': 'Account Created: Congratulations! Your verified account is ready. Claim your welcome bonus immediately.',
    'content.login.title': '2: Secure Login Process',
    'content.login.intro': 'Access your 3Patti Blue account securely anytime, anywhere:',
    'content.login.step1': 'Open 3Patti Blue: Launch the app from your home screen.',
    'content.login.step2': 'Click Login: Tap the "Login" button on the welcome screen.',
    'content.login.step3': 'Enter Credentials: Input your registered mobile number or email, and your password.',
    'content.login.step4': 'Verify Details: Double-check your credentials to avoid login errors.',
    'content.login.step5': 'Tap Sign In: Click the "Sign In" or "Login" button to access your account.',
    'content.login.step6': 'Two-Factor Authentication (if enabled): Enter OTP sent to your mobile for additional security.',
    'content.login.step7': 'Forgot Password? Tap "Forgot Password" to reset via SMS OTP. You\'ll receive a code to create a new password.',
    'content.login.step8': 'Start Playing: Once logged in, your wallet balance, game history, and bonuses are instantly accessible. Choose your game and start earning!',
    'content.payment1.title': '1: JazzCash - Pakistan\'s Most Trusted Digital Wallet',
    'content.payment1.text': 'JazzCash is Pakistan\'s leading mobile financial services platform with 20+ million users. 3Patti Blue\'s seamless JazzCash integration enables: Instant deposits (funds reflect in wallet within 5 seconds), Fast withdrawals (processed in 5-30 minutes, directly to your JazzCash account), Zero hidden fees (what you withdraw is what you get), Secure transactions (encrypted and verified by JazzCash\'s banking-grade security), Minimum deposit: PKR 100, Minimum withdrawal: PKR 500. Over 500,000 successful transactions processed since launch. JazzCash is ideal for users who want the fastest, most reliable payment experience on 3Patti Blue.',
    'content.payment2.title': '2: EasyPaisa - Secure & Convenient Transactions',
    'content.payment2.text': 'EasyPaisa is Pakistan\'s largest mobile wallet service with 10+ million active users. Benefits of using EasyPaisa on 3Patti Blue: Instant deposits (money added to gaming wallet immediately), Quick withdrawals (completed within 5-30 minutes to your EasyPaisa account), Widely accessible (available at 180,000+ retail shops across Pakistan), Bank-level security (SSL encrypted transactions), No withdrawal charges, Works with all banks (link any bank account to EasyPaisa for seamless transfers). Perfect for users who prefer Telenor\'s trusted ecosystem. Both JazzCash and EasyPaisa transactions on 3Patti Blue are verified, secure, and processed 24/7 without delays.',
    'content.deposit.title': 'How to Deposit Money in 3Patti Blue (Instant Process)',
    'content.deposit.intro': 'Add funds to your 3Patti Blue wallet in under 60 seconds and start playing immediately:',
    'content.deposit.step1': 'Login: Open 3Patti Blue app and log into your verified account.',
    'content.deposit.step2': 'Go to Wallet: Tap the "Wallet" icon on the home screen (usually top-right corner with wallet/rupee symbol).',
    'content.deposit.step3': 'Select Deposit: In wallet section, click "Deposit" or "Add Money" button.',
    'content.deposit.step4': 'Choose Payment Method: Select JazzCash or EasyPaisa (both offer instant processing).',
    'content.deposit.step5': 'Enter Amount: Input deposit amount (minimum PKR 100). Remember: first deposit gets 100% welcome bonus!',
    'content.deposit.step6': 'Enter Payment Details: Provide your JazzCash/EasyPaisa account number/mobile number.',
    'content.deposit.step7': 'Confirm Transaction: Review details carefully, then tap "Confirm" or "Deposit Now".',
    'content.deposit.step8': 'Complete Payment: You\'ll be redirected to JazzCash/EasyPaisa. Authorize payment with PIN/OTP.',
    'content.deposit.step9': 'Instant Credit: Within 5 seconds, deposited amount + bonus (if applicable) appears in your 3Patti Blue wallet. Start playing!',
    'content.withdraw.title': 'How to Withdraw Money from 3Patti Blue (5-30 Minutes)',
    'content.withdraw.intro': 'Withdraw your winnings quickly and securely to your JazzCash or EasyPaisa account:',
    'content.withdraw.step1': 'Login to Account: Open 3Patti Blue app and log in with your credentials.',
    'content.withdraw.step2': 'Access Wallet: Tap the "Wallet" icon on home screen to view your balance.',
    'content.withdraw.step3': 'Select Withdrawal: Click "Withdraw" or "Cash Out" button in wallet section.',
    'content.withdraw.step4': 'Choose Payment Method: Select JazzCash or EasyPaisa (both process within 5-30 minutes).',
    'content.withdraw.step5': 'Enter Withdrawal Amount: Input amount (minimum PKR 500, no maximum limit). Ensure you have sufficient balance.',
    'content.withdraw.step6': 'Provide Account Details: Enter your verified JazzCash/EasyPaisa mobile number or account number.',
    'content.withdraw.step7': 'Verify with OTP: For security, you\'ll receive OTP on registered mobile. Enter code to verify.',
    'content.withdraw.step8': 'Double-Check Details: Review withdrawal amount and account number carefully to avoid errors.',
    'content.withdraw.step9': 'Confirm Withdrawal: Tap "Confirm" button. Your request is processed immediately.',
    'content.withdraw.step10': 'Receive Money: Within 5-30 minutes, money is transferred to your JazzCash/EasyPaisa account. You\'ll receive confirmation SMS from both 3Patti Blue and your payment provider.',
    'content.proscons.bottomLine': 'Bottom Line: 3Patti Blue\'s advantages significantly outweigh limitations for responsible players. The platform offers genuine earning opportunities with proven payouts, but requires emotional discipline and financial responsibility. Ideal for adults 18+ who enjoy Teen Patti and understand gaming risks.',
    'content.support.intro': '3Patti Blue offers industry-leading customer support with multiple channels and guaranteed response times. Choose your preferred method:',
    'content.support.chat': 'Response Time: 2-5 minutes',
    'content.support.whatsapp': 'Response Time: 5-15 minutes',
    'content.support.email': 'Response Time: 2-6 hours',
    'content.support.faq': 'Before contacting support, check our detailed FAQ section (in-app) covering 50+ common questions: How to register, deposit process, withdrawal steps, bonus terms, game rules, troubleshooting errors, payment methods, security features, VIP program details, referral system, and more. Organized by category with search function. Instant answers without waiting. Updated regularly with new queries. Self-service help available 24/7. Most users find solutions in FAQ before needing direct support.',
    'content.support.urgent': 'Urgent Issues? For withdrawal delays, payment errors, or account lockouts, use Live Chat for immediate assistance. Average resolution time: under 10 minutes for urgent cases.',
    'content.security.title': 'Is 3Patti Blue Safe? Complete Security Analysis 2026',
    'content.security.intro': 'Yes, 3Patti Blue is completely safe and secure. The platform has maintained a perfect security record since its 2024 launch, with zero data breaches affecting 1 million+ users. Here\'s our comprehensive security analysis:',
    'content.security.technical': 'Technical Security Measures: 3Patti Blue implements military-grade 256-bit SSL encryption (same standard used by banks) for all data transmission. Every transaction, login, and personal detail is encrypted end-to-end. The platform undergoes quarterly third-party security audits by certified cybersecurity firms. All servers are hosted in secure, ISO-certified data centers with 24/7 monitoring. Two-factor authentication (2FA), biometric login (fingerprint/face ID), and real-time fraud detection AI protect user accounts. Payment data is tokenized and never stored on servers, complying with international PCI-DSS standards.',
    'content.security.payment': 'Payment Security: All payments through JazzCash and EasyPaisa are processed via verified, licensed gateways. 3Patti Blue never accesses your bank account directly. Withdrawal requests undergo automated fraud checks before processing. KYC verification (ID card + selfie) prevents money laundering and ensures legitimate users. Over PKR 10 billion withdrawn successfully since 2024 with 99.8% success rate and zero unauthorized transactions reported.',
    'content.security.fairplay': 'Fair Play Assurance: Certified Random Number Generator (RNG) tested by Gaming Laboratories International ensures every card deal is completely random and unpredictable. All game outcomes are mathematically fair and auditable. Anti-cheating systems detect and ban suspicious players immediately. Published win rates and transparent algorithms build trust.',
    'content.security.googleplay': 'Why Not on Google Play? Google Play Store prohibits real-money gaming apps globally (policy applies to all regions). This is NOT because 3Patti Blue is unsafe - it\'s Google\'s blanket policy. All legitimate real-money gaming platforms worldwide distribute via APK. Always download from official website (3patiblueapp.com.pk) to avoid fake/malware versions circulating on third-party sites.',
    'content.security.responsibility': 'Your Responsibility: While 3Patti Blue provides maximum security, you must: (1) Download only from official website, (2) Never share password/OTP with anyone, (3) Enable 2FA and biometric login, (4) Use unique password not used elsewhere, (5) Regularly update app to latest version, (6) Report suspicious activity immediately to support@3patiblueapp.com.pk. Bottom Line: 3Patti Blue\'s security infrastructure exceeds industry standards. With proper precautions, your money and data are safer than many mainstream apps.',
    
    'content.getStarted.text': 'Starting your 3Patti Blue journey is simple and takes less than 5 minutes. Download the official APK, install it on your Android device, create your account, and start playing within minutes!',
    
    'content.features.title': 'Top 10 Features That Make 3Patti Blue Stand Out in 2026',
    'content.games.title': '30+ Best Games to Play on 3Patti Blue',
    'content.bonuses.title': 'Bonuses & Rewards Program 2026',
    'content.payment.title': 'Payment Methods: Instant Deposits & Withdrawals',
    'content.faq.title': 'Frequently Asked Questions (2026)',
    
    // Table translations
    'table.3pattiBlue': '3Patti Blue',
    'table.freeDownload': 'Free (PKR 0)',
    
    // Expert Tips
    'tips.title': '10 Expert Tips to Win More on 3Patti Blue',
    'tips.tip1': 'Start Small, Scale Gradually: Begin with minimum bets (PKR 10-50) to understand game mechanics and build confidence. Track your win rate over 20-30 games before increasing stakes.',
    'tips.tip2': 'Maximize Bonus Utilization: 3Patti Blue offers PKR 10,000+ in monthly bonuses through daily login (PKR 500/day), welcome bonus (100% on first deposit), referral commissions (10-20%), and VIP rebates (up to 10%).',
    'tips.tip3': 'Master High RTP Games First: Focus on games with highest Return to Player rates: Teen Patti Classic (95-98% RTP), Dragon vs Tiger (96% RTP), and Rummy (94-96% RTP).',
    'tips.tip4': 'Build Passive Income Through Referrals: Share your referral link on WhatsApp, Facebook, TikTok, and Instagram. Top referrers earn PKR 50,000-200,000 monthly without playing.',
    'tips.tip5': 'Maintain Daily Login Streak: Logging in daily for 30 consecutive days unlocks special bonuses worth PKR 1,500-3,000.',
    'tips.tip6': 'Implement Profit-Taking Strategy: Withdraw 50% of profits when you double your balance. Never keep 100% winnings in gaming wallet.',
    'tips.tip7': 'Use Practice Mode Strategically: Spend 5-10 hours in practice mode mastering each game before risking real money.',
    'tips.tip8': 'Master Emotional Discipline: Never chase losses by increasing bets impulsively. Set strict daily loss limits.',
    'tips.tip9': 'Study Opponent Patterns: Watch how experienced players bet - their timing, stake sizes, and decision patterns.',
    'tips.tip10': 'Security Best Practices: Only download from official website (3patiblueapp.com.pk). Enable two-factor authentication.',
    
    // What's New
    'whatsnew.title': "What's New in 3Patti Blue v1.225 (February 2026 Update)",
    'whatsnew.item1': 'Enhanced Graphics Engine: Upgraded to Unity 2026.1 with 4K texture support, 60 FPS gameplay, and realistic card animations. Visual quality improved by 40% while maintaining 49MB app size.',
    'whatsnew.item2': '50% Faster Loading Times: Optimized codebase reduces app launch time from 8 seconds to 4 seconds. Game table loading improved by 60%. Less waiting, more playing.',
    'whatsnew.item3': 'Redesigned UI/UX: Completely revamped interface based on user feedback from 50,000+ players. Larger buttons, clearer navigation, intuitive wallet management. New users can navigate app without tutorials.',
    'whatsnew.item4': '5 New Game Modes Added: Introducing Teen Patti Hukam, 29 Card Game, Best of Four, Speed Rummy, and Cricket Fantasy. Total game count now 35+. New modes release monthly.',
    'whatsnew.item5': 'Instant Payment Processing: Upgraded payment gateway reduces withdrawal processing time from 30 minutes to 5-15 minutes average. 95% of withdrawals now complete under 15 minutes.',
    'whatsnew.item6': 'Military-Grade Security: Implemented biometric authentication (fingerprint/face ID), hardware-backed encryption, and real-time fraud detection AI. Zero security breaches reported post-update.',
    'whatsnew.item7': 'Enhanced Bonus System: Increased welcome bonus from 50% to 100% (up to PKR 100,000). New daily spin-the-wheel feature offers bonuses up to PKR 5,000. VIP rebates increased from 8% to 10% at top tier.',
    'whatsnew.item8': 'Bug Fixes & Stability: Resolved 37 reported bugs including payment errors, login issues, and game freezes. Crash rate reduced by 92%. App now stable on 500+ Android device models.',
    'whatsnew.item9': 'Immersive Audio Experience: Added authentic casino sound effects, professional voice commentary, and dynamic background music. Volume controls and mute options easily accessible. Creates genuine casino atmosphere.',
    'whatsnew.item10': '20-Tier VIP Program: Expanded from 10 to 20 VIP levels with exclusive perks: dedicated account managers, faster withdrawals (priority processing), birthday bonuses, luxury gifts, and trip giveaways for VIP 18-20 members.',
    
    // Pros & Cons
    'proscons.title': '3Patti Blue Honest Review: Pros & Cons (Unbiased Analysis)',
    'proscons.pros.title': 'Advantages (Pros)',
    'proscons.cons.title': 'Limitations (Cons)',
    'proscons.pro1': 'Authentic Teen Patti Experience: Best 3Patti gameplay in Pakistan with traditional rules',
    'proscons.pro2': 'Real Earning Potential: Proven track record - 1M+ users, PKR 10B+ withdrawn since 2024',
    'proscons.pro3': 'Lightning-Fast Payouts: 5-30 minute withdrawals (fastest in industry)',
    'proscons.pro4': 'Local Payment Integration: Seamless JazzCash & EasyPaisa support',
    'proscons.pro5': 'Industry-Leading Bonuses: 100% welcome bonus + daily rewards + VIP rebates',
    'proscons.pro6': 'Bank-Grade Security: 256-bit SSL, KYC verification, zero breaches',
    'proscons.pro7': 'Lightweight App: Only 49MB, works on budget phones (2GB RAM)',
    'proscons.pro8': '24/7 Support: Urdu + English, live chat, WhatsApp, email',
    'proscons.pro9': '30+ Game Variety: Teen Patti, Rummy, Dragon Tiger, Poker, slots',
    'proscons.pro10': 'Transparent Operations: 4.7★ rating from 250K+ verified users',
    'proscons.pro11': 'Referral Income: Earn 10-20% lifetime commission passively',
    'proscons.pro12': 'Practice Mode: Learn risk-free before playing real money',
    'proscons.con1': 'Financial Risk: Real money gaming involves risk of loss (play responsibly with budget you can afford)',
    'proscons.con2': 'Withdrawal Minimums: PKR 500 minimum (industry standard but may be high for very small players)',
    'proscons.con3': 'Addictive Potential: Engaging gameplay requires self-discipline; set time/money limits',
    'proscons.con4': 'Not on Google Play: Must download APK directly (Google policy restricts real-money gaming apps)',
    'proscons.con5': 'Internet Required: All games require stable internet connection (3G minimum, 4G recommended)',
    'proscons.con6': 'Age Restriction: 18+ only (strictly enforced, requires ID verification for withdrawals)',
    'proscons.con7': 'Learning Curve: Some games require strategy and practice to master (not purely luck-based)',
    'proscons.con8': 'Regional Regulations: Players responsible for checking local gaming laws (varies by area)',
    'proscons.con9': 'Wagering Requirements: Bonuses have wagering requirements before withdrawal (clearly disclosed)',
    
    // Final Verdict
    'verdict.title': "Final Verdict: Why 3Patti Blue Is Pakistan's #1 Teen Patti Platform",
    'verdict.para1': 'After comprehensive analysis, 3Patti Blue stands out as Pakistan\'s premier Teen Patti gaming platform in 2026. With over 1 million active players, a 4.7-star rating from 250,000+ verified users, and PKR 10 billion+ in successful withdrawals since 2024, the platform has proven its reliability and trustworthiness. The combination of authentic Teen Patti gameplay, industry-leading bonuses (100% welcome bonus + 10% VIP cashback), lightning-fast payouts (5-30 minutes), and bank-grade security makes it the complete package for both casual players and serious gamers.',
    'verdict.para2': 'What truly sets 3Patti Blue apart is its commitment to Pakistani players - seamless JazzCash and EasyPaisa integration, 24/7 support in Urdu and English, lightweight 49MB app that works on budget phones, and genuine understanding of local gaming culture. The platform offers real earning potential (players report PKR 5,000-50,000 monthly earnings) combined with responsible gaming features and transparent operations. Whether you\'re a Teen Patti enthusiast, Rummy player, or exploring card games for the first time, 3Patti Blue provides the perfect blend of entertainment, security, and financial opportunity.',
    'verdict.para3': 'Ready to start your journey? Download 3Patti Blue APK today from the official website (3patiblueapp.com.pk), claim your PKR 100 welcome bonus, and experience Pakistan\'s most trusted Teen Patti platform. Join 1 million+ players who\'ve made 3Patti Blue their preferred gaming destination. Play responsibly, use proven strategies, and remember - success comes from skill, discipline, and smart bankroll management. Welcome to the future of authentic Teen Patti gaming in Pakistan!',
    
    // Customer Support Details
    'support.livechat.title': '💬 Live Chat (Recommended)',
    'support.livechat.details': 'Response Time: 2-5 minutes. Access 24/7 live chat directly within the 3Patti Blue app (tap support icon in menu). Our trained agents assist in Urdu and English. Perfect for: withdrawal issues, deposit problems, game queries, technical bugs, bonus questions, account verification. No waiting on hold - instant text-based communication. Available even during peak hours. Most issues resolved in single chat session (average 10 minutes). Screenshots can be shared for faster troubleshooting. Live chat is the fastest way to get help without leaving the app.',
    'support.whatsapp.title': '📱 WhatsApp Support',
    'support.whatsapp.details': 'Response Time: 5-15 minutes. Message our official WhatsApp number (find in app\'s Contact section). Convenient for users who prefer WhatsApp. Supports: text messages, voice notes (Urdu/English), screenshot sharing, video calls for complex issues. Ideal for detailed queries requiring back-and-forth conversation. Save our number for easy future access. WhatsApp support operates 24/7 with dedicated team. Receive notifications even when app is closed. Great for account recovery, security concerns, and personalized assistance. Professional, friendly service guaranteed.',
    'support.email.title': '📧 Email Support',
    'support.email.details': 'Response Time: 2-6 hours. Email: support@3patiblueapp.com.pk. Best for: non-urgent queries, detailed complaints, account issues, feature requests, partnership inquiries. Include your registered mobile number for faster resolution. Attach screenshots/videos if relevant. Our team provides comprehensive written responses. All emails answered within 6 hours (usually 2-3 hours). Creates written record for future reference. Professional, courteous service. Monday-Sunday, 24/7 email monitoring.',
    'support.faqdb.title': '📚 Comprehensive FAQ Database',
    
    // FAQ Questions & Answers
    'faq.q1': 'What is 3Patti Blue and how does it work?',
    'faq.a1': '3Patti Blue is Pakistan\'s most trusted Teen Patti gaming platform launched in 2024, now serving 1 million+ active players. It offers authentic Teen Patti gameplay where you compete with real players and win real money. The platform provides 30+ card games including Teen Patti variants, Rummy, Dragon Tiger, and Poker. You can start playing with as little as PKR 100 deposit or use free daily bonuses (PKR 50-500). 3Patti Blue uses certified fair play algorithms, 256-bit SSL encryption, and offers instant withdrawals (5-30 minutes) via JazzCash and EasyPaisa. With 24/7 support in Urdu/English and a 4.7-star rating from 250,000+ verified users, it\'s the gold standard for real money Teen Patti gaming in Pakistan.',
    'faq.q2': 'How to download 3Patti Blue APK safely?',
    'faq.a2': 'To download 3Patti Blue APK safely: (1) Visit the official website 3patiblueapp.com.pk (bookmark this URL - never download from third-party sites), (2) Click the "DOWNLOAD NOW" button, (3) The secure 49MB APK file (v1.225) will download to your device, (4) Go to Settings → Security → Enable "Install from Unknown Sources", (5) Open Downloads folder and tap the APK file, (6) Tap "Install" and wait 60 seconds, (7) Open app, register with your mobile number, and start playing! Always verify you\'re downloading from the official website to avoid fake versions. The authentic 3Patti Blue APK is malware-free, tested, and safe.',
    'faq.q3': 'What makes 3Patti Blue better than other Teen Patti apps?',
    'faq.a3': '3Patti Blue surpasses competitors in 5 key areas: (1) Fastest Payouts: 5-30 minute withdrawals vs 24-72 hours on other apps, (2) Best Bonuses: 100% welcome bonus (up to PKR 100,000) + 10% VIP cashback - highest in industry, (3) Authentic Gameplay: Certified RNG and traditional Teen Patti rules loved by purists, (4) Superior Security: Bank-grade encryption, zero breaches since 2024, (5) Local Excellence: JazzCash/EasyPaisa integration, Urdu support, Pakistan-specific features. With 1M+ users and 4.7★ rating, 3Patti Blue is the proven choice for serious Teen Patti players.',
    'faq.q4': 'Is 3Patti Blue safe, legal, and trustworthy?',
    'faq.a4': 'Yes, 3Patti Blue is completely safe and trustworthy. Security: Uses 256-bit SSL encryption (bank-level), KYC verification, 2FA, and biometric login. Zero security breaches in 2+ years. Trustworthiness: 1 million+ users, 4.7★ rating from 250K+ verified reviews, PKR 10B+ withdrawn successfully. All games use certified RNG for fairness. Transparent terms, published win rates, and third-party audits. Legal Status: Real-money gaming legality varies by region in Pakistan. Players are responsible for checking local regulations. 3Patti Blue operates transparently with age verification (18+ only) and responsible gaming tools. Always download from official website (3patiblueapp.com.pk) for guaranteed safety.',
    'faq.q5': 'Can users lose money while playing?',
    'faq.a5': 'Yes, this app is involved with real money, so you might lose some amount if you do not play the games carefully. So, always play wisely and set a limit while playing.',
    'faq.q6': 'Is it possible to change the language of 3Patti Blue?',
    'faq.a6': 'Yes, it is possible because this app supports multiple languages (English and Urdu), so you can change the language from the settings menu or language toggle button easily.',
    'faq.q7': 'How do referral rewards work?',
    'faq.a7': 'When you share your referral link with others, or when someone joins this app through your link, you can receive a commission of 10-20% on their deposits for lifetime.',
    'faq.q8': 'Is 3Patti Blue available on iPhone (iOS)?',
    'faq.a8': '3Patti Blue is currently available for Android devices (Android 5.0+). You can check the official website 3patiblueapp.com.pk for updates about iOS availability in the future.',
  },
  ur: {
    // Header (Urdu)
    'header.home': 'ہوم',
    'header.download': 'ڈاؤن لوڈ',
    'header.deposit': 'رقم جمع کریں',
    'header.withdraw': 'رقم نکالیں',
    'header.pcVersion': 'پی سی ورژن',
    'header.aboutUs': 'ہمارے بارے میں',
    'header.blog': 'بلاگ',
    'header.contactUs': 'رابطہ کریں',
    
    // Hero Section (Urdu)
    'hero.title': 'تین پتی بلیو',
    'hero.subtitle': 'پاکستان کا سب سے قابل اعتماد',
    'hero.subtitle2': 'تین پتی گیمنگ پلیٹ فارم 2026',
    'hero.description': 'تین پتی بلیو پاکستان کا نمبر ون اور سب سے قابل اعتماد تین پتی گیمنگ پلیٹ فارم ہے۔ 2024 سے 10 لاکھ سے زیادہ تصدیق شدہ کھلاڑی ہم پر اعتماد کرتے ہیں۔ جاز کیش اور ایزی پیسہ کے ذریعے فوری نکاسی (5-30 منٹ)۔ ابھی آفیشل تین پتی بلیو APK ڈاؤن لوڈ کریں اور 100 روپے ویلکم بونس حاصل کریں۔ 30+ دلچسپ کارڈ گیمز جیسے تین پتی، رمی اور ڈریگن ٹائیگر کھیلیں - سب کے ساتھ حقیقی پیسے کے انعامات اور اسی دن ادائیگی۔',
    'hero.descriptionLink': 'تین پتی بلیو',
    'hero.descriptionRest': ' پاکستان کا نمبر ون اور سب سے قابل اعتماد تین پتی گیمنگ پلیٹ فارم ہے۔ 2024 سے 10 لاکھ سے زیادہ تصدیق شدہ کھلاڑی ہم پر اعتماد کرتے ہیں۔ جاز کیش اور ایزی پیسہ کے ذریعے فوری نکاسی (5-30 منٹ)۔ ابھی آفیشل تین پتی بلیو APK ڈاؤن لوڈ کریں اور 100 روپے ویلکم بونس حاصل کریں۔ 30+ دلچسپ کارڈ گیمز جیسے تین پتی، رمی اور ڈریگن ٹائیگر کھیلیں - سب کے ساتھ حقیقی پیسے کے انعامات اور اسی دن ادائیگی۔',
    'hero.link': 'تین پتی بلیو',
    
    // Stats (Urdu)
    'stats.players': 'فعال کھلاڑی',
    'stats.rating': 'صارف کی درجہ بندی',
    'stats.secure': 'محفوظ',
    
    // Buttons (Urdu)
    'btn.downloadNow': 'ابھی ڈاؤن لوڈ کریں',
    'btn.downloadApp': '3Patti Blue ڈاؤن لوڈ کریں',
    'btn.download3pattiFull': 'ابھی تین پتی بلیو ڈاؤن لوڈ کریں',
    
    // Sections (Urdu)
    'section.downloadInfo': '3Patti Blue APK ڈاؤن لوڈ کی معلومات',
    'section.overview': 'تین پتی بلیو کو پاکستان میں بہترین تین پتی ایپ کیوں بناتا ہے؟',
    'section.understanding': 'تین پتی بلیو کو سمجھنا: پاکستان کا اہم تین پتی پلیٹ فارم',
    'section.whyFastest': 'تین پتی بلیو پاکستان کی تیز ترین ایپ 2026',
    'section.getStarted': 'تین پتی بلیو کے ساتھ شروعات کیسے کریں',
    'section.screenshots': 'تین پتی بلیو ایپ اسکرین شاٹس - حقیقی گیم پلے کا تجربہ',
    'section.features': 'تین پتی بلیو کی 10 بہترین خصوصیات (2026)',
    'section.games': 'تین پتی بلیو پر 30+ گیمز',
    'section.bonuses': 'تین پتی بلیو بونس اور انعامات 2026',
    'section.download': '3Patti Blue APK v1.225 کیسے ڈاؤن لوڈ کریں (تازہ ترین ورژن 2026)',
    'section.registration': '1: فوری رجسٹریشن کا عمل (2 منٹ سے کم)',
    'section.login': '2: محفوظ لاگ ان کا عمل',
    'section.payment': 'تین پتی بلیو ادائیگی کے طریقے: فوری جمع اور نکاسی',
    'section.proscons': 'ایماندار جائزہ: تین پتی بلیو کے فوائد اور حدود',
    'section.support': 'کسٹمر سپورٹ: کسی بھی وقت 24/7 مدد حاصل کریں',
    'section.faq': 'تین پتی بلیو عام سوالات - 10 اہم سوالات کے جوابات (2026)',
    
    // Table (Urdu)
    'table.appName': 'ایپ کا نام',
    'table.developer': 'ڈویلپر',
    'table.category': 'زمرہ',
    'table.size': 'سائز',
    'table.version': 'تازہ ترین ورژن',
    'table.os': 'مطلوبہ او ایس',
    'table.updated': 'آخری اپ ڈیٹ',
    'table.downloads': 'کل ڈاؤن لوڈز',
    'table.rating': 'صارف کی درجہ بندی',
    'table.language': 'زبان کی معاونت',
    'table.price': 'قیمت',
    
    // Values (Urdu)
    'value.appName': 'تین پتی بلیو',
    'value.developer': 'pk3pattiblue.com',
    'value.category': 'تین پتی، کارڈ گیمز',
    'value.size': '49MB',
    'value.version': '1.204(1)',
    'value.os': 'Android 5.0+',
    'value.updated': '10 فروری، 2026',
    'value.downloads': '10 لاکھ+',
    'value.rating': '4.7★ (250 ہزار جائزے)',
    'value.languages': 'انگریزی، اردو',
    'value.price': 'مفت (PKR 0)',
    
    // Footer (Urdu)
    'footer.description': 'تین پتی بلیو 10 لاکھ سے زیادہ کھلاڑیوں کے ساتھ پاکستان کا سب سے قابل اعتماد تین پتی گیمنگ پلیٹ فارم ہے۔ اصلی تین پتی، رمی، ڈریگن ٹائیگر اور 30+ گیمز سے لطف اندوز ہوں۔ جاز کیش اور ایزی پیسہ کے ذریعے فوری نکاسی کے ساتھ حقیقی پیسے جیتیں!',
    'footer.quickLinks': 'فوری لنکس',
    'footer.resources': 'وسائل',
    'footer.downloadApp': 'تین پتی بلیو ڈاؤن لوڈ کریں',
    'footer.downloadDesc': 'پاکستان کے بہترین تین پتی تجربے سے لطف اندوز ہونے کے لیے 3Patti Blue APK ڈاؤن لوڈ کریں۔ ابھی کھیلیں اور 100 روپے ویلکم بونس حاصل کریں۔ 5-30 منٹ میں فوری ادائیگی!',
    'footer.copyright': '© 2026 تین پتی بلیو۔ تمام حقوق محفوظ ہیں۔',
    'footer.trusted': '10 لاکھ سے زیادہ کھلاڑیوں کا اعتماد',
    'footer.depositGuide': 'ڈپازٹ گائیڈ',
    'footer.withdrawGuide': 'نکاسی گائیڈ',
    'footer.accountLogin': 'اکاؤنٹ اور لاگ ان',
    'footer.tipsToWin': 'بڑی جیت کے لیے نکات',
    'footer.privacyPolicy': 'رازداری کی پالیسی',
    'footer.disclaimer': 'دستبرداری',
    
    // Notices (Urdu)
    'notice.androidOnly': '*صرف اینڈرائیڈ ڈیوائسز کے لیے دستیاب',
    
    // Additional Content (Urdu)
    'content.overview.title': 'تین پتی بلیو کو پاکستان میں بہترین تین پتی ایپ کیوں بناتا ہے؟',
    'content.overview.text': 'تین پتی بلیو نے 2024 میں اپنی شروعات کے بعد سے پاکستان میں آن لائن تین پتی گیمنگ میں انقلاب برپا کر دیا ہے۔ 10 لاکھ سے زیادہ فعال کھلاڑیوں اور 250,000+ تصدیق شدہ جائزوں سے 4.7 اسٹار کی درجہ بندی کے ساتھ، یہ پاکستان کا سب سے قابل اعتماد حقیقی رقم کا گیمنگ پلیٹ فارم بن گیا ہے۔ ایپ میں خاص طور پر پاکستانی کھلاڑیوں کے لیے ڈیزائن کیا گیا سہولت بھرا انٹرفیس ہے، جس میں اردو زبان اور مقامی ادائیگی کے طریقے جیسے جاز کیش اور ایزی پیسہ کی معاونت شامل ہے۔',
    'content.overview.text2': 'تین پتی بلیو کو منفرد بنانے والی چیز اصلیت اور کھلاڑیوں کی سیکیورٹی کے لیے اس کی وابستگی ہے۔ عام گیمنگ ایپس کے برعکس، تین پتی بلیو تیسری پارٹی کی سیکیورٹی فرموں کے ذریعے تصدیق شدہ منصفانہ الگورتھم کے ساتھ حقیقی تین پتی گیم پلے پیش کرتا ہے۔ پلیٹ فارم تمام لین دین اور ذاتی ڈیٹا کی حفاظت کے لیے بینک کی سطح کی 256-bit SSL انکرپشن استعمال کرتا ہے۔ کھلاڑی PKR 100 جتنی کم رقم سے شروع کر سکتے ہیں اور فوری 100% خوش آمدید بونس حاصل کر سکتے ہیں، یا PKR 500 تک کے روزانہ بونس استعمال کرتے ہوئے مفت میں کھیل سکتے ہیں۔ تین پتی کی مختلف قسموں، رمی، ڈریگن ٹائیگر، اور پوکر سمیت 30+ کارڈ گیمز کے ساتھ، ہر مہارت کی سطح اور ترجیح کے لیے کچھ نہ کچھ ہے۔',
    
    'content.understanding.text': 'تین پتی بلیو پاکستان کا سرکردہ آن لائن تین پتی گیمنگ پلیٹ فارم ہے، جو 2024 میں قائم کیا گیا تھا تاکہ ایک مستند، محفوظ، اور فائدہ مند کارڈ گیمنگ کا تجربہ فراہم کیا جا سکے۔ جب پاکستانی کھلاڑی "3Patti Blue" تلاش کرتے ہیں، تو وہ ایک جائز پلیٹ فارم تلاش کر رہے ہوتے ہیں جہاں وہ محفوظ ماحول میں حقیقی رقم کی شرطوں کے ساتھ روایتی تین پتی (جسے 3 پتی یا فلیش بھی کہا جاتا ہے) سے لطف اندوز ہو سکیں۔ تین پتی بلیو تصدیق شدہ منصفانہ کھیل کے الگورتھم، فوری ادائیگیوں، اور شفاف کاروائیوں کے ذریعے یہ وعدہ پورا کرتا ہے جس نے 10 لاکھ سے زیادہ صارفین کا اعتماد حاصل کیا ہے۔',
    'content.understanding.text2': 'یہ پلیٹ فارم تین پتی میں مہارت رکھتا ہے - ہندوستان اور پاکستان کا سب سے پسندیدہ کارڈ گیم - جبکہ رمی، ڈریگن بمقابلہ ٹائیگر، اندر باہر، اور پوکر سمیت 30+ دیگر مقبول ورینٹس بھی پیش کرتا ہے۔ تین پتی بلیو کو منفرد بنانے والی چیز عالمی معیار کی ٹیکنالوجی کے ساتھ مقامی گیمنگ ثقافت کی گہری سمجھ ہے۔ ایپ جاز کیش اور ایزی پیسہ کے ذریعے فوری جمع اور نکاسی کی معاونت کرتی ہے (5-30 منٹ میں پروسیس کی جاتی ہے)، اردو اور انگریزی میں 24/7 کسٹمر سپورٹ فراہم کرتی ہے، اور 100% خوش آمدید بونس، روزانہ انعامات، اور 10% تک VIP چھوٹ سمیت صنعت کی سرکردہ بونس فراہم کرتی ہے۔ لائسنس یافتہ اور شفاف طریقوں کے ساتھ چلایا جاتا ہے، تین پتی بلیو پاکستان میں حقیقی رقم کی تین پتی گیمنگ کا سنہری معیار بن گیا ہے۔',
    
    'content.whyFastest.text': 'تین پتی بلیو نے پاکستان میں نمایاں ترقی حاصل کی ہے، 2024 میں 100,000 صارفین سے 2026 میں 10 لاکھ سے زیادہ فعال کھلاڑیوں تک پہنچ گیا ہے۔ یہ زبردست مقبولیت کئی اہم عوامل سے پیدا ہوتی ہے جو صارفین کی حقیقی ضروریات کو پورا کرتے ہیں۔ سب سے پہلے، پلیٹ فارم حقیقی کمائی کی صلاحیت پیش کرتا ہے - کھلاڑیوں نے اوسط ماہانہ PKR 5,000 سے PKR 50,000 تک کمائی کی اطلاع دی ہے، جبکہ ٹاپ کھلاڑی اس سے بھی زیادہ کماتے ہیں۔ صرف PKR 100 کی کم سے کم سرمایہ کاری اسے ہر کسی کے لیے قابل رسائی بناتی ہے، جبکہ 100% خوش آمدید بونس آپ کی ابتدائی سرمایہ کو فوری طور پر دوگنا کر دیتا ہے۔',
    'content.whyFastest.text2': 'سیکیورٹی اور اعتماد سب سے اہم ہیں، اور تین پتی بلیو یہاں بہترین ہے۔ پلیٹ فارم KYC تصدیق، SSL انکرپشن، منصفانہ کھیل کے الگورتھم، اور شفاف شرائط کو نافذ کرتا ہے - 250,000+ تصدیق شدہ صارفین سے 4.7 اسٹار کی درجہ بندی حاصل کرتا ہے۔ ادائیگی کی کارروائی جاز کیش اور ایزی پیسہ انٹیگریشن کے ساتھ بغیر کسی رکاوٹ کے ہے، جو چھپی ہوئی فیس کے بغیر 5-30 منٹ میں نکاسی کو یقینی بناتی ہے۔ ایپ کا ہلکا پھلکا 49MB ڈیزائن صرف 2GB RAM والے بجٹ اینڈرائیڈ ڈیوائسز پر بھی آسانی سے چلتا ہے، جبکہ HD گرافکس، ہموار اینیمیشن، اور بدیہی نیویگیشن کے ساتھ پریمیم گیمنگ کا تجربہ پیش کرتا ہے۔ روزانہ بونسز، ریفرل انعامات (10-20% کمیشن)، VIP پروگرامز، اور اردو میں 24/7 سپورٹ اس بات کو یقینی بناتی ہے کہ کھلاڑی قدر اور معاونت محسوس کریں۔ اصلی گیم پلے، مالی سیکیورٹی، رسائی، اور حقیقی انعامات کے اس امتزاج نے تین پتی بلیو کو پاکستان میں تین پتی کا حتمی پلیٹ فارم بنا دیا ہے۔',
    'content.instantPayout.p1': 'تین پتی بلیو کے سب سے بڑے فوائد میں سے ایک اس کا بجلی کی تیزی سے نکاسی کا نظام ہے۔ حریفوں کے برعکس جو ادائیگیوں میں تاخیر کرتے ہیں یا بیوروکریٹک رکاوٹیں پیدا کرتے ہیں، تین پتی بلیو فوری طور پر نکاسی کی کارروائی کرتا ہے - عام طور پر 5-30 منٹ میں۔ پاکستان کے دو سب سے مقبول موبائل والٹس جاز کیش اور ایزی پیسہ کے ساتھ پلیٹ فارم کی انٹیگریشن کیشنگ آؤٹ کو چند ٹیپ جتنا آسان بنا دیتی ہے۔',
    'content.instantPayout.p2': 'یہ عمل نمایاں طور پر سیدھا ہے: ایک بار جب آپ جیت جاتے ہیں، تو بس نکاسی کے سیکشن میں جائیں، اپنا ترجیحی ادائیگی کا طریقہ منتخب کریں (جاز کیش یا ایزی پیسہ)، اپنا موبائل نمبر اور رقم درج کریں، اور تصدیق کریں۔ زیادہ تر نکاسی PKR 10,000 سے کم رقم کے لیے 5-10 منٹ میں کارروائی کی جاتی ہے، جبکہ بڑی نکاسی (PKR 2,500,000 تک) اضافی سیکیورٹی تصدیق کے لیے 20-30 منٹ لے سکتی ہے۔ کوئی چھپی ہوئی فیس نہیں، کوئی کم سے کم نکاسی کی حد نہیں (آپ PKR 100 جتنی کم رقم نکال سکتے ہیں)، اور کوئی روزانہ کی حد نہیں - آپ کی جیت آپ کی ہے جب بھی آپ کو ضرورت ہو۔',
    'content.instantPayout.p3': 'شفاف، تیز ادائیگیوں کے اس عزم نے تین پتی بلیو کو قابل اعتماد کی ساکھ دلائی ہے۔ TrustPilot اور Google Play پر 250,000 سے زیادہ تصدیق شدہ کھلاڑیوں کے جائزے پلیٹ فارم کی ادائیگی کی سالمیت کو مسلسل نمایاں کرتے ہیں، جس کی اوسط درجہ بندی 4.7/5 ستارے ہے۔ کھلاڑی اس بات کی تعریف کرتے ہیں کہ ان کی جیت کبھی یرغمال نہیں بنائی جاتی، جو اعتماد پیدا کرتی ہے جو طویل مدتی مشغولیت کی حوصلہ افزائی کرتی ہے۔',
    'content.getStarted.intro': 'تین پتی بلیو کا سفر شروع کرنا آسان ہے اور 5 منٹ سے بھی کم وقت لگتا ہے۔ کھیلنا اور کمانا شروع کرنے کے لیے اس مرحلہ وار گائیڈ پر عمل کریں:',
    'content.getStarted.step1': 'تین پتی بلیو APK ڈاؤن لوڈ کریں: آفیشل ویب سائٹ 3patiblueapp.com.pk پر جائیں اور ڈاؤن لوڈ بٹن پر کلک کریں۔ محفوظ 49MB APK فائل آپ کے اینڈرائیڈ ڈیوائس میں ڈاؤن لوڈ ہو جائے گی۔',
    'content.getStarted.step2': 'انسٹالیشن فعال کریں: Settings → Security میں جائیں → اپنے اینڈرائیڈ ڈیوائس پر "Install from Unknown Sources" یا "Install Unknown Apps" کو فعال کریں تاکہ APK انسٹالیشن کی اجازت مل سکے۔',
    'content.getStarted.step3': 'تین پتی بلیو انسٹال کریں: اپنے Downloads فولڈر میں ڈاؤن لوڈ شدہ APK فائل تلاش کریں اور انسٹال کرنے کے لیے ٹیپ کریں۔ انسٹالیشن میں 30-60 سیکنڈ لگتے ہیں۔',
    'content.getStarted.step4': 'اپنا اکاؤنٹ بنائیں: تین پتی بلیو ایپ کھولیں، اپنا موبائل نمبر درج کریں (پاکستانی نمبر تجویز کیا جاتا ہے)، ایک محفوظ پاس ورڈ بنائیں، اور اپنے فون پر بھیجے گئے OTP سے تصدیق کریں۔',
    'content.getStarted.step5': 'خوش آمدید بونس حاصل کریں: رجسٹریشن کے بعد، آپ کو فوری طور پر مفت چپس ملیں گے اور آپ اپنی پہلی ڈپازٹ پر 100% خوش آمدید بونس (PKR 100,000 تک) کا دعویٰ کر سکتے ہیں۔',
    'content.getStarted.step6': 'اپنا گیم منتخب کریں: 30+ گیمز براؤز کریں جن میں تین پتی کلاسک، تین پتی جوکر، رمی، ڈریگن ٹائیگر، اور بہت کچھ شامل ہے۔ سیکھنے کے لیے پریکٹس ٹیبلز سے شروع کریں، پھر اصلی رقم والے ٹیبلز پر جائیں۔',
    'content.getStarted.step7': 'کھیلنا اور کمانا شروع کریں: اپنی مہارت کی سطح اور بجٹ سے مماثل ٹیبل میں شامل ہوں۔ ذمہ داری سے کھیلیں، حکمت عملی استعمال کریں، اور فوری جیت کے ساتھ اصلی تین پتی گیم پلے کا لطف اٹھائیں۔',
    'content.feature1.title': '1: اصلی تین پتی گیم پلے',
    'content.feature1.text': 'تین پتی بلیو پاکستان اور انڈیا میں لاکھوں لوگوں کی پسندیدہ روایتی قواعد کے ساتھ حقیقی تین پتی تجربہ فراہم کرتا ہے۔ کلاسک تین پتی، جوکر، مفلس، اور AK47 ویریئنٹس کھیلیں۔ سرٹیفائیڈ فیئر پلے الگورتھم اس بات کو یقینی بناتے ہیں کہ ہر کارڈ ڈیل بالکل رینڈم اور شفاف ہے۔ لائیو ملٹی پلیئر ٹیبلز میں اصلی کھلاڑیوں کے ساتھ مقابلہ کریں، گارنٹی شدہ انعامی پول کے ساتھ ٹورنامنٹس میں شامل ہوں، اور اپنے موبائل سے اصلی 3 پتی کی سنسنی کا تجربہ کریں۔',
    'content.feature2.title': '2: بجلی کی تیزی سے ادائیگی (5-30 منٹ)',
    'content.feature2.text': 'دیگر پلیٹ فارمز کے برعکس جہاں دنوں تک انتظار ہوتا ہے، تین پتی بلیو JazzCash اور EasyPaisa کے ذریعے 5-30 منٹ میں نکاسی کی کارروائی کرتا ہے۔ کوئی چھپی ہوئی فیس نہیں، کوئی انتظار کی مدت نہیں، کوئی بہانہ نہیں۔ کم سے کم نکاسی صرف PKR 500 ہے۔ ڈپازٹ فوری ہیں، نکاسی اسی دن ہوتی ہے۔ 2024 سے 10 لاکھ سے زیادہ صارفین نے PKR 10 بلین+ کامیابی سے نکال لیے ہیں، 99.8% کامیابی کی شرح کے ساتھ۔ آپ کی جیت، آپ کا پرس، آپ کا کنٹرول۔',
    'content.feature3.title': '3: بینک گریڈ سیکیورٹی (256-bit SSL)',
    'content.feature3.text': 'آپ کی سیکیورٹی ہماری سب سے بڑی ترجیح ہے۔ تین پتی بلیو 256-bit SSL انکرپشن (بینکوں جیسا)، KYC تصدیق، ٹو فیکٹر تصدیق، اور باقاعدہ تھرڈ پارٹی سیکیورٹی آڈٹس کو نافذ کرتا ہے۔ تمام ادائیگی کا ڈیٹا انکرپٹ ہے اور کبھی محفوظ نہیں کیا جاتا۔ شفاف شرائط کے ساتھ لائسنس یافتہ آپریشن۔ شروع سے صفر سیکیورٹی خلاف ورزی کے ساتھ 10 لاکھ+ صارفین کی اعتماد۔ اعتماد کے ساتھ کھیلیں یہ جانتے ہوئے کہ آپ کی رقم اور ڈیٹا صنعت کی معروف سیکیورٹی پروٹوکولز سے محفوظ ہیں۔',
    'content.feature4.title': '4: 30+ پریمیم گیمز کا مجموعہ',
    'content.feature4.text': 'تین پتی سے ہٹ کر، رمی (پوائنٹس، پول، ڈیلز)، ڈریگن بمقابلہ ٹائیگر، اندر باہر، پوکر (ٹیکساس، اوماہا)، 7 اپ ڈاؤن، بلیک جیک، کریش، لوڈو، ڈومینو، فشنگ رش، زو رولیٹ، کار رولیٹ، اور 15+ سلاٹ گیمز کا لطف اٹھائیں۔ تمام گیمز میں اصلی رقم کے انعامات، لائیو ملٹی پلیئر موڈز، شروعات کرنے والوں کے لیے پریکٹس ٹیبلز، اور HD گرافکس شامل ہیں۔ کھلاڑیوں کی فیڈ بیک کی بنیاد پر ہر ماہ نئے گیمز شامل کیے جاتے ہیں۔ پاکستان کے سب سے متنوع گیمنگ پلیٹ فارم سے کبھی بور نہ ہوں۔',
    'content.feature5.title': '5: صنعت کی معروف بونسز اور انعامات',
    'content.feature5.text': 'پہلی ڈپازٹ پر PKR 100,000 تک 100% خوش آمدید بونس حاصل کریں۔ روزانہ لاگ ان انعامات PKR 50-500 کی مالیت۔ ہر ڈپازٹ پر 5-30% ری چارج ری بیٹ۔ VIP پروگرام روزانہ 10% تک کیش بیک پیش کرتا ہے۔ دوستوں کو رجسٹر کریں اور ان کی ڈپازٹس پر 10-20% زندگی بھر کمیشن حاصل کریں۔ عید، رمضان، اور یوم آزادی کے دوران خصوصی تہوار بونسز۔ زیادہ بونسز کا مطلب ہے زیادہ کھیلنے کی طاقت اور اضافی سرمایہ کاری کے بغیر بڑی جیت کی صلاحیت۔',
    'content.feature6.title': '6: ریفرلز کے ذریعے پیسیو انکم',
    'content.feature6.text': 'ہمارے فیاض ریفرل پروگرام کے ذریعے کھیلے بغیر رقم کمائیں۔ اپنا منفرد ریفرل لنک دوستوں، خاندان، اور سوشل میڈیا فالورز کے ساتھ شیئر کریں۔ ان کی ہر ڈپازٹ پر 10-20% کمیشن حاصل کریں - زندگی بھر! ٹاپ ریفررز ماہانہ PKR 50,000-200,000 پیسیو طریقے سے کماتے ہیں۔ ریئل ٹائم میں آمدنی ٹریک کریں، کسی بھی وقت نکالیں۔ تین پتی بلیو کے شفاف اور فائدہ مند ریفرل سسٹم کے ساتھ اپنا نیٹ ورک بنائیں اور پائیدار پیسیو انکم سٹریمز بنائیں۔',
    'content.feature7.title': '7: کم درجے کے ڈیوائسز کے لیے بہتر بنایا گیا',
    'content.feature7.text': 'صرف 49MB ڈاؤن لوڈ سائز، صرف 2GB RAM اور Android 5.0+ والے ڈیوائسز پر آسانی سے چلتا ہے۔ ہلکے پھلکے فن تعمیر صفر لیگ، تیز لوڈنگ، اور کم سے کم بیٹری کی کھپت کو یقینی بناتا ہے۔ Xiaomi، Oppo، Vivo، Samsung کے بجٹ سمارٹ فونز پر بالکل کام کرتا ہے۔ موافق گرافکس کوالٹی خودکار طور پر آپ کے ڈیوائس کے مطابق ایڈجسٹ ہو جاتی ہے۔ کوئی کریش نہیں، کوئی فریزنگ نہیں - پریمیم گیمنگ تجربہ ہر کسی کے لیے قابل رسائی، ڈیوائس کی تفصیلات سے قطع نظر۔',
    'content.feature8.title': '8: اردو اور انگریزی میں 24/7 سپورٹ',
    'content.feature8.text': '24/7 لائیو چیٹ (2-5 منٹ کا جواب)، WhatsApp سپورٹ، ای میل (support@3patiblueapp.com.pk)، اور جامع FAQ سیکشن کے ذریعے اپنی پسندیدہ زبان میں فوری مدد حاصل کریں۔ ہماری تربیت یافتہ سپورٹ ٹیم نکاسی کے مسائل، ڈپازٹ کی پریشانیاں، گیم کے سوالات، اور تکنیکی مسائل کو تیزی سے حل کرتی ہے۔ اوسط حل کا وقت: فوری مسائل کے لیے 10 منٹ سے کم۔ کوئی بھی سوال چھوٹا نہیں - ہم یہاں ہیں کہ آپ کا گیمنگ تجربہ بے عیب ہو۔',
    'content.feature9.title': '9: صفر لاگت داخلہ اور پریکٹس موڈ',
    'content.feature9.text': 'صفر رجسٹریشن فیس کے ساتھ مکمل طور پر مفت ڈاؤن لوڈ کریں۔ صرف لاگ ان کرنے پر PKR 50-500 کی مالیت کے مفت چپس حاصل کریں۔ تمام گیمز کے لیے پریکٹس موڈ دستیاب ہے - اصلی رقم کے لیے کھیلنے سے پہلے خطرے سے پاک حکمت عملی سیکھیں۔ PKR 100 کی ڈپازٹ کے ساتھ شروع کریں، یا روزانہ بونسز استعمال کرتے ہوئے مکمل طور پر مفت کھیلیں۔ کوئی دباؤ نہیں، کوئی زبردستی ڈپازٹ نہیں۔ اپنی رفتار سے سیکھیں، تیار ہونے پر کھیلیں۔ شروعات کرنے والوں اور تجربہ کار کھلاڑیوں دونوں کے لیے بہترین۔',
    'content.feature10.title': '10: شفاف اور منصفانہ گیمنگ',
    'content.feature10.text': 'سرٹیفائیڈ Random Number Generator (RNG) یہ یقینی بناتا ہے کہ ہر گیم کا نتیجہ مکمل طور پر رینڈم اور غیر جانبدار ہے۔ شائع شدہ فیئر پلے پالیسیاں، شفاف شرائط و ضوابط، مرئی جیت کی شرح، اور ریئل ٹائم گیم ہسٹری ٹریکنگ۔ باقاعدہ تھرڈ پارٹی آڈٹس ہمارے سسٹمز کی تصدیق کرتے ہیں۔ کوئی دھوکہ دہی والے گیمز نہیں، کوئی چھپے ہوئے الگورتھم نہیں۔ 250,000+ تصدیق شدہ صارفین سے 4.7 سٹار ریٹنگ ہماری منصفانہ، ایماندار، اور شفاف گیمنگ کے عزم کو ثابت کرتی ہے۔ اعتماد جس پر آپ بھروسہ کر سکتے ہیں۔',
    'content.bonus1.title': '1: خصوصی 100% خوش آمدید بونس (PKR 100,000 تک)',
    'content.bonus1.text': 'تین پتی بلیو صنعت کا سب سے فیاض خوش آمدید بونس پیش کرتا ہے - آپ کی پہلی ڈپازٹ پر 100% میچ، PKR 100,000 تک۔ PKR 1,000 ڈپازٹ کریں، PKR 2,000 کے ساتھ کھیلیں۔ یہ فوری بونس آپ کی ابتدائی سرمایہ کو دوگنا کر دیتا ہے اور پہلے دن سے آپ کی جیت کی صلاحیت کو نمایاں طور پر بڑھا دیتا ہے۔',
    'content.bonus2.title': '2: ری چارج ری بیٹ پروگرام (ہر ڈپازٹ پر 5-30%)',
    'content.bonus2.text': 'ہر ڈپازٹ آپ کو فوری بونس دیتی ہے! تین پتی بلیو وفادار کھلاڑیوں کو ڈپازٹ کی رقم کی بنیاد پر 5% سے 30% تک ری بیٹس کے ساتھ انعام دیتا ہے۔ زیادہ ڈپازٹس = زیادہ ری بیٹس۔ یہ ایک بار کی پیشکش نہیں ہے - ہمیشہ کے لیے اپنی ہر ایک ڈپازٹ پر ری بیٹس حاصل کریں۔',
    'content.bonus3.title': '3: VIP روزانہ ری بیٹ پروگرام (VIP لیول کی بنیاد پر 1-10% کیش بیک)',
    'content.bonus3.text': 'VIP سیڑھی (20 سطحیں) چڑھیں اور PKR 3,000+ کی ڈپازٹس پر روزانہ کیش بیک حاصل کریں۔ اعلیٰ VIP سطحیں بڑے ری بیٹس کھولتی ہیں - VIP 19-20 کے لیے 10% تک۔ فعال کھلاڑی ماہانہ ہزاروں پیسیو ری بیٹس میں کما سکتے ہیں۔ روزانہ دعویٰ کریں، کسی بھی وقت نکالیں۔ آپ جتنا زیادہ کھیلیں گے، اتنا ہی زیادہ واپس کمائیں گے۔',
    'content.download.intro': 'آفیشل تین پتی بلیو APK کو 2 منٹ سے بھی کم وقت میں محفوظ طریقے سے ڈاؤن لوڈ کریں۔ ان تصدیق شدہ اقدامات پر عمل کریں:',
    'content.download.step1': 'آفیشل ویب سائٹ ملاحظہ کریں: اپنا براؤزر کھولیں اور 3patiblueapp.com.pk پر جائیں (جعلی سائٹس سے بچنے کے لیے اس آفیشل ذریعہ کو بک مارک کریں)۔',
    'content.download.step2': 'ڈاؤن لوڈ بٹن پر کلک کریں: ہوم پیج پر نمایاں "DOWNLOAD NOW" بٹن تلاش کریں اور اس پر ٹیپ کریں۔ محفوظ 49MB APK فائل فوری طور پر ڈاؤن لوڈ ہونا شروع ہو جائے گی۔',
    'content.download.step3': 'ڈاؤن لوڈ کا انتظار کریں: ڈاؤن لوڈ آپ کی انٹرنیٹ کی رفتار کے لحاظ سے 10-30 سیکنڈ میں مکمل ہو جاتی ہے۔ فائل خودکار طور پر آپ کے Downloads فولڈر میں محفوظ ہو جاتی ہے۔',
    'content.download.step4': 'فائل کی تصدیق کریں: "3Patti_Blue_v1.225.apk" (49MB) کے لیے اپنے Downloads فولڈر کو چیک کریں۔ مکمل ڈاؤن لوڈ کو یقینی بنانے کے لیے فائل کے سائز کی تصدیق کریں۔',
    'content.download.step5': 'انسٹال کرنے کے لیے تیار: اب آپ انسٹال کرنے کے لیے تیار ہیں۔ نیچے دیے گئے انسٹالیشن کے اقدامات پر عمل کریں۔',
    'content.install.title': 'تین پتی بلیو APK انسٹالیشن گائیڈ (Android 5.0+)',
    'content.install.intro': 'تین پتی بلیو کو صرف 60 سیکنڈ میں محفوظ طریقے سے انسٹال کریں ان تصدیق شدہ اقدامات کے ساتھ:',
    'content.install.step1': 'نامعلوم ذرائع فعال کریں: Settings → Security میں جائیں → "Install from Unknown Sources" یا "Install Unknown Apps" کو فعال کریں۔ یہ Google Play کے علاوہ دیگر ذرائع سے APK انسٹالیشن کی اجازت دیتا ہے۔ (یہ تین پتی بلیو جیسی آفیشل ایپس کے لیے محفوظ ہے)',
    'content.install.step2': 'APK فائل تلاش کریں: File Manager کھولیں اور Downloads فولڈر میں جائیں۔ "3Patti_Blue_v1.225.apk" فائل تلاش کریں۔',
    'content.install.step3': 'انسٹال کرنے کے لیے ٹیپ کریں: APK فائل پر ٹیپ کریں۔ اینڈرائیڈ انسٹالیشن کی تصدیق کے لیے اشارہ کرے گا۔ "Install" بٹن پر ٹیپ کریں۔',
    'content.install.step4': 'انسٹالیشن کا انتظار کریں: انسٹالیشن میں 30-60 سیکنڈ لگتے ہیں۔ عمل میں خلل نہ ڈالیں۔',
    'content.install.step5': 'ایپ کھولیں: ایک بار انسٹالیشن مکمل ہو جائے، "Open" پر ٹیپ کریں یا اپنی ہوم اسکرین/ایپ ڈراور پر تین پتی بلیو آئیکن تلاش کریں۔',
    'content.install.step6': 'اکاؤنٹ بنائیں: ایپ لانچ کریں، اپنے موبائل نمبر سے رجسٹر کریں، OTP کے ذریعے تصدیق کریں، اور کھیلنا شروع کریں!',
    'content.install.step7': 'خوش آمدید بونس حاصل کریں: رجسٹریشن کے بعد، فوری طور پر اپنے مفت چپس اور 100% خوش آمدید بونس کا دعویٰ کریں۔',
    'content.requirements.title': 'سسٹم کی ضروریات',
    'content.requirements.tableSystem': 'سسٹم',
    'content.requirements.tableMinimum': 'کم از کم',
    'content.requirements.tableRecommended': 'تجویز کردہ',
    'content.requirements.os': 'آپریٹنگ سسٹم',
    'content.requirements.osMin': 'اینڈرائیڈ 4.1',
    'content.requirements.osRec': 'اینڈرائیڈ 8.0 یا اس سے اوپر',
    'content.requirements.ram': 'ریم',
    'content.requirements.ramMin': '2GB یا زیادہ',
    'content.requirements.ramRec': '4GB یا زیادہ',
    'content.requirements.storage': 'اسٹوریج جگہ',
    'content.requirements.storageMin': 'کم از کم 500 MB خالی',
    'content.requirements.storageRec': '1GB خالی جگہ',
    'content.requirements.processor': 'پروسیسر',
    'content.requirements.processorMin': 'کواڈ کور 1.5 GHz',
    'content.requirements.processorRec': 'آکٹا کور 2.0 GHz',
    'content.requirements.internet': 'انٹرنیٹ',
    'content.requirements.internetMin': 'مستحکم 3G یا WiFi',
    'content.requirements.internetRec': 'تیز اور مستحکم 4G یا WiFi',
    'content.registrationGuide.title': 'تین پتی بلیو اکاؤنٹ رجسٹریشن اور لاگ ان گائیڈ',
    'content.registration.title1': '1: فوری رجسٹریشن کا عمل (2 منٹ سے کم)',
    'content.registration.intro': 'صرف 2 منٹ میں اپنا تصدیق شدہ تین پتی بلیو اکاؤنٹ بنائیں اور فوری طور پر کمانا شروع کریں:',
    'content.registration.step1': 'ایپ لانچ کریں: انسٹالیشن کے بعد تین پتی بلیو ایپ کھولیں۔',
    'content.registration.step2': 'رجسٹر/سائن اپ پر ٹیپ کریں: ویلکم اسکرین پر "Register" یا "Sign Up" بٹن پر کلک کریں (عام طور پر نمایاں اور رنگین)۔',
    'content.registration.step3': 'موبائل نمبر درج کریں: اپنا پاکستانی موبائل نمبر (جاز، ٹیلی نار، زونگ، یوفون) درج کریں۔ یہ آپ کا یوزرنیم اور نکاسی کی تصدیق کا طریقہ ہوگا۔',
    'content.registration.step4': 'مضبوط پاس ورڈ بنائیں: محفوظ پاس ورڈ سیٹ کریں (کم از کم 8 حروف، حروف، نمبرز اور علامات کا مرکب تجویز ہے)۔',
    'content.registration.step5': 'OTP سے تصدیق کریں: آپ کو SMS کے ذریعے 6 ہندسوں کی تصدیقی کوڈ موصول ہوگی۔ اپنے نمبر کی تصدیق کے لیے 5 منٹ کے اندر یہ کوڈ درج کریں۔',
    'content.registration.step6': 'پروفائل مکمل کریں (اختیاری): اکاؤنٹ بحالی کے لیے ای میل شامل کریں، یوزرنیم سیٹ کریں، اور KYC مکمل کریں (تیز نکاسی کے لیے تجویز شدہ)۔',
    'content.registration.step7': 'اکاؤنٹ بن گیا: مبارک ہو! آپ کا تصدیق شدہ اکاؤنٹ تیار ہے۔ فوری طور پر اپنا ویلکم بونس حاصل کریں۔',
    'content.login.title': '2: محفوظ لاگ ان کا عمل',
    'content.login.intro': 'اپنے تین پتی بلیو اکاؤنٹ تک کسی بھی وقت، کہیں بھی محفوظ طریقے سے رسائی حاصل کریں:',
    'content.login.step1': 'تین پتی بلیو کھولیں: اپنی ہوم اسکرین سے ایپ لانچ کریں۔',
    'content.login.step2': 'لاگ ان پر کلک کریں: ویلکم اسکرین پر "Login" بٹن پر ٹیپ کریں۔',
    'content.login.step3': 'کریڈنشلز درج کریں: اپنا رجسٹرڈ موبائل نمبر یا ای میل اور پاس ورڈ درج کریں۔',
    'content.login.step4': 'تفصیلات کی تصدیق کریں: لاگ ان کی غلطیوں سے بچنے کے لیے اپنے کریڈنشلز دوبارہ چیک کریں۔',
    'content.login.step5': 'سائن ان پر ٹیپ کریں: اپنے اکاؤنٹ تک رسائی کے لیے "Sign In" یا "Login" بٹن پر کلک کریں۔',
    'content.login.step6': 'ٹو فیکٹر تصدیق (اگر فعال ہو): اضافی سیکیورٹی کے لیے اپنے موبائل پر بھیجا گیا OTP درج کریں۔',
    'content.login.step7': 'پاس ورڈ بھول گئے؟ SMS OTP کے ذریعے ری سیٹ کرنے کے لیے "Forgot Password" پر ٹیپ کریں۔ نیا پاس ورڈ بنانے کے لیے آپ کو کوڈ موصول ہوگا۔',
    'content.login.step8': 'کھیلنا شروع کریں: لاگ ان ہونے کے بعد، آپ کا والٹ بیلنس، گیم ہسٹری اور بونسز فوری طور پر قابل رسائی ہیں۔ اپنا گیم منتخب کریں اور کمانا شروع کریں!',
    'content.payment1.title': '1: جاز کیش - پاکستان کا سب سے قابل اعتماد ڈیجیٹل والٹ',
    'content.payment1.text': 'جاز کیش 20+ ملین صارفین کے ساتھ پاکستان کا معروف موبائل مالیاتی خدمات کا پلیٹ فارم ہے۔ تین پتی بلیو کی بغیر کسی رکاوٹ کے جاز کیش انٹیگریشن فعال کرتی ہے: فوری ڈپازٹس (5 سیکنڈ میں فنڈز والٹ میں ظاہر ہوتے ہیں)، تیز نکاسی (5-30 منٹ میں کارروائی کی جاتی ہے، براہ راست آپ کے جاز کیش اکاؤنٹ میں)، صفر چھپی ہوئی فیس (جو آپ نکالتے ہیں وہی آپ کو ملتا ہے)، محفوظ لین دین (جاز کیش کی بینکنگ گریڈ سیکیورٹی سے انکرپٹ اور تصدیق شدہ)، کم سے کم ڈپازٹ: PKR 100، کم سے کم نکاسی: PKR 500۔ شروع سے 500,000 سے زیادہ کامیاب لین دین کی کارروائی کی گئی ہے۔ جاز کیش ان صارفین کے لیے مثالی ہے جو تین پتی بلیو پر سب سے تیز، سب سے قابل اعتماد ادائیگی کا تجربہ چاہتے ہیں۔',
    'content.payment2.title': '2: ایزی پیسہ - محفوظ اور آسان لین دین',
    'content.payment2.text': 'ایزی پیسہ 10+ ملین فعال صارفین کے ساتھ پاکستان کی سب سے بڑی موبائل والٹ سروس ہے۔ تین پتی بلیو پر ایزی پیسہ استعمال کرنے کے فوائد: فوری ڈپازٹس (فوری طور پر گیمنگ والٹ میں رقم شامل کی جاتی ہے)، فوری نکاسی (5-30 منٹ میں آپ کے ایزی پیسہ اکاؤنٹ میں مکمل ہو جاتی ہے)، وسیع پیمانے پر قابل رسائی (پاکستان بھر میں 180,000+ ریٹیل دکانوں پر دستیاب)، بینک لیول سیکیورٹی (SSL انکرپٹ شدہ لین دین)، کوئی نکاسی چارجز نہیں، تمام بینکوں کے ساتھ کام کرتا ہے (بغیر کسی رکاوٹ کے منتقلی کے لیے کسی بھی بینک اکاؤنٹ کو ایزی پیسہ سے لنک کریں)۔ ان صارفین کے لیے بہترین جو Telenor کے قابل اعتماد ماحول کو ترجیح دیتے ہیں۔ تین پتی بلیو پر جاز کیش اور ایزی پیسہ دونوں لین دین تصدیق شدہ، محفوظ، اور 24/7 بغیر تاخیر کے کارروائی کیے جاتے ہیں۔',
    'content.deposit.title': 'تین پتی بلیو میں رقم کیسے جمع کریں (فوری عمل)',
    'content.deposit.intro': '60 سیکنڈ سے کم میں اپنے تین پتی بلیو والٹ میں فنڈز شامل کریں اور فوری طور پر کھیلنا شروع کریں:',
    'content.deposit.step1': 'لاگ ان کریں: تین پتی بلیو ایپ کھولیں اور اپنے تصدیق شدہ اکاؤنٹ میں لاگ ان کریں۔',
    'content.deposit.step2': 'والٹ پر جائیں: ہوم اسکرین پر "Wallet" آئیکن پر ٹیپ کریں (عام طور پر اوپر دائیں کونے میں والٹ/روپے کا نشان)۔',
    'content.deposit.step3': 'ڈپازٹ منتخب کریں: والٹ سیکشن میں "Deposit" یا "Add Money" بٹن پر کلک کریں۔',
    'content.deposit.step4': 'ادائیگی کا طریقہ منتخب کریں: جاز کیش یا ایزی پیسہ منتخب کریں (دونوں فوری پروسیسنگ پیش کرتے ہیں)۔',
    'content.deposit.step5': 'رقم درج کریں: ڈپازٹ کی رقم درج کریں (کم از کم PKR 100)۔ یاد رکھیں: پہلی ڈپازٹ پر 100% ویلکم بونس ملتا ہے!',
    'content.deposit.step6': 'ادائیگی کی تفصیلات درج کریں: اپنا جاز کیش/ایزی پیسہ اکاؤنٹ نمبر/موبائل نمبر فراہم کریں۔',
    'content.deposit.step7': 'لین دین کی تصدیق کریں: تفصیلات احتیاط سے جائیں، پھر "Confirm" یا "Deposit Now" پر ٹیپ کریں۔',
    'content.deposit.step8': 'ادائیگی مکمل کریں: آپ کو جاز کیش/ایزی پیسہ پر ری ڈائریکٹ کیا جائے گا۔ PIN/OTP سے ادائیگی کی توثیق کریں۔',
    'content.deposit.step9': 'فوری کریڈٹ: 5 سیکنڈ کے اندر، جمع شدہ رقم + بونس (اگر لاگو ہو) آپ کے تین پتی بلیو والٹ میں ظاہر ہو جاتی ہے۔ کھیلنا شروع کریں!',
    'content.withdraw.title': 'تین پتی بلیو سے رقم کیسے نکالیں (5-30 منٹ)',
    'content.withdraw.intro': 'اپنی جیت کو تیزی سے اور محفوظ طریقے سے اپنے جاز کیش یا ایزی پیسہ اکاؤنٹ میں نکالیں:',
    'content.withdraw.step1': 'اکاؤنٹ میں لاگ ان کریں: تین پتی بلیو ایپ کھولیں اور اپنے کریڈنشلز سے لاگ ان کریں۔',
    'content.withdraw.step2': 'والٹ تک رسائی: بیلنس دیکھنے کے لیے ہوم اسکرین پر "Wallet" آئیکن پر ٹیپ کریں۔',
    'content.withdraw.step3': 'نکاسی منتخب کریں: والٹ سیکشن میں "Withdraw" یا "Cash Out" بٹن پر کلک کریں۔',
    'content.withdraw.step4': 'ادائیگی کا طریقہ منتخب کریں: جاز کیش یا ایزی پیسہ منتخب کریں (دونوں 5-30 منٹ میں پروسیس ہوتے ہیں)۔',
    'content.withdraw.step5': 'نکاسی کی رقم درج کریں: رقم درج کریں (کم از کم PKR 500، زیادہ سے زیادہ حد نہیں)۔ یقینی بنائیں کہ آپ کے پاس کافی بیلنس ہے۔',
    'content.withdraw.step6': 'اکاؤنٹ کی تفصیلات فراہم کریں: اپنا تصدیق شدہ جاز کیش/ایزی پیسہ موبائل نمبر یا اکاؤنٹ نمبر درج کریں۔',
    'content.withdraw.step7': 'OTP سے تصدیق کریں: سیکیورٹی کے لیے آپ کو رجسٹرڈ موبائل پر OTP موصول ہوگا۔ تصدیق کے لیے کوڈ درج کریں۔',
    'content.withdraw.step8': 'تفصیلات دوبارہ چیک کریں: غلطیوں سے بچنے کے لیے نکاسی کی رقم اور اکاؤنٹ نمبر احتیاط سے جائیں۔',
    'content.withdraw.step9': 'نکاسی کی تصدیق کریں: "Confirm" بٹن پر ٹیپ کریں۔ آپ کی درخواست فوری طور پر پروسیس ہو جاتی ہے۔',
    'content.withdraw.step10': 'رقم وصول کریں: 5-30 منٹ کے اندر رقم آپ کے جاز کیش/ایزی پیسہ اکاؤنٹ میں منتقل ہو جاتی ہے۔ آپ کو تین پتی بلیو اور اپنے ادائیگی فراہم کنندہ دونوں سے تصدیقی SMS موصول ہوگا۔',
    'content.proscons.bottomLine': 'نتیجہ: ذمہ دار کھلاڑیوں کے لیے تین پتی بلیو کے فوائد حدود سے نمایاں طور پر زیادہ ہیں۔ پلیٹ فارم ثابت شدہ ادائیگیوں کے ساتھ حقیقی کمائی کے مواقع فراہم کرتا ہے، لیکن جذباتی نظم و ضبط اور مالی ذمہ داری کی ضرورت ہے۔ 18+ بالغوں کے لیے مثالی جو تین پتی سے لطف اندوز ہوتے ہیں اور گیمنگ کے خطرات کو سمجھتے ہیں۔',
    'content.support.intro': 'تین پتی بلیو متعدد چینلز اور گارنٹی شدہ جوابی اوقات کے ساتھ صنعت کی معروف کسٹمر سپورٹ پیش کرتا ہے۔ اپنا ترجیحی طریقہ منتخب کریں:',
    'content.support.chat': 'جوابی وقت: 2-5 منٹ',
    'content.support.whatsapp': 'جوابی وقت: 5-15 منٹ',
    'content.support.email': 'جوابی وقت: 2-6 گھنٹے',
    'content.support.faq': 'سپورٹ سے رابطہ کرنے سے پہلے، ہمارے تفصیلی FAQ سیکشن (ان-ایپ) کو چیک کریں جو 50+ عام سوالات کا احاطہ کرتا ہے: کیسے رجسٹر کریں، ڈپازٹ کا عمل، نکاسی کے اقدامات، بونس کی شرائط، گیم کے قواعد، غلطیوں کا حل، ادائیگی کے طریقے، سیکیورٹی خصوصیات، VIP پروگرام کی تفصیلات، ریفرل سسٹم، اور بہت کچھ۔ زمرہ کے مطابق منظم سرچ فنکشن کے ساتھ۔ انتظار کے بغیر فوری جوابات۔ نئے سوالات کے ساتھ باقاعدگی سے اپ ڈیٹ کیا جاتا ہے۔ سیلف سروس مدد 24/7 دستیاب ہے۔ زیادہ تر صارفین براہ راست سپورٹ کی ضرورت سے پہلے FAQ میں حل تلاش کرتے ہیں۔',
    'content.support.urgent': 'فوری مسائل؟ نکاسی میں تاخیر، ادائیگی کی غلطیوں، یا اکاؤنٹ لاک آؤٹ کے لیے، فوری مدد کے لیے Live Chat استعمال کریں۔ اوسط حل کا وقت: فوری معاملات کے لیے 10 منٹ سے کم۔',
    'content.security.title': 'کیا تین پتی بلیو محفوظ ہے؟ مکمل سیکیورٹی تجزیہ 2026',
    'content.security.intro': 'جی ہاں، تین پتی بلیو مکمل طور پر محفوظ اور قابل اعتماد ہے۔ پلیٹ فارم نے 2024 میں اپنی شروعات سے بہترین سیکیورٹی ریکارڈ برقرار رکھا ہے، 10 لاکھ سے زیادہ صارفین کو متاثر کرنے والی صفر ڈیٹا خلاف ورزیوں کے ساتھ۔ یہ ہمارا جامع سیکیورٹی تجزیہ ہے:',
    'content.security.technical': 'تکنیکی سیکیورٹی اقدامات: تین پتی بلیو تمام ڈیٹا ٹرانسمیشن کے لیے ملٹری گریڈ 256-bit SSL انکرپشن (بینکوں کے ذریعے استعمال ہونے والا وہی معیار) کو نافذ کرتا ہے۔ ہر لین دین، لاگ ان، اور ذاتی تفصیل اینڈ ٹو اینڈ انکرپٹ ہے۔ پلیٹ فارم سرٹیفائیڈ سائبر سیکیورٹی فرموں کے ذریعے سہ ماہی تھرڈ پارٹی سیکیورٹی آڈٹس سے گزرتا ہے۔ تمام سرورز 24/7 نگرانی کے ساتھ محفوظ، ISO سرٹیفائیڈ ڈیٹا سینٹرز میں ہوسٹ کیے جاتے ہیں۔ ٹو فیکٹر تصدیق (2FA)، بایومیٹرک لاگ ان (فنگر پرنٹ/فیس ID)، اور ریئل ٹائم فراڈ ڈیٹیکشن AI صارف اکاؤنٹس کی حفاظت کرتے ہیں۔ ادائیگی کا ڈیٹا ٹوکنائزڈ ہے اور کبھی سرورز پر محفوظ نہیں کیا جاتا، بین الاقوامی PCI-DSS معیارات کی تعمیل کرتے ہوئے۔',
    'content.security.payment': 'ادائیگی کی سیکیورٹی: جاز کیش اور ایزی پیسہ کے ذریعے تمام ادائیگیاں تصدیق شدہ، لائسنس یافتہ گیٹ ویز کے ذریعے کارروائی کی جاتی ہیں۔ تین پتی بلیو کبھی بھی آپ کے بینک اکاؤنٹ تک براہ راست رسائی حاصل نہیں کرتا۔ نکاسی کی درخواستیں کارروائی سے پہلے خودکار فراڈ چیکس سے گزرتی ہیں۔ KYC تصدیق (ID کارڈ + سیلفی) منی لانڈرنگ کو روکتی ہے اور جائز صارفین کو یقینی بناتی ہے۔ 2024 سے PKR 10 بلین سے زیادہ کامیابی سے نکالے گئے 99.8% کامیابی کی شرح کے ساتھ اور کوئی غیر مجاز لین دین رپورٹ نہیں ہوئی۔',
    'content.security.fairplay': 'منصفانہ کھیل کی یقین دہانی: Gaming Laboratories International کے ذریعے ٹیسٹ شدہ سرٹیفائیڈ Random Number Generator (RNG) یہ یقینی بناتا ہے کہ ہر کارڈ ڈیل مکمل طور پر رینڈم اور غیر متوقع ہے۔ تمام گیم کے نتائج ریاضیاتی طور پر منصفانہ اور قابل آڈٹ ہیں۔ دھوکہ دہی مخالف نظام مشکوک کھلاڑیوں کا فوری طور پر پتہ لگاتے ہیں اور انہیں بین کرتے ہیں۔ شائع شدہ جیت کی شرحیں اور شفاف الگورتھم اعتماد پیدا کرتے ہیں۔',
    'content.security.googleplay': 'Google Play پر کیوں نہیں؟ Google Play Store عالمی سطح پر حقیقی رقم کی گیمنگ ایپس کو منع کرتا ہے (پالیسی تمام خطوں پر لاگو ہوتی ہے)۔ یہ اس لیے نہیں ہے کہ تین پتی بلیو غیر محفوظ ہے - یہ Google کی عام پالیسی ہے۔ دنیا بھر کے تمام جائز حقیقی رقم کے گیمنگ پلیٹ فارمز APK کے ذریعے تقسیم کرتے ہیں۔ تھرڈ پارٹی سائٹس پر گردش کرنے والے جعلی/میلویئر ورژنز سے بچنے کے لیے ہمیشہ آفیشل ویب سائٹ (3patiblueapp.com.pk) سے ڈاؤن لوڈ کریں۔',
    'content.security.responsibility': 'آپ کی ذمہ داری: جبکہ تین پتی بلیو زیادہ سے زیادہ سیکیورٹی فراہم کرتا ہے، آپ کو چاہیے: (1) صرف آفیشل ویب سائٹ سے ڈاؤن لوڈ کریں، (2) کبھی بھی پاس ورڈ/OTP کسی کے ساتھ شیئر نہ کریں، (3) 2FA اور بایومیٹرک لاگ ان فعال کریں، (4) منفرد پاس ورڈ استعمال کریں جو کہیں اور استعمال نہ ہو، (5) ایپ کو باقاعدگی سے تازہ ترین ورژن میں اپ ڈیٹ کریں، (6) فوری طور پر مشکوک سرگرمی کی اطلاع support@3patiblueapp.com.pk کو دیں۔ نتیجہ: تین پتی بلیو کا سیکیورٹی انفراسٹرکچر صنعتی معیارات سے بڑھ کر ہے۔ مناسب احتیاط کے ساتھ، آپ کی رقم اور ڈیٹا بہت سے مین سٹریم ایپس سے زیادہ محفوظ ہیں۔',
    
    'content.getStarted.text': 'اپنے تین پتی بلیو کے سفر کی شروعات آسان ہے اور 5 منٹ سے بھی کم وقت لگتا ہے۔ آفیشل APK ڈاؤن لوڈ کریں، اسے اپنے اینڈرائیڈ ڈیوائس پر انسٹال کریں، اپنا اکاؤنٹ بنائیں، اور چند منٹوں میں کھیلنا شروع کریں!',
    
    'content.features.title': '10 بہترین خصوصیات جو تین پتی بلیو کو 2026 میں منفرد بناتی ہیں',
    'content.games.title': 'تین پتی بلیو پر کھیلنے کے لیے 30+ بہترین گیمز',
    'content.bonuses.title': 'بونس اور انعامات پروگرام 2026',
    'content.payment.title': 'ادائیگی کے طریقے: فوری جمع اور نکاسی',
    'content.faq.title': 'اکثر پوچھے گئے سوالات (2026)',
    
    // Table translations (Urdu)
    'table.3pattiBlue': 'تین پتی بلیو',
    'table.freeDownload': 'مفت (PKR 0)',
    
    // Expert Tips (اردو)
    'tips.title': 'تین پتی بلیو میں جیتنے کے 10 ماہرانہ اشارے',
    'tips.tip1': 'چھوٹا شروع کریں، آہستہ آہستہ بڑھائیں: گیم کی میکینکس کو سمجھنے اور اعتماد پیدا کرنے کے لیے کم سے کم بیٹس (PKR 10-50) سے شروع کریں۔ داؤ بڑھانے سے پہلے 20-30 گیمز میں اپنی جیت کی شرح کو ٹریک کریں۔',
    'tips.tip2': 'بونس کا زیادہ سے زیادہ استعمال: تین پتی بلیو روزانہ لاگ ان (PKR 500/دن)، خوش آمدید بونس (پہلی ڈپازٹ پر 100%)، ریفرل کمیشن (10-20%)، اور VIP ریبیٹس (10% تک) کے ذریعے PKR 10,000+ ماہانہ بونس پیش کرتا ہے۔',
    'tips.tip3': 'پہلے ہائی RTP گیمز میں مہارت حاصل کریں: سب سے زیادہ Return to Player شرح والے گیمز پر توجہ دیں: Teen Patti Classic (95-98% RTP)، Dragon vs Tiger (96% RTP)، اور Rummy (94-96% RTP)۔',
    'tips.tip4': 'ریفرلز کے ذریعے غیر فعال آمدنی بنائیں: WhatsApp، Facebook، TikTok، اور Instagram پر اپنا ریفرل لنک شیئر کریں۔ ٹاپ ریفررز بغیر کھیلے ماہانہ PKR 50,000-200,000 کماتے ہیں۔',
    'tips.tip5': 'روزانہ لاگ ان کی لکیر برقرار رکھیں: مسلسل 30 دن کے لیے روزانہ لاگ ان کرنے سے PKR 1,500-3,000 مالیت کے خصوصی بونس کھلتے ہیں۔',
    'tips.tip6': 'منافع لینے کی حکمت عملی لاگو کریں: جب آپ اپنا بیلنس ڈبل کریں تو منافع کا 50% نکال لیں۔ گیمنگ والٹ میں 100% جیت کبھی نہ رکھیں۔',
    'tips.tip7': 'پریکٹس موڈ کو حکمت عملی سے استعمال کریں: حقیقی رقم کا خطرہ لینے سے پہلے ہر گیم میں مہارت حاصل کرنے کے لیے پریکٹس موڈ میں 5-10 گھنٹے گزاریں۔',
    'tips.tip8': 'جذباتی نظم و ضبط میں مہارت حاصل کریں: impulsively بیٹس بڑھا کر کبھی نقصانات کا پیچھا نہ کریں۔ سخت روزانہ نقصان کی حد مقرر کریں۔',
    'tips.tip9': 'مخالف کے پیٹرنز کا مطالعہ کریں: تجربہ کار کھلاڑیوں کو دیکھیں کہ وہ کیسے بیٹ لگاتے ہیں - ان کا وقت، داؤ کے سائز، اور فیصلے کے پیٹرنز۔',
    'tips.tip10': 'سیکیورٹی کی بہترین مشقیں: صرف آفیشل ویب سائٹ (3patiblueapp.com.pk) سے ڈاؤن لوڈ کریں۔ ٹو فیکٹر تصدیق فعال کریں۔',
    
    // What's New (اردو)
    'whatsnew.title': 'تین پتی بلیو v1.225 میں نیا کیا ہے (فروری 2026 اپ ڈیٹ)',
    'whatsnew.item1': 'بہتر گرافکس انجن: Unity 2026.1 میں اپ گریڈ 4K ٹیکسچر سپورٹ، 60 FPS گیم پلے، اور حقیقت پسندانہ کارڈ اینیمیشنز کے ساتھ۔',
    'whatsnew.item2': '50% تیز لوڈنگ ٹائمز: بہتر کوڈ بیس ایپ لانچ ٹائم کو 8 سیکنڈ سے 4 سیکنڈ تک کم کرتا ہے۔',
    'whatsnew.item3': 'نیا ڈیزائن UI/UX: 50,000+ کھلاڑیوں کی رائے پر مبنی مکمل طور پر نیا انٹرفیس۔',
    'whatsnew.item4': '5 نئے گیم موڈز: تین پتی حکم، 29 کارڈ گیم، بیسٹ آف فور، سپیڈ رمی، اور کرکٹ فینٹسی متعارف۔',
    'whatsnew.item5': 'فوری ادائیگی کی کارروائی: نکاسی کا وقت 30 منٹ سے 5-15 منٹ تک کم۔',
    'whatsnew.item6': 'ملٹری گریڈ سیکیورٹی: بایومیٹرک تصدیق اور ریئل ٹائم فراڈ ڈیٹیکشن AI۔',
    'whatsnew.item7': 'بہتر بونس سسٹم: خوش آمدید بونس 50% سے 100% تک بڑھا (PKR 100,000 تک)۔',
    'whatsnew.item8': 'بگ فکسز اور استحکام: 37 رپورٹ شدہ بگز حل، 92% تک کریش ریٹ کم۔',
    'whatsnew.item9': 'شاندار آڈیو تجربہ: اصلی کیسینو ساؤنڈ ایفیکٹس اور پیشہ ورانہ وائس کمنٹری۔',
    'whatsnew.item10': '20 سطحی VIP پروگرام: 10 سے 20 VIP لیولز تک توسیع خصوصی فوائد کے ساتھ۔',
    
    // Pros & Cons (اردو)
    'proscons.title': 'تین پتی بلیو ایماندار جائزہ: فوائد اور حدود (غیر جانبدارانہ تجزیہ)',
    'proscons.pros.title': 'فوائد',
    'proscons.cons.title': 'حدود',
    'proscons.pro1': 'اصلی تین پتی تجربہ: پاکستان میں روایتی قواعد کے ساتھ بہترین تین پتی گیم پلے',
    'proscons.pro2': 'حقیقی کمائی کی صلاحیت: ثابت شدہ ٹریک ریکارڈ - 1M+ صارفین، PKR 10B+ 2024 سے نکالے گئے',
    'proscons.pro3': 'بجلی کی تیز ادائیگیاں: 5-30 منٹ نکاسی (صنعت میں تیز ترین)',
    'proscons.pro4': 'مقامی ادائیگی انٹیگریشن: بغیر کسی رکاوٹ جاز کیش اور ایزی پیسہ سپورٹ',
    'proscons.pro5': 'صنعت کے معروف بونس: 100% خوش آمدید بونس + روزانہ انعامات + VIP ریبیٹس',
    'proscons.pro6': 'بینک گریڈ سیکیورٹی: 256-bit SSL، KYC تصدیق، صفر خلاف ورزیاں',
    'proscons.pro7': 'ہلکی ایپ: صرف 49MB، بجٹ فونز پر کام کرتی ہے (2GB RAM)',
    'proscons.pro8': '24/7 سپورٹ: اردو + انگریزی، لائیو چیٹ، WhatsApp، ای میل',
    'proscons.pro9': '30+ گیمز کی تنوع: تین پتی، رمی، ڈریگن ٹائیگر، پوکر، سلاٹس',
    'proscons.pro10': 'شفاف آپریشنز: 250K+ تصدیق شدہ صارفین سے 4.7★ ریٹنگ',
    'proscons.pro11': 'ریفرل آمدنی: غیر فعال طور پر 10-20% زندگی بھر کمیشن کمائیں',
    'proscons.pro12': 'پریکٹس موڈ: حقیقی رقم کھیلنے سے پہلے خطرے سے پاک سیکھیں',
    'proscons.con1': 'مالی خطرہ: حقیقی رقم کی گیمنگ میں نقصان کا خطرہ ہے (ذمہ داری سے کھیلیں)',
    'proscons.con2': 'نکاسی کی کم سے کم حد: PKR 500 کم سے کم (صنعتی معیار)',
    'proscons.con3': 'نشہ آور صلاحیت: دلکش گیم پلے خود نظم و ضبط کی ضرورت ہے',
    'proscons.con4': 'Google Play پر نہیں: براہ راست APK ڈاؤن لوڈ کرنا ضروری ہے',
    'proscons.con5': 'انٹرنیٹ ضروری: تمام گیمز کو مستحکم انٹرنیٹ کنکشن کی ضرورت ہے',
    'proscons.con6': 'عمر کی پابندی: صرف 18+ (سختی سے نافذ)',
    'proscons.con7': 'سیکھنے کی مشکل: کچھ گیمز کو حکمت عملی اور مشق کی ضرورت ہے',
    'proscons.con8': 'علاقائی ضوابط: کھلاڑی مقامی گیمنگ قوانین کی جانچ کے ذمہ دار ہیں',
    'proscons.con9': 'ویجرنگ کی ضروریات: بونس میں نکاسی سے پہلے ویجرنگ کی ضروریات ہیں',
    
    // Final Verdict (اردو)
    'verdict.title': 'حتمی فیصلہ: تین پتی بلیو پاکستان کا #1 تین پتی پلیٹ فارم کیوں ہے',
    'verdict.para1': 'جامع تجزیہ کے بعد، تین پتی بلیو 2026 میں پاکستان کے بہترین تین پتی گیمنگ پلیٹ فارم کے طور پر نمایاں ہے۔ 10 لاکھ سے زیادہ فعال کھلاڑیوں، 250,000+ تصدیق شدہ صارفین سے 4.7 اسٹار ریٹنگ، اور 2024 سے PKR 10 بلین+ کامیاب نکاسی کے ساتھ، پلیٹ فارم نے اپنی قابل اعتمادیت ثابت کی ہے۔',
    'verdict.para2': 'جو چیز واقعی تین پتی بلیو کو الگ کرتی ہے وہ ہے پاکستانی کھلاڑیوں کے لیے اس کی وابستگی - بغیر کسی رکاوٹ جاز کیش اور ایزی پیسہ انٹیگریشن، اردو اور انگریزی میں 24/7 سپورٹ، ہلکی 49MB ایپ جو بجٹ فونز پر کام کرتی ہے، اور مقامی گیمنگ کلچر کی حقیقی سمجھ۔',
    'verdict.para3': 'اپنے سفر کی شروعات کے لیے تیار ہیں؟ آج ہی آفیشل ویب سائٹ (3patiblueapp.com.pk) سے تین پتی بلیو APK ڈاؤن لوڈ کریں، اپنے PKR 100 خوش آمدید بونس کا دعویٰ کریں، اور پاکستان کے سب سے قابل اعتماد تین پتی بلیٹ فارم کا تجربہ کریں۔',
    
    // Customer Support Details (اردو)
    'support.livechat.title': '💬 لائیو چیٹ (تجویز کردہ)',
    'support.livechat.details': 'جوابی وقت: 2-5 منٹ۔ تین پتی بلیو ایپ میں 24/7 لائیو چیٹ تک رسائی (مینو میں سپورٹ آئیکن پر ٹیپ کریں)۔ ہمارے تربیت یافتہ ایجنٹ اردو اور انگریزی میں مدد کرتے ہیں۔ بہترین: نکاسی کے مسائل، ڈپازٹ کے مسائل، گیم سوالات، تکنیکی بگز، بونس سوالات، اکاؤنٹ کی تصدیق۔',
    'support.whatsapp.title': '📱 WhatsApp سپورٹ',
    'support.whatsapp.details': 'جوابی وقت: 5-15 منٹ۔ ہمارے آفیشل WhatsApp نمبر پر پیغام بھیجیں (ایپ کے Contact سیکشن میں تلاش کریں)۔ WhatsApp پسند کرنے والے صارفین کے لیے آسان۔ سپورٹ: ٹیکسٹ پیغامات، وائس نوٹس (اردو/انگریزی)، اسکرین شاٹ شیئرنگ، پیچیدہ مسائل کے لیے ویڈیو کالز۔',
    'support.email.title': '📧 ای میل سپورٹ',
    'support.email.details': 'جوابی وقت: 2-6 گھنٹے۔ ای میل: support@3patiblueapp.com.pk۔ بہترین: غیر فوری سوالات، تفصیلی شکایات، اکاؤنٹ کے مسائل، فیچر کی درخواستیں، پارٹنرشپ کی استفسارات۔',
    'support.faqdb.title': '📚 جامع FAQ ڈیٹا بیس',
    
    // FAQ Questions & Answers (اردو)
    'faq.q1': 'تین پتی بلیو کیا ہے اور یہ کیسے کام کرتا ہے؟',
    'faq.a1': 'تین پتی بلیو پاکستان کا سب سے قابل اعتماد تین پتی گیمنگ پلیٹ فارم ہے جو 2024 میں شروع ہوا، اب 10 لاکھ+ فعال کھلاڑیوں کی خدمت کر رہا ہے۔ یہ اصلی تین پتی گیم پلے پیش کرتا ہے جہاں آپ حقیقی کھلاڑیوں کے ساتھ مقابلہ کرتے ہیں اور حقیقی رقم جیتتے ہیں۔',
    'faq.q2': 'تین پتی بلیو APK کو محفوظ طریقے سے کیسے ڈاؤن لوڈ کریں؟',
    'faq.a2': 'تین پتی بلیو APK کو محفوظ طریقے سے ڈاؤن لوڈ کرنے کے لیے: (1) آفیشل ویب سائٹ 3patiblueapp.com.pk پر جائیں، (2) "DOWNLOAD NOW" بٹن پر کلک کریں، (3) محفوظ 49MB APK فائل ڈاؤن لوڈ ہو جائے گی، (4) Settings → Security → "Install from Unknown Sources" فعال کریں، (5) Downloads فولڈر کھولیں اور APK فائل پر ٹیپ کریں، (6) "Install" پر ٹیپ کریں اور 60 سیکنڈ انتظار کریں، (7) ایپ کھولیں، اپنے موبائل نمبر سے رجسٹر کریں، اور کھیلنا شروع کریں!',
    'faq.q3': 'تین پتی بلیو دوسری تین پتی ایپس سے بہتر کیوں ہے؟',
    'faq.a3': 'تین پتی بلیو 5 اہم شعبوں میں بہتر ہے: (1) تیز ترین ادائیگیاں: 5-30 منٹ نکاسی، (2) بہترین بونس: 100% خوش آمدید بونس + 10% VIP کیش بیک، (3) اصلی گیم پلے: سرٹیفائیڈ RNG اور روایتی تین پتی قواعد، (4) اعلیٰ سیکیورٹی: بینک گریڈ انکرپشن، 2024 سے صفر خلاف ورزیاں، (5) مقامی بہترین: JazzCash/EasyPaisa انٹیگریشن، اردو سپورٹ۔',
    'faq.q4': 'کیا تین پتی بلیو محفوظ، قانونی اور قابل اعتماد ہے؟',
    'faq.a4': 'جی ہاں، تین پتی بلیو مکمل طور پر محفوظ اور قابل اعتماد ہے۔ سیکیورٹی: 256-bit SSL انکرپشن، KYC تصدیق، 2FA، اور بایومیٹرک لاگ ان استعمال کرتا ہے۔ 2+ سالوں میں صفر سیکیورٹی خلاف ورزیاں۔ قابل اعتمادیت: 10 لاکھ+ صارفین، 250K+ تصدیق شدہ جائزوں سے 4.7★ ریٹنگ، PKR 10B+ کامیابی سے نکالے گئے۔',
    'faq.q5': 'کیا صارفین کھیلتے وقت رقم ہار سکتے ہیں؟',
    'faq.a5': 'جی ہاں، یہ ایپ حقیقی رقم سے متعلق ہے، لہذا اگر آپ احتیاط سے نہیں کھیلتے تو آپ کچھ رقم ہار سکتے ہیں۔ لہذا، ہمیشہ سمجھداری سے کھیلیں اور کھیلتے وقت حد مقرر کریں۔',
    'faq.q6': 'کیا تین پتی بلیو کی زبان تبدیل کرنا ممکن ہے؟',
    'faq.a6': 'جی ہاں، یہ ممکن ہے کیونکہ یہ ایپ متعدد زبانوں (انگریزی اور اردو) کو سپورٹ کرتی ہے، لہذا آپ آسانی سے سیٹنگز مینو یا زبان ٹوگل بٹن سے زبان تبدیل کر سکتے ہیں۔',
    'faq.q7': 'ریفرل انعامات کیسے کام کرتے ہیں؟',
    'faq.a7': 'جب آپ اپنا ریفرل لنک دوسروں کے ساتھ شیئر کرتے ہیں، یا جب کوئی آپ کے لنک کے ذریعے اس ایپ میں شامل ہوتا ہے، تو آپ کو ان کی ڈپازٹس پر زندگی بھر 10-20% کمیشن مل سکتا ہے۔',
    'faq.q8': 'کیا تین پتی بلیو iPhone (iOS) پر دستیاب ہے؟',
    'faq.a8': 'تین پتی بلیو فی الوقت Android ڈیوائسز (Android 5.0+) کے لیے دستیاب ہے۔ آپ مستقبل میں iOS کی دستیابی کے بارے میں اپ ڈیٹس کے لیے آفیشل ویب سائٹ 3patiblueapp.com.pk چیک کر سکتے ہیں۔',
  },
};
