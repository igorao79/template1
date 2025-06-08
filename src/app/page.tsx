"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';
import { useAnimation } from '@/context/AnimationContext';

export default function Home() {
  const { loaderHidden } = useAnimation();
  const [mounted, setMounted] = useState(false);
  
  // Устанавливаем флаг mounted после монтирования компонента
  useEffect(() => {
    setMounted(true);
    
    // Восстанавливаем позицию скролла
    if (typeof window !== 'undefined') {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition));
      }
    }
    
    // Сохраняем позицию скролла при закрытии страницы
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  
  return (
    <main>
      {mounted && (
        <>
          <Hero />
          <About />
          <Products />
          <Process />
          <Contact />
        </>
      )}
    </main>
  );
}
