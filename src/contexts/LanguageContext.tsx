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
    'hero.subtitle': "Pakistan's Most Trusted Teen Patti",
    'hero.subtitle2': 'Teen Patti Gaming Platform 2026',
    'hero.description': "3 Patti Blue is Pakistan's #1 authentic Teen Patti gaming platform, trusted by over 1 million verified players since 2024. Experience genuine Teen Patti gameplay with advanced security, fair play algorithms, and instant withdrawals via JazzCash & EasyPaisa. Download the official 3 Patti Blue APK now and get PKR 100 welcome bonus. Play 30+ exciting card games including Teen Patti, Rummy, and Dragon Tiger - all with real money rewards and same-day payouts.",
    'hero.descriptionLink': '3 Patti Blue',
    'hero.descriptionRest': " is an exciting online card game where you can enjoy a wide collection of casino games with its attractive design, fun background music, and engaging look. Click on following download button to get this wonderful app.",
    'hero.link': '3 Patti Blue',
    
    // Stats
    'stats.players': 'Downloads',
    'stats.rating': 'Ratings',
    'stats.secure': 'App Size',
    
    // Buttons
    'btn.downloadNow': 'DOWNLOAD NOW',
    'btn.downloadApp': 'Download 3Patti Blue',
    'btn.download3pattiFull': 'DOWNLOAD 3PATTI BLUE NOW',
    
    // Sections
    'section.downloadInfo': '3Patti Blue APK Download Information',
    'section.overview': 'Overview',
    'section.understanding': 'What is 3Patti Blue Game?',
    'section.whyFastest': 'Why 3Patti Blue Game so Popular?',
    'section.getStarted': 'How Can We Start with 3Patti Blue?',
    'section.screenshots': '3Patti Blue App Screenshots - Real Gameplay Experience',
    'section.features': 'Top Features of 3Patti Blue',
    'section.games': 'Best Games to Play on 3Patti Blue',
    'section.bonuses': 'Benefits for New Players by Joining 3Patti Blue',
    'section.download': 'Download 3Patti Blue APK Latest Version For Android',
    'section.registration': 'How to Register & Login on 3Patti Blue?',
    'section.login': '',
    'section.payment': 'Ways to Deposit & Withdraw Money in 3Patti Blue',
    'section.proscons': 'Pros & Cons of using 3Patti Blue',
    'section.support': 'How Can We Contact the 3Patti Blue?',
    'section.faq': 'Frequently Asked Questions',
    
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
    'value.developer': '3Patti Blue dev',
    'value.category': 'Cards, Game',
    'value.size': '49MB',
    'value.version': 'V1.204(1)',
    'value.os': 'Android 5.0+',
    'value.updated': '5th January 2026',
    'value.downloads': '600k+',
    'value.rating': '300000+',
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
    'content.overview.text': 'This app is divided into various sections, including card games, slots, poker, and many others, making it easy to find games that you want to play. 3Patti Blue is designed with modern graphics, smooth gameplay, and an easy interface that makes this platform more suitable for both beginners and experienced players. This app also offers you great and interesting services, allowing you to earn significant money even by investing a small amount.',
    'content.overview.text2': 'You can also win real cash rewards or bonuses for free. So, download the game, and start playing your favorite games to earn real cash for free.',
    
    'content.understanding.text': '3Patti Blue Game is an online card game that is based on the classic Teen Patti card game. You can play different games to earn money. It is a safe and easy platform where you can play card games and make good money in a short time. It has become a great opportunity, especially for those people who want to earn money by playing different and interesting games. This game became very popular, and people prefer it because of its beautiful design, simple settings, classic themes, and easy options.',
    'content.understanding.text2': 'You can withdraw your winnings or deposit money anytime by using the local and easy payment methods. When you complete your deposit then you can receive a deposit bonus as well. With its attractive visuals, user-friendly design, and exciting offers, this app is one of the most enjoyable and engaging casino-style card games.',
    
    'content.whyFastest.text': 'The 3 Patti Blue game is very popular because it allows you to earn real money while having fun. It is easy to play because it provides you with simple rules that are very easy to understand, especially for beginners. The design of this app is very beautiful and colorful, which gives you a real casino experience on your device. Players love this app because you can withdraw and deposit money easily through Easypaisa and Jazzcash without facing any delays.',
    'content.whyFastest.text2': 'It also includes many exciting games such as Teen Patti, Dragon vs Tiger, Poker, Rummy, and Slots, so that you never feel bored. The other main reason for the popularity of 3 Patti Blue is its daily bonus and rewards that help you earn coins and extra cash. It is very safe and secure and can protect your personal details or money, and work smoothly even on low-storage devices.',
    'content.instantPayout.p1': 'One of 3Patti Blue\'s biggest advantages is its lightning-fast withdrawal system. Unlike competitors who delay payments or create bureaucratic hurdles, 3Patti Blue processes withdrawals instantly - typically within 5-30 minutes. The platform\'s integration with JazzCash and EasyPaisa, Pakistan\'s two most popular mobile wallets, makes cashing out as simple as a few taps.',
    'content.instantPayout.p2': 'The process is remarkably straightforward: once you win, simply navigate to the withdrawal section, select your preferred payment method (JazzCash or EasyPaisa), enter your mobile number and amount, and confirm. Most withdrawals are processed within 5-10 minutes for amounts under PKR 10,000, while larger withdrawals (up to PKR 2,500,000) may take 20-30 minutes for additional security verification. There are no hidden fees, no minimum withdrawal thresholds (you can withdraw as little as PKR 100), and no daily limits - your winnings are yours to access whenever you need them.',
    'content.instantPayout.p3': 'This commitment to transparent, fast payments has earned 3Patti Blue a reputation for reliability. Over 250,000 verified player reviews on TrustPilot and Google Play consistently highlight the platform\'s payment integrity, with an average rating of 4.7/5 stars. Players appreciate that their winnings are never held hostage, creating trust that encourages long-term engagement.',
    'content.getStarted.intro': 'To start the 3 Patti Blue game, follow the given steps:',
    'content.getStarted.step1': 'Firstly, open the official website of 3 Patti Blue and download the APK file to your device.',
    'content.getStarted.step2': 'Once downloaded then click on the downloaded APK file to start the installation by allowing the Unknown Sources.',
    'content.getStarted.step3': 'Once installation is complete, click on it to open the 3 Patti Blue app.',
    'content.getStarted.step4': 'When the app opens then log in with your mobile number or just play as a guest.',
    'content.getStarted.step5': 'When you log in, you will get free chips or welcome bonuses to start playing the game.',
    'content.getStarted.step6': 'Choose a table or game that you want to play, and start enjoying the game.',
    'content.feature1.title': '1: Real Money Earning',
    'content.feature1.text': '3 Patti Blue allows you to earn real cash rewards just by playing the game that you want to play or like. Whether you enjoy teen patti, poker, or rummy, every match provides you with a chance to win money. This app directly transfers your earnings through the local and easy payment methods safely. This app is not just for fun, but also becomes a great way to make extra income, which makes the 3 Patti Blue very entertaining and exciting.',
    'content.feature2.title': '2: Easy Withdraw & Deposit',
    'content.feature2.text': 'With 3 Patti Blue, you can manage your money in a super simple or fast way. With just a few steps, you can withdraw or deposit money anytime using local payment methods, such as JazzCash or EasyPaisa. It also ensures you have secure and quick transactions without any delays. Through this feature, you do not worry about complicated bank processing, just like the other games.',
    'content.feature3.title': '3: Attractive Interface',
    'content.feature3.text': 'This app is designed with a bright, colorful, and modern interface that can attract its users. The background music, smooth animations, and clear layout create an amazing or pleasant experience. Each section of this app is designed very well, so that you can find your favourite game easily. The design of this app feels like a real casino game on your device. Its user-friendly interface makes every game session more enjoyable.',
    'content.feature4.title': '4: Popular Games',
    'content.feature4.text': '3 Patti Blue provides you with a wide variety of famous games in one app so that you can enjoy dragon vs tiger, poker, slots, and many other exciting options. Each game of this app has simple rules that make it perfect for both beginners and experienced players. Its quick rounds or easy gameplay make it very addictive, and this variety keeps the players more entertained for long hours with an interesting gaming experience.',
    'content.feature5.title': '5: Daily Bonus',
    'content.feature5.text': 'This app rewards you every day with free login bonuses or chips. You can earn extra coins just by opening the app regularly. It also provides special rewards on weekly or festival occasions. These bonuses help you to keep playing even if you do not want to deposit money. This feature keeps the game more exciting and engaging, encouraging you to stay active.',
    'content.feature6.title': '6: Referral Earning',
    'content.feature6.text': '3 Patti Blue offers you a referral program where you can earn money without playing games. You just need to share your referral link with your friends and invite them to join. When they start playing games, you receive a commission automatically. It is a simple way to make money without investment. The more you invite, the more income you can get. It is also a smart earring that makes this platform more active, and everyone loves to share it.',
    'content.feature7.title': '7: Fast Performance',
    'content.feature7.text': 'This app runs smoothly on almost every Android device, even on older models. It does not hang, crash, or use too much storage space. The lightweight design of this app helps it to run faster and load to provide a smooth gameplay. Through this feature, you can switch between games quickly without having any lag. This feature can make the app perfect for all types of users with a seamless experience, even on a slow internet connection.',
    'content.feature8.title': '8: Safe & Secure Platform',
    'content.feature8.text': 'In 3 Patti Blue, your privacy and money are completely safe because it uses a secure payment method and data protection system that keeps everything private. Through this feature, you do not have to worry about losing money or personal information. This app is trusted by thousands of players for its reliability. It also provides you with a fair gaming environment that makes your platform secure and risk-free for everyone.',
    'content.feature9.title': '9: Free to Play',
    'content.feature9.text': '3 Patti Blue is free to download and does not ask for any registration fees. Through this feature, you can start playing games quickly with free chips that are given by the app. This feature is a perfect choice, especially for beginners and those who want to learn before investing real money. It also offers you both entertainment and earning opportunities in one place, so that you can play games freely and earn real cash as well.',
    'content.feature10.title': '10: 24/7 Support',
    'content.feature10.text': 'This app also provides you with fast customer support, which helps you anytime. Whether you face a deposit issue or a technical error, this support team responds quickly. You can contact the team directly through the app for quick help. The services of this team are very friendly, professional, and reliable. It also makes your experience smooth and hassle-free. With a 24/7 support team, you can never feel stuck or ignored.',
    'content.bonus1.title': '1: New Player Welcome Bonus',
    'content.bonus1.text': '3Patti Blue offers 100% recharge bonus for all new fresh users on their first deposit in this game.',
    'content.bonus2.title': '2: Recharge Rebate',
    'content.bonus2.text': '3Patti Blue game is also offering huge recharge rebate bonuses for every player when they deposit amount.',
    'content.bonus3.title': '3: Big Rebate on Recharge',
    'content.bonus3.text': 'This type of reward is only available for deposit of minimum 3000 PKR or more than it. It also depends upon VIP Level with increasing rebate bonus. It can be claimed every day.',
    'content.download.intro': 'To download the latest version of 3 Patti Blue APK for Android devices, follow the given steps:',
    'content.download.step1': 'First, you open the browser on your Android device and click on the search bar.',
    'content.download.step2': 'In the search bar, type 3 Patti Blue or directly paste the link 3patiblueapp.com.pk and visit the trusted website.',
    'content.download.step3': 'On the trusted website, click on the Download button to start downloading.',
    'content.download.step4': 'Now wait a few seconds to complete the downloading process.',
    'content.download.step5': 'Once complete, that file will be saved in the Download Folder of the device.',
    'content.install.title': 'Installation Guide for 3Patti Blue APK',
    'content.install.intro': 'After downloading to installing the 3 Patti Blue APK, follow the given steps:',
    'content.install.step1': 'To start installation, your device grants permission to install unknown sources.',
    'content.install.step2': 'Open the Settings → Security and enable the Install Unknown Apps.',
    'content.install.step3': 'After this, open the File Manager and go to the Download Folder.',
    'content.install.step4': 'Click on the download APK file, and the installation process will start.',
    'content.install.step5': 'Wait until the installation completes successfully on your device.',
    'content.install.step6': 'Once complete then the app icon will show on your device.',
    'content.install.step7': 'Click on it to launch the app and start playing the games that you want.',
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
    'content.registration.title1': '1: Register Method',
    'content.registration.intro': 'To register the account on 3 Patti Blue, follow the given steps:',
    'content.registration.step1': 'Firstly, open the 3 Patti Blue app on your device.',
    'content.registration.step2': 'On the homescreen, click on the Register or Sign Up option.',
    'content.registration.step3': 'Now, enter your valid mobile number or email address.',
    'content.registration.step4': 'Set a strong password that can never be accessed easily.',
    'content.registration.step5': 'Enter the OTP that you can receive through phone or email for verification.',
    'content.registration.step6': 'Once verification is complete then your account will be created successfully.',
    'content.login.title': '2: Login Method',
    'content.login.intro': 'After registration, the next step is to log account for Follow the given steps.',
    'content.login.step1': 'Open the 3 Patti Blue app on your device.',
    'content.login.step2': 'Click on the Login button on the homescreen.',
    'content.login.step3': 'Enter your registered mobile number, email, or password.',
    'content.login.step4': 'Make sure that your entered details are correct.',
    'content.login.step5': 'Once confirmed, tap on the Sign in or Login option.',
    'content.login.step6': 'If you forget your password, then use Forgot Password to reset it.',
    'content.login.step7': 'Once logging is complete then you can start playing games.',
    'content.payment1.title': '1: Jazzcash',
    'content.payment1.text': 'Jazzcash is one of the most trusted and secure mobile banking services that allows you to deposit money quickly into your gaming account and start playing games quickly. It is a fast and safe transaction system that allows you to withdraw your winnings directly into your account wallet. The best part of this method is that you can wait a long time because the transactions are completed within seconds.',
    'content.payment2.title': '2: Easypaisa',
    'content.payment2.text': 'Easypaisa is another secure and most commonly used payment method that is similar to the JazzCash method. It allows you to deposit or withdraw money without any difficulty. Through this method, you can add funds to your game account and transfer winnings to your Easypaisa wallet in just a few steps. The process of this method is very safe, reliable, and suitable for all types of users.',
    'content.deposit.title': 'How to Deposit Money in the 3Patti Blue App?',
    'content.deposit.intro': 'To deposit money in 3 Patti Blue, follow the given steps:',
    'content.deposit.step1': 'First, open the 3 Patti Blue app on your device and log in.',
    'content.deposit.step2': 'Now, click on the Wallet option that is available on the homescreen.',
    'content.deposit.step3': 'In this wallet section, click on the Deposit option.',
    'content.deposit.step4': 'Choose a payment method that you want to use.',
    'content.deposit.step5': 'Enter the amount that you want to deposit.',
    'content.deposit.step6': 'Click on the confirm option and wait to complete it.',
    'content.deposit.step7': 'Once complete, the balance will show in your game wallet.',
    'content.withdraw.title': 'How to Withdraw Money in 3Patti Blue?',
    'content.withdraw.intro': 'To withdraw money in 3 Patti Blue, follow the given steps:',
    'content.withdraw.step1': 'Open the 3 Patti Blue app and log in to your account.',
    'content.withdraw.step2': 'Click on the Wallet option that is available on the main screen.',
    'content.withdraw.step3': 'In the wallet section, click on the Withdrawal option.',
    'content.withdraw.step4': 'Choose your payment method, like JazzCash or EasyPaisa.',
    'content.withdraw.step5': 'Now enter the amount that you want to withdraw.',
    'content.withdraw.step6': 'Enter some required details, like the account number.',
    'content.withdraw.step7': 'Double-check all entered details and click on Confirm.',
    'content.withdraw.step8': 'Wait a few seconds to complete the withdrawal process.',
    'content.withdraw.step9': 'Once complete, that money will be shown in your selected payment method.',
    'content.support.intro': 'To contact the customer support team of 3 Patti Blue, you can use the given methods:',
    'content.support.chat': '3 Patti Blue provides you with a live chat feature inside the app so that you can directly talk to the support team if you face any problems. Whether you face any issue like playing or using the app, this team responds to you quickly and helps you to solve your issues in real time. Live chat is the fastest way to get support without leaving the app.',
    'content.support.whatsapp': 'You can also contact the support team through WhatsApp. You can simply use the number that is provided in the app to send your problem. This support team replies to you with instructions or solutions that make it easy to fix any problem. This WhatsApp support is very convenient because this is a simple and easy way to get help.',
    'content.support.email': 'This app also dedicates a FAQs section where common questions are given with their answers. You can check this section before contacting the customer support team to save time. These FAQs mostly cover all topics such as registration, deposit, withdrawals, bonuses, and game rules. So, this is quick and easy to find the solution without waiting long.',
    'content.security.title': 'About the Safety & Security of the 3Patti Blue',
    'content.security.intro': '3 Patti Blue is an online gaming platform that provides you with a safe and secure environment. It uses basic security features such as data encryption or SSL certificates that can protect your information.',
    'content.security.technical': 'This app also supports local payment options such as JazzCash or Easy Paisa, which can make the transactions safer and secure. However, this app is not officially available on the Google Play Store and may come with some risks, such as malware or scams.',
    'content.security.payment': 'So, it is important to make sure that you can download it from official, safe, and secure sources. Always avoid sharing your sensitive personal information or banking details.',
    'content.security.fairplay': '',
    'content.security.googleplay': 'Why Not on Google Play? Google Play Store prohibits real-money gaming apps globally (policy applies to all regions). This is NOT because 3Patti Blue is unsafe - it\'s Google\'s blanket policy. All legitimate real-money gaming platforms worldwide distribute via APK. Always download from official website (3patiblueapp.com.pk) to avoid fake/malware versions circulating on third-party sites.',
    
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
    'tips.title': 'Tips & Tricks to Earn Maximum on 3Patti Blue Game',
    'tips.tip1': 'Start with Small Bets: Always start a game with a small investment because it will help you to understand the game rules and overcome the risk of losing money. When you become confident, then increase your bet.',
    'tips.tip2': 'Use Bonuses Wisely: 3 Patti Blue offers you daily login bonuses, referral bonuses, or deposit rewards. It helps you to play more games without spending your one money or earning extra money.',
    'tips.tip3': 'Play Popular Games: Focus on high-earning games such as Dragon vs Tiger or Teen Patti Classic that provide you with higher winning chances, and also attract players with better opportunities to earn.',
    'tips.tip4': 'Invite Friends: Use the referral link system to invite friends every time your friends join, and then you can earn commission. The more friends you invite, the higher you can become.',
    'tips.tip5': 'Stay Active Daily: Regularly log in to the app to collect the daily rewards or spin bonuses. Always stay active because it will increase your bonus balance or improve your chances of winning big.',
    'tips.tip6': 'Withdraw on Time: When you earn a good amount then do not delay withdrawal. Always transfer your winnings as soon as possible through Jazzcash or EasyPaisa to keep your money safe.',
    'tips.tip7': 'Learn from Practice Mode: Before playing games with real money, try the free or demo mode as practice. This helps you to understand the gameplay easily and develop the winning strategies without any risk.',
    'tips.tip8': 'Keep the Emotions in Control: Never play games with frustration or greed. Always stay calm or make smart decisions during the game because it helps you to avoid unnecessary losses.',
    'tips.tip9': 'With Expert Players: Observe how other players make the moves. Through this, you can learn new techniques or strategies and timing from them to improve your skills.',
    'tips.tip10': 'Avoid Fake Apps: Always download the original 3 Patti Blue app through official or trusted sources because fake links or websites can steal your personal data or money.',
    
    // What's New
    'whatsnew.title': "What's New in the Latest Version of the 3Patti Blue?",
    'whatsnew.item1': 'In the latest version, the game looks better with improved graphics and smooth animations.',
    'whatsnew.item2': 'Provide fast performance so that the app opens quickly and runs smoothly without lag.',
    'whatsnew.item3': 'Its menu and layout are simple, which makes it very easy, especially for new users.',
    'whatsnew.item4': 'In the latest versions, more games are added, such as Dragon vs Tiger, Rummy, and others.',
    'whatsnew.item5': 'The withdrawal or deposit options work faster and smoothly in the latest version.',
    'whatsnew.item6': 'In the latest version, better security measures can be used that can protect your account and money.',
    'whatsnew.item7': 'New bonuses and referral rewards provide you with more chances to earn money.',
    'whatsnew.item8': 'Old Errors or app issues are removed to offer a smooth gaming experience.',
    'whatsnew.item9': 'The background music or game sounds improve the app and provide more fun.',
    'whatsnew.item10': 'The new VIP system gives you extra prizes and benefits that help you stay active.',
    
    // Pros & Cons
    'proscons.title': 'Pros & Cons of using 3Patti Blue',
    'proscons.pros.title': 'Pros',
    'proscons.cons.title': 'Cons',
    'proscons.pro1': 'Very simple and fun to play',
    'proscons.pro2': 'Earn money with a small investment',
    'proscons.pro3': 'Jazzcash and Easypaisa make payment easy',
    'proscons.pro4': 'Many different games for enjoyment',
    'proscons.pro5': 'Fast withdrawal of your money',
    'proscons.pro6': 'Very easy to use and quick to start',
    'proscons.pro7': 'Daily rewards and bonuses',
    'proscons.con1': 'Risk of losing money',
    'proscons.con2': 'Sometimes withdrawals take time',
    'proscons.con3': 'Gameplay can be addictive',
    'proscons.con4': 'Run slow on weak phones',
    'proscons.con5': 'No legal Support',
    'proscons.con6': 'No Financial Freedom',
    'proscons.con7': 'Gameplay can be complicated',
    
    // Final Verdict
    'verdict.title': 'Final Thoughts',
    'verdict.para1': '3 Patti Blue is one of the most popular online card games in the world. It not only provides you with fun or entertainment but also provides you with a great chance to earn money if you play games wisely. This app provides you with a simple and user-friendly interface that can make it easy, especially for beginners, to play games.',
    'verdict.para2': 'The deposit or withdrawal system through JazzCash or EasyPaisa is very convenient, which makes this platform very easy to use. If you play responsibly, make plans with smart strategies, and focus on your skill rather than luck, 3 Patti Blue can become a more exciting or rewarding gaming experience.',
    
    // Customer Support Details
    'support.livechat.title': 'Live Chat',
    'support.livechat.details': '3 Patti Blue provides you with a live chat feature inside the app so that you can directly talk to the support team if you face any problems. Whether you face any issue like playing or using the app, this team responds to you quickly and helps you to solve your issues in real time. Live chat is the fastest way to get support without leaving the app.',
    'support.whatsapp.title': 'Whatsapp',
    'support.whatsapp.details': 'You can also contact the support team through WhatsApp. You can simply use the number that is provided in the app to send your problem. This support team replies to you with instructions or solutions that make it easy to fix any problem. This WhatsApp support is very convenient because this is a simple and easy way to get help.',
    'support.email.title': '📧 Email Support',
    'support.email.details': 'Response Time: 2-6 hours. Email: support@3patiblueapp.com.pk. Best for: non-urgent queries, detailed complaints, account issues, feature requests, partnership inquiries. Include your registered mobile number for faster resolution. Attach screenshots/videos if relevant. Our team provides comprehensive written responses. All emails answered within 6 hours (usually 2-3 hours). Creates written record for future reference. Professional, courteous service. Monday-Sunday, 24/7 email monitoring.',
    'support.faqdb.title': 'FAQs',
    
    // FAQ Questions & Answers
    'faq.q1': 'Can users play 3 Patti Blue without depositing money?',
    'faq.a1': 'Yes, users can play 3 Patti Blue without depositing money because this app provides free chips or daily bonuses that help them to start playing without depositing any amount.',
    'faq.q2': 'How do users contact customer support?',
    'faq.a2': 'Users can contact customer support through live chat inside the app, WhatsApp, or by checking the FAQs section for quick answers.',
    'faq.q3': 'What makes 3 Patti Blue different from other card games?',
    'faq.a3': '3 Patti Blue is different because it provides a wide variety of games, supports local payment methods like JazzCash and EasyPaisa, and also offers daily bonuses and referral rewards.',
    'faq.q4': 'Is 3 Patti Blue safe and legal to use?',
    'faq.a4': '3 Patti Blue is safe to use because it uses secure payment methods and encryption to protect your information. However, it is not officially on the Google Play Store, so download only from official sources.',
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
    'content.login.title': '2: محفوظ لاگ ان کا عمل',
    'content.login.intro': 'اپنے تین پتی بلیو اکاؤنٹ تک کسی بھی وقت، کہیں بھی محفوظ طریقے سے رسائی حاصل کریں:',
    'content.login.step1': 'تین پتی بلیو کھولیں: اپنی ہوم اسکرین سے ایپ لانچ کریں۔',
    'content.login.step2': 'لاگ ان پر کلک کریں: ویلکم اسکرین پر "Login" بٹن پر ٹیپ کریں۔',
    'content.login.step3': 'کریڈنشلز درج کریں: اپنا رجسٹرڈ موبائل نمبر یا ای میل اور پاس ورڈ درج کریں۔',
    'content.login.step4': 'تفصیلات کی تصدیق کریں: لاگ ان کی غلطیوں سے بچنے کے لیے اپنے کریڈنشلز دوبارہ چیک کریں۔',
    'content.login.step5': 'سائن ان پر ٹیپ کریں: اپنے اکاؤنٹ تک رسائی کے لیے "Sign In" یا "Login" بٹن پر کلک کریں۔',
    'content.login.step6': 'ٹو فیکٹر تصدیق (اگر فعال ہو): اضافی سیکیورٹی کے لیے اپنے موبائل پر بھیجا گیا OTP درج کریں۔',
    'content.login.step7': 'پاس ورڈ بھول گئے؟ SMS OTP کے ذریعے ری سیٹ کرنے کے لیے "Forgot Password" پر ٹیپ کریں۔ نیا پاس ورڈ بنانے کے لیے آپ کو کوڈ موصول ہوگا۔',
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
    'content.support.intro': 'تین پتی بلیو متعدد چینلز اور گارنٹی شدہ جوابی اوقات کے ساتھ صنعت کی معروف کسٹمر سپورٹ پیش کرتا ہے۔ اپنا ترجیحی طریقہ منتخب کریں:',
    'content.support.chat': 'جوابی وقت: 2-5 منٹ',
    'content.support.whatsapp': 'جوابی وقت: 5-15 منٹ',
    'content.support.email': 'جوابی وقت: 2-6 گھنٹے',
    'content.security.title': 'کیا تین پتی بلیو محفوظ ہے؟ مکمل سیکیورٹی تجزیہ 2026',
    'content.security.intro': 'جی ہاں، تین پتی بلیو مکمل طور پر محفوظ اور قابل اعتماد ہے۔ پلیٹ فارم نے 2024 میں اپنی شروعات سے بہترین سیکیورٹی ریکارڈ برقرار رکھا ہے، 10 لاکھ سے زیادہ صارفین کو متاثر کرنے والی صفر ڈیٹا خلاف ورزیوں کے ساتھ۔ یہ ہمارا جامع سیکیورٹی تجزیہ ہے:',
    'content.security.technical': 'تکنیکی سیکیورٹی اقدامات: تین پتی بلیو تمام ڈیٹا ٹرانسمیشن کے لیے ملٹری گریڈ 256-bit SSL انکرپشن (بینکوں کے ذریعے استعمال ہونے والا وہی معیار) کو نافذ کرتا ہے۔ ہر لین دین، لاگ ان، اور ذاتی تفصیل اینڈ ٹو اینڈ انکرپٹ ہے۔ پلیٹ فارم سرٹیفائیڈ سائبر سیکیورٹی فرموں کے ذریعے سہ ماہی تھرڈ پارٹی سیکیورٹی آڈٹس سے گزرتا ہے۔ تمام سرورز 24/7 نگرانی کے ساتھ محفوظ، ISO سرٹیفائیڈ ڈیٹا سینٹرز میں ہوسٹ کیے جاتے ہیں۔ ٹو فیکٹر تصدیق (2FA)، بایومیٹرک لاگ ان (فنگر پرنٹ/فیس ID)، اور ریئل ٹائم فراڈ ڈیٹیکشن AI صارف اکاؤنٹس کی حفاظت کرتے ہیں۔ ادائیگی کا ڈیٹا ٹوکنائزڈ ہے اور کبھی سرورز پر محفوظ نہیں کیا جاتا، بین الاقوامی PCI-DSS معیارات کی تعمیل کرتے ہوئے۔',
    'content.security.payment': 'ادائیگی کی سیکیورٹی: جاز کیش اور ایزی پیسہ کے ذریعے تمام ادائیگیاں تصدیق شدہ، لائسنس یافتہ گیٹ ویز کے ذریعے کارروائی کی جاتی ہیں۔ تین پتی بلیو کبھی بھی آپ کے بینک اکاؤنٹ تک براہ راست رسائی حاصل نہیں کرتا۔ نکاسی کی درخواستیں کارروائی سے پہلے خودکار فراڈ چیکس سے گزرتی ہیں۔ KYC تصدیق (ID کارڈ + سیلفی) منی لانڈرنگ کو روکتی ہے اور جائز صارفین کو یقینی بناتی ہے۔ 2024 سے PKR 10 بلین سے زیادہ کامیابی سے نکالے گئے 99.8% کامیابی کی شرح کے ساتھ اور کوئی غیر مجاز لین دین رپورٹ نہیں ہوئی۔',
    'content.security.fairplay': 'منصفانہ کھیل کی یقین دہانی: Gaming Laboratories International کے ذریعے ٹیسٹ شدہ سرٹیفائیڈ Random Number Generator (RNG) یہ یقینی بناتا ہے کہ ہر کارڈ ڈیل مکمل طور پر رینڈم اور غیر متوقع ہے۔ تمام گیم کے نتائج ریاضیاتی طور پر منصفانہ اور قابل آڈٹ ہیں۔ دھوکہ دہی مخالف نظام مشکوک کھلاڑیوں کا فوری طور پر پتہ لگاتے ہیں اور انہیں بین کرتے ہیں۔ شائع شدہ جیت کی شرحیں اور شفاف الگورتھم اعتماد پیدا کرتے ہیں۔',
    'content.security.googleplay': 'Google Play پر کیوں نہیں؟ Google Play Store عالمی سطح پر حقیقی رقم کی گیمنگ ایپس کو منع کرتا ہے (پالیسی تمام خطوں پر لاگو ہوتی ہے)۔ یہ اس لیے نہیں ہے کہ تین پتی بلیو غیر محفوظ ہے - یہ Google کی عام پالیسی ہے۔ دنیا بھر کے تمام جائز حقیقی رقم کے گیمنگ پلیٹ فارمز APK کے ذریعے تقسیم کرتے ہیں۔ تھرڈ پارٹی سائٹس پر گردش کرنے والے جعلی/میلویئر ورژنز سے بچنے کے لیے ہمیشہ آفیشل ویب سائٹ (3patiblueapp.com.pk) سے ڈاؤن لوڈ کریں۔',
    
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
    'proscons.con1': 'مالی خطرہ: حقیقی رقم کی گیمنگ میں نقصان کا خطرہ ہے (ذمہ داری سے کھیلیں)',
    'proscons.con2': 'نکاسی کی کم سے کم حد: PKR 500 کم سے کم (صنعتی معیار)',
    'proscons.con3': 'نشہ آور صلاحیت: دلکش گیم پلے خود نظم و ضبط کی ضرورت ہے',
    'proscons.con4': 'Google Play پر نہیں: براہ راست APK ڈاؤن لوڈ کرنا ضروری ہے',
    'proscons.con5': 'انٹرنیٹ ضروری: تمام گیمز کو مستحکم انٹرنیٹ کنکشن کی ضرورت ہے',
    'proscons.con6': 'عمر کی پابندی: صرف 18+ (سختی سے نافذ)',
    'proscons.con7': 'سیکھنے کی مشکل: کچھ گیمز کو حکمت عملی اور مشق کی ضرورت ہے',
    
    // Final Verdict (اردو)
    'verdict.title': 'حتمی فیصلہ: تین پتی بلیو پاکستان کا #1 تین پتی پلیٹ فارم کیوں ہے',
    'verdict.para1': 'جامع تجزیہ کے بعد، تین پتی بلیو 2026 میں پاکستان کے بہترین تین پتی گیمنگ پلیٹ فارم کے طور پر نمایاں ہے۔ 10 لاکھ سے زیادہ فعال کھلاڑیوں، 250,000+ تصدیق شدہ صارفین سے 4.7 اسٹار ریٹنگ، اور 2024 سے PKR 10 بلین+ کامیاب نکاسی کے ساتھ، پلیٹ فارم نے اپنی قابل اعتمادیت ثابت کی ہے۔',
    'verdict.para2': 'جو چیز واقعی تین پتی بلیو کو الگ کرتی ہے وہ ہے پاکستانی کھلاڑیوں کے لیے اس کی وابستگی - بغیر کسی رکاوٹ جاز کیش اور ایزی پیسہ انٹیگریشن، اردو اور انگریزی میں 24/7 سپورٹ، ہلکی 49MB ایپ جو بجٹ فونز پر کام کرتی ہے، اور مقامی گیمنگ کلچر کی حقیقی سمجھ۔',
    
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
