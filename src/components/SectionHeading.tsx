'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface SectionHeadingProps {
  translationKey: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
}

export default function SectionHeading({ translationKey, className = '', tag = 'h2' }: SectionHeadingProps) {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';
  
  const Tag = tag;
  const style = isUrdu ? { fontFamily: 'system-ui', direction: 'rtl' as const, textAlign: 'right' as const } : {};
  
  return (
    <Tag className={className} style={style}>
      {t(translationKey)}
    </Tag>
  );
}
