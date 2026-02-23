'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  
  return (
    <footer className="footer-stable bg-primary text-white py-8 px-4 md:px-8 border-t border-gray-800 relative z-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-[280px]">
          {/* About Column */}
          <div className={language === 'ur' ? 'text-right' : ''}>
            <h3 className="text-xl font-bold text-accent mb-4" style={language === 'ur' ? { fontFamily: 'system-ui' } : {}}>
              {t('hero.title')}
            </h3>
            <p className="text-sm text-gray-300 mb-4" style={language === 'ur' ? { fontFamily: 'system-ui', direction: 'rtl' } : {}}>
              {t('footer.description')}
            </p>
            <ul className="flex space-x-4 min-h-[20px] list-none m-0 p-0">
              <li>
                <a href="https://www.facebook.com/profile.php?id=61587903094679&mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex-shrink-0 w-5 h-5 block">
                <svg className="w-5 h-5 text-gray-400 hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M18.77,7.46H14.5v-1.9c0-0.9,0.6-1.1,1-1.1h3V0.13H14.5c-4.1,0-5,2.9-5,4.8v2.5H6v4.5h3.5V22h5V11.96h3.35L18.77,7.46z" />
                </svg>
                </a>
              </li>
              <li>
                <a href="https://x.com/juniper60122" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex-shrink-0 w-5 h-5 block">
                <svg className="w-5 h-5 text-gray-400 hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com/3patiblue/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="flex-shrink-0 w-5 h-5 block">
                <svg className="w-5 h-5 text-gray-400 hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className={language === 'ur' ? 'text-right' : ''}>
            <h3 className="text-lg font-semibold mb-4 text-accent" style={language === 'ur' ? { fontFamily: 'system-ui' } : {}}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2 text-sm" style={language === 'ur' ? { fontFamily: 'system-ui' } : {}}>
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent transition-colors">
                  {t('header.home')}
                </Link>
              </li>
              <li>
                <Link href="/download-3-patti-blue" className="text-gray-300 hover:text-accent transition-colors">
                  {t('header.download')}
                </Link>
              </li>
              <li>
                <Link href="/3-patti-blue-for-pc" className="text-gray-300 hover:text-accent transition-colors">
                  {t('header.pcVersion')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-accent transition-colors">
                  {t('header.blog')}
                </Link>
              </li>
              <li>
                <Link href="/3-patti-blue-pakistan-about-us" className="text-gray-300 hover:text-accent transition-colors">
                  {t('header.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-300 hover:text-accent transition-colors">
                  {t('header.contactUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className={language === 'ur' ? 'text-right' : ''}>
            <h3 className="text-lg font-semibold mb-4 text-accent" style={language === 'ur' ? { fontFamily: 'system-ui' } : {}}>
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/deposit-money-in-3-patti-blue" className="text-gray-300 hover:text-accent transition-colors">
                  {t('footer.depositGuide')}
                </Link>
              </li>
              <li>
                <Link href="/withdraw-money-from-3-patti-blue" className="text-gray-300 hover:text-accent transition-colors">
                  {t('footer.withdrawGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog/create-3-patti-blue-account-and-login" className="text-gray-300 hover:text-accent transition-colors">
                  {t('footer.accountLogin')}
                </Link>
              </li>
              <li>
                <Link href="/blog/tips-to-win-big-in-3-patti-blue" className="text-gray-300 hover:text-accent transition-colors">
                  {t('footer.tipsToWin')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-accent transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-300 hover:text-accent transition-colors">
                  {t('footer.disclaimer')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Download */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent" style={language === 'ur' ? { fontFamily: 'system-ui', direction: 'rtl', textAlign: 'right' } : {}}>{t('footer.downloadApp')}</h3>
            <p className="text-sm text-gray-300 mb-4" style={language === 'ur' ? { fontFamily: 'system-ui', direction: 'rtl', textAlign: 'right' } : {}}>
              {t('footer.downloadDesc')}
            </p>
            <a 
              href="https://3pattibluevip.com?from_gameid=9483409&channelCode=100000"
              target="_blank" 
              rel="noopener noreferrer" 
              className="download-btn bg-transparent hover:bg-[#0ea5e9]/10 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-all shadow-lg hover:shadow-xl border-2 border-[#0ea5e9]"
            >
              <span>{t('btn.downloadNow')}</span>
              <div className="download-icon ml-2 bg-[#f97316] rounded-full p-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p style={language === 'ur' ? { fontFamily: 'system-ui', direction: 'rtl' } : {}}>
            {t('footer.copyright')} | <Link href="/" className="hover:text-accent">3patiblueapp.com.pk</Link> | {t('footer.trusted')} | 4.7★ Rating
          </p>
        </div>
      </div>
    </footer>
  );
} 