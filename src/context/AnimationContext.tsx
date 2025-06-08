"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AnimationContextType {
  loaderHidden: boolean;
  sectionsInView: Record<string, boolean>;
  registerIntersection: (sectionId: string, inView: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [sectionsInView, setSectionsInView] = useState<Record<string, boolean>>({});

  // Скрываем лоадер после загрузки страницы
  useEffect(() => {
    // Сокращаем время ожидания для лоадера
    const timer = setTimeout(() => {
      setLoaderHidden(true);
    }, 1500); // Уменьшаем время до 1.5 секунд для лучшего UX

    return () => clearTimeout(timer);
  }, []);

  // Функция для регистрации видимости секций
  const registerIntersection = (sectionId: string, inView: boolean) => {
    setSectionsInView(prev => ({
      ...prev,
      [sectionId]: inView
    }));
  };

  return (
    <AnimationContext.Provider 
      value={{ 
        loaderHidden, 
        sectionsInView,
        registerIntersection
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