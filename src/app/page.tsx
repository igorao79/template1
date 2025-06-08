"use client";

import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';

export default function Home() {
  // Обрабатываем хеш в URL при загрузке страницы
  useEffect(() => {
    // Функция для обработки хеша в URL
    const handleHash = () => {
      // Получаем хеш из URL
      const hash = window.location.hash.replace('#', '');
      
      if (hash) {
        // Даем время для рендеринга компонентов
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            // Прокручиваем к элементу
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Если хеша нет, восстанавливаем сохраненную позицию скролла
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
          window.scrollTo(0, parseInt(savedScrollPosition));
        }
      }
    };
    
    // Вызываем обработку хеша после монтирования
    handleHash();
    
    // Обрабатываем изменения хеша
    window.addEventListener('hashchange', handleHash);
    
    // Сохраняем позицию скролла при закрытии страницы
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Process />
      <Contact />
    </main>
  );
}
