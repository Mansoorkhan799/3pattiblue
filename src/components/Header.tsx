'use client';

import Link from 'next/link';
import Image from 'next/image';
import MobileNavigation from './MobileNavigation';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="bg-primary/80 backdrop-blur-md py-3 px-4 md:px-8 sticky top-0 z-50 border-b border-gray-800/50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-10 mr-2">
            <Image
              src="/3-patti-blue-logo.webp"
              alt="3Patti Blue - Pakistan's #1 Teen Patti App"
              width={40}
              height={40}
              className="object-contain"
              priority={true}
              fetchPriority="high"
            />
          </div>
          <span className="text-accent text-xl md:text-2xl font-bold">
            3Patti Blue
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-accent font-medium transition-colors">
            {t('header.home')}
          </Link>
          <Link href="/download-card-rummy" className="text-white hover:text-accent font-medium transition-colors">
            {t('header.download')}
          </Link>
          <Link href="/deposit-money-in-card-rummy" className="text-white hover:text-accent font-medium transition-colors">
            {t('header.deposit')}
          </Link>
          <Link href="/withdraw-money-from-card-rummy" className="text-white hover:text-accent font-medium transition-colors">
            {t('header.withdraw')}
          </Link>
          <Link href="/about-us" className="text-white hover:text-accent font-medium transition-colors">
            {t('header.aboutUs')}
          </Link>
          <Link href="/blog" className="text-white hover:text-accent font-medium transition-colors">
            {t('header.blog')}
          </Link>
          <Link href="/contact-us" className="text-white hover:text-accent font-medium transition-colors">
            {t('header.contactUs')}
          </Link>
        </nav>

        {/* Language Toggle - Desktop */}
        <div className="hidden lg:block">
          <LanguageToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-3 relative z-50">
          <LanguageToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
} 