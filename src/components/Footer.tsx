'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  
  return (
    <footer className="bg-primary text-white py-8 px-4 md:px-8 border-t border-gray-800 relative z-20" style={{ minHeight: '400px' }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div className={language === 'ur' ? 'text-right' : ''}>
            <h3 className="text-xl font-bold text-accent mb-4" style={language === 'ur' ? { fontFamily: 'system-ui' } : {}}>
              {t('hero.title')}
            </h3>
            <p className="text-sm text-gray-300 mb-4" style={language === 'ur' ? { fontFamily: 'system-ui', direction: 'rtl' } : {}}>
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1at8tjJcje/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="w-5 h-5 text-gray-400 hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-0.9,0.6-1.1,1-1.1h3V0.13H14.5c-4.1,0-5,2.9-5,4.8v2.5H6v4.5h3.5V22h5V11.96h3.35L18.77,7.46z" />
                </svg>
              </a>
            </div>
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