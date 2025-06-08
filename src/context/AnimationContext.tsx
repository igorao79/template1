"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useRef, useCallback } from 'react';

interface AnimationContextType {
  loaderHidden: boolean;
  observedElements: Map<string, boolean>;
  registerIntersection: (id: string, isInView: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType>({
  loaderHidden: false,
  observedElements: new Map(),
  registerIntersection: () => {},
});

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [loaderHidden, setLoaderHidden] = useState(false);
  // Используем useRef вместо useState для хранения состояния видимости элементов
  // чтобы избежать бесконечного цикла обновлений
  const observedElementsRef = useRef<Map<string, boolean>>(new Map());
  
  // Мемоизируем функцию регистрации видимости, чтобы она не менялась при каждом рендере
  const registerIntersection = useCallback((id: string, isInView: boolean) => {
    observedElementsRef.current.set(id, isInView);
  }, []);

  useEffect(() => {
    // Слушаем событие скрытия загрузчика
    const handleLoaderHidden = () => {
      setLoaderHidden(true);
    };
    
    window.addEventListener('loader-hidden', handleLoaderHidden);
    
    // Если событие не сработает, включаем анимации через таймаут
    const timeout = setTimeout(() => {
      setLoaderHidden(true);
    }, 4000); // Чуть больше, чем таймаут загрузчика
    
    return () => {
      window.removeEventListener('loader-hidden', handleLoaderHidden);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimationContext.Provider value={{ 
      loaderHidden, 
      observedElements: observedElementsRef.current, 
      registerIntersection 
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContext; 