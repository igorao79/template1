"use client";

import { useAnimation } from '@/context/AnimationContext';
import Loader from './Loader';
import { useEffect } from 'react';

// Расширяем интерфейс Window для TypeScript
declare global {
  interface Window {
    loaderHidden?: boolean;
  }
}

export default function ClientLoader() {
  const { loaderHidden } = useAnimation();
  
  // Отправляем событие, когда лоадер скрывается
  useEffect(() => {
    if (loaderHidden) {
      // Устанавливаем глобальный флаг
      if (typeof window !== 'undefined') {
        window.loaderHidden = true;
        
        // Отправляем событие
        const event = new Event('loaderHidden');
        window.dispatchEvent(event);
      }
    }
  }, [loaderHidden]);
  
  return <Loader isLoading={!loaderHidden} />;
} 