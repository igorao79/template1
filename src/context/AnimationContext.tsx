"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AnimationContextType {
  loaderHidden: boolean;
  sectionsInView: Record<string, boolean>;
  registerIntersection: (sectionId: string, inView: boolean) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [sectionsInView, setSectionsInView] = useState<Record<string, boolean>>({});

  // Скрываем лоадер после загрузки страницы
  useEffect(() => {
    // Проверяем, не был ли лоадер уже скрыт ранее
    const wasLoaderHidden = typeof window !== 'undefined' && window.loaderHidden;

    if (wasLoaderHidden) {
      setLoaderHidden(true);
      return;
    }

    // Увеличиваем время ожидания для надежности
    const timer = setTimeout(() => {
      setLoaderHidden(true);
    }, 2000); // Увеличиваем до 2 секунд

    return () => clearTimeout(timer);
  }, []);

  // Функция для регистрации видимости секций
  const registerIntersection = (sectionId: string, inView: boolean) => {
    setSectionsInView(prev => ({
      ...prev,
      [sectionId]: inView
    }));
  };

  // Функции для ручного управления лоадером
  const showLoader = () => {
    setLoaderHidden(false);
  };

  const hideLoader = () => {
    setLoaderHidden(true);
  };

  return (
    <AnimationContext.Provider
      value={{
        loaderHidden,
        sectionsInView,
        registerIntersection,
        showLoader,
        hideLoader
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}; 