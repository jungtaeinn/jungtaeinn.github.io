import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ScrollToTop from '@/components/ui/scroll-to-top';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * 사이트 기본 메타데이터 설정
 * @description SEO 최적화를 위한 메타데이터 구성
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://jungtaeinn.github.io'),
  title: {
    default: 'jungtaeinn.github.io',
    template: '%s | jungtaeinn.github.io',
  },
  description: '개발자 정태인의 블로그입니다. 개발 경험과 학습 내용을 공유합니다.',
  keywords: ['개발자', '블로그', '프로그래밍', 'Frontend', 'Engineer', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
  authors: [{ name: '정태인', url: 'https://github.com/jungtaeinn' }],
  creator: '정태인',
  publisher: '정태인',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://jungtaeinn.github.io',
    title: 'jungtaeinn.github.io',
    description: '개발자 정태인의 블로그입니다. 개발 경험과 학습 내용을 공유합니다.',
    siteName: 'jungtaeinn.github.io',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'jungtaeinn.github.io',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jungtaeinn.github.io',
    description: '개발자 정태인의 블로그입니다. 개발 경험과 학습 내용을 공유합니다.',
    images: ['/images/twitter-image.jpg'],
    creator: '@jungtaeinn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '7JnPO5Pz1PrAmmmfk2D3Z06Apyn7G7GcvKJw9Q1bNIk',
  },
  other: {
    'google-adsense-account': 'ca-pub-2553484543757947',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'jungtaeinn.github.io',
    'msapplication-TileImage': '/images/profile.png',
    'msapplication-TileColor': '#0f172a',
    'theme-color': '#0f172a',
  },
  alternates: {
    canonical: 'https://jungtaeinn.github.io',
  },
  icons: {
    icon: [
      { url: '/images/profile.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/profile.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/profile.png',
    apple: [
      { url: '/images/profile.png', sizes: '180x180', type: 'image/png' },
      { url: '/images/profile.png', sizes: '152x152', type: 'image/png' },
      { url: '/images/profile.png', sizes: '120x120', type: 'image/png' },
      { url: '/images/profile.png', sizes: '76x76', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'jungtaeinn.github.io',
    startupImage: '/images/profile.png',
  },
};

/**
 * 뷰포트 설정
 * @description 반응형 디자인을 위한 뷰포트 메타데이터
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative min-h-screen">
          <Header />
          <main className="pt-16 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
