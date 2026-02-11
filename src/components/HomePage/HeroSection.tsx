'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function HeroSection() {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <>
      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4 md:px-8 max-w-7xl mx-auto" style={{ minHeight: '400px' }}>
        <div className="md:flex md:items-start md:justify-between md:space-x-12 lg:space-x-20">
          <div className="md:w-1/2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-white" style={isUrdu ? { fontFamily: 'system-ui', direction: 'rtl' } : {}}>
                  {t('hero.title')}
                </span>
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-accent" style={isUrdu ? { fontFamily: 'system-ui' } : {}}>
                  {t('hero.subtitle')}
                </span>{' '}
                <span className="text-white" style={isUrdu ? { fontFamily: 'system-ui' } : {}}>
                  {t('hero.subtitle2')}
                </span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed" style={isUrdu ? { fontFamily: 'system-ui', direction: 'rtl', textAlign: 'right' } : { contain: 'layout style', minHeight: '120px', display: 'block' }}>
              {t('hero.description')}
            </p>

            {/* Download Button */}
            <div className="flex justify-center my-8">
              <a 
                href="https://3pattibluevip.com?from_gameid=9483409&channelCode=100000"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center px-8 py-4 text-white font-semibold text-lg rounded-full border-2 border-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-all group"
              >
                <span style={isUrdu ? { fontFamily: 'system-ui' } : {}}>{t('btn.downloadNow')}</span>
                <div className="ml-3 bg-[#f97316] rounded-full p-2 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </div>
              </a>
            </div>

            {/* Trust Signals & Stats */}
            <div className="flex flex-row gap-4 justify-center mt-8 mb-4" style={{ minHeight: '120px' }}>
              <div className="bg-[#0A1029] p-6 rounded-2xl text-center flex-1 max-w-[180px]" style={{ minHeight: '120px' }}>
                <svg className="w-6 h-6 mb-3 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div className="text-white text-2xl font-bold mb-1">1M+</div>
                <div className="text-gray-400 text-sm" style={isUrdu ? { fontFamily: 'system-ui' } : {}}>{t('stats.players')}</div>
              </div>
              
              <div className="bg-[#0A1029] p-6 rounded-2xl text-center flex-1 max-w-[180px]" style={{ minHeight: '120px' }}>
                <svg className="w-6 h-6 mb-3 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <div className="text-white text-2xl font-bold mb-1">4.7★</div>
                <div className="text-gray-400 text-sm" style={isUrdu ? { fontFamily: 'system-ui' } : {}}>{t('stats.rating')}</div>
              </div>

              <div className="bg-[#0A1029] p-6 rounded-2xl text-center flex-1 max-w-[180px]" style={{ minHeight: '120px' }}>
                <svg className="w-6 h-6 mb-3 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <div className="text-white text-2xl font-bold mb-1">100%</div>
                <div className="text-gray-400 text-sm" style={isUrdu ? { fontFamily: 'system-ui' } : {}}>{t('stats.secure')}</div>
              </div>
            </div>

            {/* Android only notice */}
            <p className="text-gray-400 text-sm text-center italic" style={isUrdu ? { fontFamily: 'system-ui', direction: 'rtl' } : {}}>
              {t('notice.androidOnly')}
            </p>
          </div>

          {/* App Image */}
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center items-center">
            <div className="relative mx-auto" style={{ width: '280px', height: '280px', maxWidth: '100%' }}>
              <Image
                src="/3-patti-blue.webp"
                alt="3Patti Blue - Pakistan's Most Trusted Teen Patti App"
                width={280}
                height={280}
                className="object-contain drop-shadow-2xl"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
