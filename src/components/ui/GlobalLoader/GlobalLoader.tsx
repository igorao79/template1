"use client";

import { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './GlobalLoader.module.scss';

// Определяем базовый путь для GitHub Pages
const basePath = process.env.NODE_ENV === 'production' ? '/template1' : '';

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lottieError, setLottieError] = useState(false);
  const [lottieData, setLottieData] = useState<string | null>(null);
  const [isLottieReady, setIsLottieReady] = useState(false);

  // Предзагрузка Lottie анимации через fetch
  useEffect(() => {
    const preloadLottie = async () => {
      try {
        const response = await fetch(`${basePath}/images/loader.lottie`);
        if (!response.ok) throw new Error('Failed to load animation');
        const data = await response.blob(); // Получаем данные как blob
        const objectUrl = URL.createObjectURL(data);
        setLottieData(objectUrl);
      } catch (error) {
        console.error('Error preloading Lottie:', error);
        setLottieError(true);
      }
    };

    preloadLottie();
  }, []);

  useEffect(() => {
    // Создаем глобальное событие для сигнализации о загрузке 3D модели
    const handleModelLoaded = () => {
      // Немедленно скрываем лоадер без задержки
      setIsLoading(false);
      // Отправляем событие о том, что загрузчик скрыт
      window.dispatchEvent(new Event('loader-hidden'));
    };
    
    window.addEventListener('model-loaded', handleModelLoaded);
    
    // Устанавливаем таймаут на случай, если событие не будет вызвано
    // Уменьшаем время ожидания до 600мс для более быстрого отображения
    const timeout = setTimeout(() => {
      setIsLoading(false);
      // Отправляем событие о том, что загрузчик скрыт
      window.dispatchEvent(new Event('loader-hidden'));
    }, 600);
    
    return () => {
      window.removeEventListener('model-loaded', handleModelLoaded);
      clearTimeout(timeout);
    };
  }, []);

  // Обработчик ошибки загрузки Lottie
  const handleLottieError = () => {
    console.error('Error loading Lottie animation');
    setLottieError(true);
  };

  // Обработчик успешной загрузки Lottie
  const handleLottieLoad = () => {
    setIsLottieReady(true);
  };

  return (
    <div 
      className={`${styles.loader} ${isLoading ? styles.visible : styles.hidden}`}
      aria-hidden={!isLoading}
    >
      <div className={styles.loaderContent}>
        {!lottieError ? (
          <>
            {/* Показываем фолбек пока Lottie не загрузилась */}
            {!isLottieReady && (
              <div className={styles.fallbackLoader}>
                <div className={styles.cheeseCircle}></div>
                <div className={styles.cheeseText}>Загрузка...</div>
              </div>
            )}
            <div style={{ opacity: isLottieReady ? 1 : 0, transition: 'opacity 0.3s' }}>
              <DotLottieReact
                src={lottieData || `${basePath}/images/loader.lottie`}
                autoplay
                loop
                onError={handleLottieError}
                onLoad={handleLottieLoad}
              />
            </div>
          </>
        ) : (
          <div className={styles.fallbackLoader}>
            <div className={styles.cheeseCircle}></div>
            <div className={styles.cheeseText}>Загрузка...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalLoader; 