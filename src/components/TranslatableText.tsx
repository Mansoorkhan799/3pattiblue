'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

interface TranslatableTextProps {
  translationKey: string;
  className?: string;
  as?: 'p' | 'span' | 'div' | 'li' | 'td' | 'th';
  style?: React.CSSProperties;
  children?: ReactNode;
}

export default function TranslatableText({ 
  translationKey, 
  className = '', 
  as: Tag = 'p',
  style,
  children 
}: TranslatableTextProps) {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';
  
  const combinedStyle = isUrdu 
    ? { ...style, fontFamily: 'system-ui', direction: 'rtl' as const, textAlign: 'right' as const }
    : style;
  
  const content = t(translationKey) || children;
  
  return (
    <Tag className={className} style={combinedStyle}>
      {content}
    </Tag>
  );
}
