'use client';
import { useLanguage } from '@/contexts/LanguageContext';

interface TranslatableListItemProps {
  translationKey: string;
  className?: string;
}

export default function TranslatableListItem({ translationKey, className }: TranslatableListItemProps) {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';
  
  return (
    <li 
      className={className}
      style={isUrdu ? { fontFamily: 'system-ui', direction: 'rtl', textAlign: 'right' } : {}}
      dangerouslySetInnerHTML={{ __html: t(translationKey) }}
    />
  );
}
