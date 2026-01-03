'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="md:hidden">
        <button 
          className="flex items-center text-accent p-1"
          aria-label="Open menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-8 h-8"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-accent p-1"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-8 h-8"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-primary">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/card-rummy.webp"
                  alt="Card Rummy Logo"
                  fill
                  sizes="(max-width: 768px) 32px, 40px"
                  className="object-contain"
                  priority={true}
                />
              </div>
              <span className="text-accent text-xl font-bold">Card Rummy</span>
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-accent p-1"
              aria-label="Close menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-8 h-8"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col p-4">
            <Link 
              href="/" 
              className="text-white hover:text-accent py-2 text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/download-card-rummy" 
              className="text-white hover:text-accent py-2 text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Download
            </Link>
            <Link 
              href="/deposit-money-in-card-rummy" 
              className="text-white hover:text-accent py-2 text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Deposit Guide
            </Link>
            <Link 
              href="/withdraw-money-from-card-rummy" 
              className="text-white hover:text-accent py-2 text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Withdraw Guide
            </Link>
            <Link 
              href="/card-rummy-for-pc" 
              className="text-white hover:text-accent py-2 text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              PC Version
            </Link>
            <Link 
              href="/about-us" 
              className="text-white hover:text-accent py-2 text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/blog" 
              className="text-white hover:text-accent py-2 text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/contact-us" 
              className="text-white hover:text-accent py-2 text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}