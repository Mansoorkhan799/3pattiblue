import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - 3Patti Blue | Your Privacy Matters',
  description: 'Read our privacy policy to understand how 3Patti Blue collects, uses, and protects your personal information. We are committed to your data security.',
  keywords: ['3Patti Blue privacy policy', 'privacy', 'data protection', 'user privacy', 'data security'],
  openGraph: {
    title: 'Privacy Policy - 3Patti Blue',
    description: 'Learn how 3Patti Blue protects your personal information and data.',
    url: 'https://3patiblueapp.com.pk/privacy',
    siteName: '3Patti Blue',
    type: 'website',
  },
  alternates: {
    canonical: 'https://3patiblueapp.com.pk/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Privacy Policy</h1>
            <p className="text-lg text-gray-400">Last Updated: January 3, 2026</p>
          </div>
          
          <div className="bg-secondary rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              <div className="bg-[#0A1029] border-l-4 border-accent rounded-r-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Introduction</h2>
                <p className="text-gray-300 mb-4">
                  <Link href="/" className="text-accent hover:underline font-semibold">3Patti Blue</Link> ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website at <a href="https://www.3patiblueapp.com.pk" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">www.3patiblueapp.com.pk</a> (collectively, the "Service").
              </p>
                <p className="text-gray-300">
                Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
              </p>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Information We Collect</h2>
              
              <div className="bg-[#0A1029] rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4 text-accent">Personal Data</h3>
                <p className="text-gray-300 mb-4">
                When you use our Service, we may collect personally identifiable information, such as:
              </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Mobile phone number (for account registration)</li>
                  <li>Email address (optional)</li>
                <li>Device information (model, operating system, unique device identifiers)</li>
                  <li>IP address and location data</li>
                  <li>JazzCash/EasyPaisa account details for transactions</li>
                  <li>Transaction history and payment information</li>
                  <li>Gameplay data and statistics</li>
              </ul>
              </div>
              
              <div className="bg-[#0A1029] rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-accent">Usage Data</h3>
                <p className="text-gray-300 mb-4">
                We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include:
              </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Games played (Teen Patti, Rummy, Dragon vs Tiger, etc.) and time spent</li>
                  <li>Deposits and withdrawals through JazzCash/EasyPaisa</li>
                  <li>Bonus and rewards claimed</li>
                  <li>Features accessed within the app</li>
                  <li>Performance data and crash reports</li>
                  <li>Referral activities</li>
              </ul>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">How We Use Your Information</h2>
              <div className="bg-[#0A1029] rounded-xl p-6 mb-8">
                <p className="text-gray-300 mb-4">
                We use the collected data for various purposes:
              </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>To provide and maintain our 3Patti Blue gaming Service</li>
                  <li>To verify your identity and prevent fraud</li>
                  <li>To process deposits and withdrawals through JazzCash and EasyPaisa</li>
                  <li>To notify you about changes, updates, or new features</li>
                  <li>To allow you to participate in games and tournaments</li>
                  <li>To provide customer support via live chat, WhatsApp, or email</li>
                  <li>To send you daily bonus notifications and promotional offers</li>
                  <li>To track referral rewards and commission payments</li>
                  <li>To monitor gameplay for fair play and security</li>
                  <li>To comply with legal obligations and regulations</li>
                </ul>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Payment Information Security</h2>
              <div className="bg-[#0A1029] rounded-xl p-6 mb-8">
                <p className="text-gray-300 mb-4">
                  Your payment security is our top priority. When you use JazzCash or EasyPaisa for deposits and withdrawals:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>We use encrypted connections to protect your financial data</li>
                  <li>Your mobile wallet PIN is never stored on our servers</li>
                  <li>All transactions are processed through secure payment gateways</li>
                  <li>We maintain detailed transaction logs for your security and reference</li>
                  <li>Your account number is encrypted and stored securely</li>
              </ul>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Disclosure of Data</h2>
              
              <div className="bg-[#0A1029] rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4 text-accent">Legal Requirements</h3>
                <p className="text-gray-300">
                  We may disclose your Personal Data if required to do so by law or in response to valid requests by public authorities in Pakistan (e.g., a court or a government agency).
              </p>
              </div>
              
              <div className="bg-[#0A1029] rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-accent">Third-Party Services</h3>
                <p className="text-gray-300 mb-4">
                  We may share limited data with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Payment processors (JazzCash, EasyPaisa) for transaction processing</li>
                  <li>Analytics services to improve our app performance</li>
                  <li>Customer support tools to assist you better</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  We ensure all third parties comply with strict data protection standards.
              </p>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Data Security</h2>
              <div className="bg-[#0A1029] rounded-xl p-6 mb-8">
                <p className="text-gray-300 mb-4">
                  The security of your data is important to us. We implement various security measures including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure servers with firewall protection</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication systems</li>
                  <li>Data backup and recovery procedures</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your Personal Data, we cannot guarantee absolute security.
              </p>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Your Data Protection Rights</h2>
              <div className="bg-[#0A1029] rounded-xl p-6 mb-8">
                <p className="text-gray-300 mb-4">
                  You have the following rights regarding your personal data:
              </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li><strong className="text-white">Right to Access:</strong> Request a copy of your personal data</li>
                  <li><strong className="text-white">Right to Rectification:</strong> Correct inaccurate or incomplete information</li>
                  <li><strong className="text-white">Right to Erasure:</strong> Request deletion of your account and data</li>
                  <li><strong className="text-white">Right to Object:</strong> Object to certain data processing activities</li>
                  <li><strong className="text-white">Right to Data Portability:</strong> Receive your data in a structured format</li>
                  <li><strong className="text-white">Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
              </ul>
                <p className="text-gray-300 mt-4">
                  To exercise any of these rights, please contact us at <a href="mailto:support@3patiblueapp.com.pk" className="text-accent hover:underline">support@3patiblueapp.com.pk</a>
              </p>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Age Restriction</h2>
              <div className="bg-red-900/20 border-l-4 border-red-500 rounded-r-lg p-6 mb-8">
                <p className="text-gray-300 mb-4">
                  <strong className="text-white">Important:</strong> 3Patti Blue is intended only for users who are 18 years of age or older. We do not knowingly collect personally identifiable information from anyone under 18 years of age.
                </p>
                <p className="text-gray-300">
                  If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us immediately. If we become aware that we have collected Personal Data from users under 18 without verification of parental consent, we will take steps to remove that information from our servers.
              </p>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Cookies and Tracking</h2>
              <div className="bg-[#0A1029] rounded-xl p-6 mb-8">
                <p className="text-gray-300 mb-4">
                  We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
                </p>
                <p className="text-gray-300">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some features of our Service.
                </p>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Changes to This Privacy Policy</h2>
              <div className="bg-[#0A1029] rounded-xl p-6 mb-8">
                <p className="text-gray-300 mb-4">
                  We may update our Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Posting the new Privacy Policy on this page</li>
                  <li>Updating the "Last Updated" date at the top</li>
                  <li>Sending an in-app notification for significant changes</li>
                </ul>
                <p className="text-gray-300 mt-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
              </div>
              
              <h2 className="text-3xl font-bold mt-12 mb-6 text-white">Contact Us</h2>
              <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg p-6 mb-4">
                <p className="text-gray-300 mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <strong className="text-white mr-2">Email:</strong>
                    <a href="mailto:support@3patiblueapp.com.pk" className="text-accent hover:underline">support@3patiblueapp.com.pk</a>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                    </svg>
                    <strong className="text-white mr-2">Website:</strong>
                    <a href="https://www.3patiblueapp.com.pk" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">www.3patiblueapp.com.pk</a>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                    </svg>
                    <strong className="text-white mr-2">Support:</strong>
                    <Link href="/contact-us" className="text-accent hover:underline">Visit Contact Us page</Link>
                  </li>
              </ul>
              </div>
              
              <div className="bg-[#0A1029] rounded-xl p-6 mt-8 text-center">
                <p className="text-gray-400 text-sm mb-4">
                  By using 3Patti Blue, you consent to this Privacy Policy and agree to its terms.
                </p>
                <p className="text-gray-400 text-sm">
                  © 2026 3Patti Blue. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
