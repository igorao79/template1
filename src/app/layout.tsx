import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { AnimationProvider } from '@/context/AnimationContext';
import Cart from '@/components/ui/Cart';
import Checkout from '@/components/ui/Checkout';
import ClientLoader from '@/components/ui/ClientLoader';
import PageLoaderManager from '@/components/ui/PageLoaderManager';
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
// 'auto' вместо 'manual', чтобы браузер автоматически восстанавливал позицию
export const scrollRestoration = 'auto';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${poppins.variable} ${playfair.variable} loading`} style={{ scrollBehavior: 'smooth' }}>
      <head>
        {/* Предзагрузка важных ресурсов */}
        <link rel="preload" href={`${basePath}/images/loader.lottie`} as="fetch" crossOrigin="anonymous" />
        
        {/* Предотвращаем мигание при загрузке */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            background-color: #F9F9F9 !important;
          }
        `}} />
      </head>
      <body suppressHydrationWarning={true} id="top" className="loading">
        <CartProvider>
          <AnimationProvider>
            <ClientLoader />
            <Header />
            <main>
              <PageLoaderManager>{children}</PageLoaderManager>
            </main>
            <Footer />
            <Cart />
            <Checkout />
          </AnimationProvider>
        </CartProvider>

        {/* Скрипт для предотвращения дергания скролла и сохранения хэша */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Получаем элементы HTML и Body
              var htmlElement = document.documentElement;
              var bodyElement = document.body;
              
              // Предварительно сохраняем позицию скролла перед перезагрузкой
              window.addEventListener('beforeunload', function() {
                sessionStorage.setItem('lastHash', window.location.hash);
                sessionStorage.setItem('scrollPosition', window.scrollY.toString());
              });
              
              // Обработка хэша и позиции скролла
              function handlePageLoad() {
                var lastHash = sessionStorage.getItem('lastHash');
                var scrollPosition = sessionStorage.getItem('scrollPosition');
                
                // Если есть хэш в URL, используем его
                if (window.location.hash) {
                  // Скроллим к элементу по хэшу с небольшой задержкой
                  setTimeout(function() {
                    var targetElement = document.getElementById(window.location.hash.substring(1));
                    if (targetElement) {
                      // Сначала позиционируем без анимации
                      window.scrollTo(0, targetElement.offsetTop - 80);
                    }
                    
                    // Затем плавно снимаем классы загрузки
                    setTimeout(function() {
                      // Плавно показываем контент
                      document.querySelectorAll('main, header, footer').forEach(function(el) {
                        el.style.transition = 'opacity 0.5s ease';
                        el.style.opacity = '1';
                      });
                      
                      // Снимаем классы загрузки через небольшую задержку
                      setTimeout(function() {
                        bodyElement.classList.remove('loading');
                        htmlElement.classList.remove('loading');
                      }, 300);
                    }, 100);
                  }, 0);
                }
                // Если нет хэша, но есть сохраненный хэш, восстанавливаем его
                else if (lastHash && lastHash !== '#') {
                  window.location.hash = lastHash;
                  // Обработка будет продолжена в следующем условии после установки хэша
                }
                // Если нет хэша, восстанавливаем позицию скролла
                else if (scrollPosition) {
                  // Восстанавливаем позицию без анимации
                  window.scrollTo(0, parseInt(scrollPosition));
                  
                  // Плавно снимаем классы загрузки
                  setTimeout(function() {
                    // Плавно показываем контент
                    document.querySelectorAll('main, header, footer').forEach(function(el) {
                      el.style.transition = 'opacity 0.5s ease';
                      el.style.opacity = '1';
                    });
                    
                    // Снимаем классы загрузки через небольшую задержку
                    setTimeout(function() {
                      bodyElement.classList.remove('loading');
                      htmlElement.classList.remove('loading');
                    }, 300);
                  }, 100);
                } else {
                  // Если нет данных, просто плавно снимаем классы загрузки
                  setTimeout(function() {
                    // Плавно показываем контент
                    document.querySelectorAll('main, header, footer').forEach(function(el) {
                      el.style.transition = 'opacity 0.5s ease';
                      el.style.opacity = '1';
                    });
                    
                    // Снимаем классы загрузки через небольшую задержку
                    setTimeout(function() {
                      bodyElement.classList.remove('loading');
                      htmlElement.classList.remove('loading');
                    }, 300);
                  }, 100);
                }
              }
              
              // Связываем с завершением загрузки лоадера
              window.addEventListener('loaderHidden', function() {
                handlePageLoad();
              });
              
              // Если лоадер не появится через 3 секунды, все равно показываем контент
              setTimeout(function() {
                if (!window.loaderHidden) {
                  // Плавно показываем контент
                  document.querySelectorAll('main, header, footer').forEach(function(el) {
                    el.style.transition = 'opacity 0.5s ease';
                    el.style.opacity = '1';
                  });
                  
                  // Снимаем классы загрузки
                  bodyElement.classList.remove('loading');
                  htmlElement.classList.remove('loading');
                }
              }, 3000);
            })();
          `
        }} />
      </body>
    </html>
  );
}
