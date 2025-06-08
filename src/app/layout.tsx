import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { AnimationProvider } from '@/context/AnimationContext';
import GlobalLoader from '@/components/ui/GlobalLoader';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'СырАрт - Премиальные сыры ручной работы',
  description: 'Откройте для себя коллекцию ремесленных сыров, созданных с любовью и мастерством',
  icons: {
    icon: '/fav.ico',
  },
};

// Добавляем предзагрузку 3D-модели
export const viewport = {
  themeColor: '#F5CB5C',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        {/* Предзагрузка важных ресурсов */}
        <link rel="preload" href="/images/loader.lottie" as="fetch" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning={true}>
        <CartProvider>
          <AnimationProvider>
            <GlobalLoader />
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </AnimationProvider>
        </CartProvider>
      </body>
    </html>
  );
}
