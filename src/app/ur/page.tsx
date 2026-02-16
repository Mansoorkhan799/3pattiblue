// Urdu home: same content as home, URL reflects language (3patiblueapp.com.pk/ur)
import Home from '../page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'تین پتی بلیو APK ڈاؤن لوڈ | حقیقی تین پتی کھیلیں اور پیسے جیتیں 2026',
    template: '%s | 3Patti Blue'
  },
  description: 'تین پتی بلیو 2026 - پاکستان کا سب سے قابل اعتماد تین پتی گیمنگ پلیٹ فارم۔ 3Patti Blue APK ڈاؤن لوڈ کریں۔ حقیقی تین پتی، رمی، ڈریگن ٹائیگر کھیلیں اور حقیقی پیسے جیتیں۔ جاز کیش اور ایزی پیسہ سے فوری نکاسی۔ 10 لاکھ سے زیادہ تصدیق شدہ کھلاڑی!',
  openGraph: {
    title: 'تین پتی بلیو - پاکستان کا نمبر ون تین پتی ایپ | حقیقی پیسے جیتیں',
    description: 'تین پتی بلیو 2026 - 10 لاکھ سے زیادہ کھلاڑی۔ جاز کیش اور ایزی پیسہ سے فوری نکاسی۔ ابھی ڈاؤن لوڈ کریں اور 100 روپے بونس حاصل کریں!',
    url: 'https://3patiblueapp.com.pk/ur',
    locale: 'ur_PK',
    type: 'website'
  },
  alternates: {
    canonical: 'https://3patiblueapp.com.pk/ur',
    languages: {
      'en-PK': 'https://3patiblueapp.com.pk/',
      'ur-PK': 'https://3patiblueapp.com.pk/ur'
    }
  }
};

export default Home;
