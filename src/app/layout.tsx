import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { AnimationProvider } from '@/context/AnimationContext';
import Cart from '@/components/ui/Cart';
import Checkout from '@/components/ui/Checkout';
import Loader from '@/components/ui/Loader';
import ClientLoader from '@/components/ui/ClientLoader';
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

// Определяем базовый путь для GitHub Pages
const basePath = process.env.NODE_ENV === 'production' ? '/template1' : '';

export const metadata: Metadata = {
  title: 'Cheese Shop - Лучший сыр от местных производителей',
  description: 'Магазин премиального сыра от местных производителей. Натуральные ингредиенты и традиционные рецепты.',
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' 
      ? 'https://igorao79.github.io/template1' 
      : 'http://localhost:3000'
  ),
  icons: {
    icon: `${basePath}/fav.ico`,
  },
};

// Добавляем предзагрузку 3D-модели
export const viewport = {
  themeColor: '#F5CB5C',
};

// Настройка сохранения позиции скролла
export const scrollRestoration = 'manual';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        {/* Предзагрузка важных ресурсов */}
        <link rel="preload" href={`${basePath}/images/loader.lottie`} as="fetch" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning={true}>
        <CartProvider>
          <AnimationProvider>
            <ClientLoader />
            <Header />
            <main>
              {children}
            </main>
            <Footer />
            <Cart />
            <Checkout />
          </AnimationProvider>
        </CartProvider>
      </body>
    </html>
  );
}
