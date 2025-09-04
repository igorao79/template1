"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAnimation } from '@/context/AnimationContext';

interface PageLoaderManagerProps {
  children: React.ReactNode;
}

export default function PageLoaderManager({ children }: PageLoaderManagerProps) {
  const pathname = usePathname();
  const { hideLoader } = useAnimation();

  // Управляем лоадером и прокруткой при переходе на страницы политик
  useEffect(() => {
    if (pathname === '/privacy' || pathname === '/terms' || pathname === '/cookies') {
      // Прокручиваем страницу наверх с небольшой задержкой
      const scrollTimer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 300);

      // Скрываем лоадер
      const loaderTimer = setTimeout(() => {
        hideLoader();
      }, 800); // Небольшая задержка для плавного исчезновения

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(loaderTimer);
      };
    }
  }, [pathname, hideLoader]);

  return <>{children}</>;
}
