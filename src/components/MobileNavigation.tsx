'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  const handleMenuToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isOpen;
    console.log('Mobile menu button clicked! Current state:', isOpen, '→ New state:', newState);
    setIsOpen(newState);
  };

  useEffect(() => {
    setMounted(true);
    
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) {
    return (
      <div className="lg:hidden relative z-50">
        <button 
          className="flex items-center text-accent p-2 rounded-xl relative z-50 shadow-lg border-2 border-accent/30"
          aria-label="Open menu"
          style={{ pointerEvents: 'auto' }}
          disabled
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-7 h-7"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="lg:hidden relative z-50">
      {/* Mobile menu button */}
      <button 
        onClick={handleMenuToggle}
        type="button"
        className="flex items-center text-accent p-2 hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent/10 rounded-xl transition-all duration-300 relative z-50 cursor-pointer shadow-lg hover:shadow-accent/50 active:scale-90 border-2 border-accent/30 hover:border-accent/50"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        style={{ pointerEvents: 'auto' }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-7 h-7"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Navigation Menu Overlay */}
      {mounted && isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] animate-fadeIn" 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-primary/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="absolute inset-0 flex flex-col overflow-y-auto animate-slideIn" style={{ zIndex: 1 }}>
            {/* Header with Logo and Close Button */}
            <div className="flex justify-between items-center p-5 border-b border-accent/20 bg-gradient-to-r from-primary/95 to-[#0a0f2a]/95 backdrop-blur-lg sticky top-0 z-10 shadow-lg">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={() => setIsOpen(false)}>
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/3-patti-blue-logo.webp"
                    alt="3Patti Blue Logo"
                    fill
                    sizes="(max-width: 768px) 48px, 48px"
                    className="object-contain drop-shadow-lg"
                    priority={true}
                  />
                </div>
                <span className="text-accent text-2xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                  3Patti Blue
                </span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-accent p-2 hover:bg-accent/20 rounded-xl transition-all duration-300 hover:rotate-90 active:scale-90"
                aria-label="Close menu"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="w-9 h-9"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-col p-6 space-y-2 flex-1 mt-4">
              <Link 
                href="/" 
                className="group relative text-white hover:text-accent py-4 px-6 text-lg font-bold transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-accent/50 bg-gradient-to-r from-transparent to-transparent hover:from-accent/5 hover:to-accent/10 hover:shadow-lg hover:shadow-accent/20 hover:translate-x-2 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">🏠</span>
                  <span>{t('header.home')}</span>
                </span>
              </Link>
              <Link 
                href="/download-card-rummy" 
                className="group relative text-white hover:text-accent py-4 px-6 text-lg font-bold transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-accent/50 bg-gradient-to-r from-transparent to-transparent hover:from-accent/5 hover:to-accent/10 hover:shadow-lg hover:shadow-accent/20 hover:translate-x-2 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <span>{t('header.download')}</span>
                </span>
              </Link>
              <Link 
                href="/deposit-money-in-card-rummy" 
                className="group relative text-white hover:text-accent py-4 px-6 text-lg font-bold transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-accent/50 bg-gradient-to-r from-transparent to-transparent hover:from-accent/5 hover:to-accent/10 hover:shadow-lg hover:shadow-accent/20 hover:translate-x-2 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <span>{t('header.deposit')}</span>
                </span>
              </Link>
              <Link 
                href="/withdraw-money-from-card-rummy" 
                className="group relative text-white hover:text-accent py-4 px-6 text-lg font-bold transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-accent/50 bg-gradient-to-r from-transparent to-transparent hover:from-accent/5 hover:to-accent/10 hover:shadow-lg hover:shadow-accent/20 hover:translate-x-2 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">💸</span>
                  <span>{t('header.withdraw')}</span>
                </span>
              </Link>
              <Link 
                href="/about-us" 
                className="group relative text-white hover:text-accent py-4 px-6 text-lg font-bold transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-accent/50 bg-gradient-to-r from-transparent to-transparent hover:from-accent/5 hover:to-accent/10 hover:shadow-lg hover:shadow-accent/20 hover:translate-x-2 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">ℹ️</span>
                  <span>{t('header.aboutUs')}</span>
                </span>
              </Link>
              <Link 
                href="/blog" 
                className="group relative text-white hover:text-accent py-4 px-6 text-lg font-bold transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-accent/50 bg-gradient-to-r from-transparent to-transparent hover:from-accent/5 hover:to-accent/10 hover:shadow-lg hover:shadow-accent/20 hover:translate-x-2 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  <span>{t('header.blog')}</span>
                </span>
              </Link>
              <Link 
                href="/contact-us" 
                className="group relative text-white hover:text-accent py-4 px-6 text-lg font-bold transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-accent/50 bg-gradient-to-r from-transparent to-transparent hover:from-accent/5 hover:to-accent/10 hover:shadow-lg hover:shadow-accent/20 hover:translate-x-2 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <span>{t('header.contactUs')}</span>
                </span>
              </Link>
              
              {/* Menu Footer */}
              <div className="mt-8 pt-6 border-t border-accent/20">
                <div className="text-center space-y-3">
                  <p className="text-gray-400 text-sm font-medium">
                    Pakistan's Most Trusted
                  </p>
                  <p className="text-accent text-xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                    3Patti Blue
                  </p>
                  <p className="text-gray-500 text-xs">
                    © 2026 All Rights Reserved
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}