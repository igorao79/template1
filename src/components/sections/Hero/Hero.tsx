"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheeseGLB } from '@/components/3d/CheeseGLB';
import styles from './Hero.module.scss';
import { useEffect, useState, useCallback } from 'react';
import { useAnimation } from '@/context/AnimationContext';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { loaderHidden, registerIntersection } = useAnimation();
  
  // Обработчик изменения видимости
  const handleInViewChange = useCallback((inView: boolean) => {
    registerIntersection('hero', inView);
  }, [registerIntersection]);
  
  // Создаем ref для отслеживания видимости секции
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1, // Элемент считается видимым, когда 10% его видно
    triggerOnce: true, // Анимация запускается только один раз
    onChange: handleInViewChange, // Используем onChange вместо useEffect
  });

  // Определяем, нужно ли показывать анимацию
  const shouldAnimate = loaderHidden && inView;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.hero} id="home" ref={sectionRef}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <motion.span 
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Коллекция Ремесленных Сыров
          </motion.span>
          
          <motion.h1 
            className={styles.hero__title}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Откройте для себя <span>Лучшее</span> Сырное Мастерство
          </motion.h1>
          
          <motion.p 
            className={styles.hero__description}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Откройте для себя нашу премиальную коллекцию сыров ручной работы, изготовленных по традиционным рецептам из ингредиентов высочайшего качества. От мягких и сливочных до выдержанных и сложных - наши ремесленные сыры поднимут ваш кулинарный опыт на новый уровень.
          </motion.p>
          
          <motion.div 
            className={styles.hero__buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="#products" className={styles['hero__button--primary']}>
              Наши Сыры
            </Link>
            <Link href="#process" className={styles['hero__button--secondary']}>
              Наш Процесс
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className={styles.hero__model}>
        {mounted && <CheeseGLB />}
      </div>
      
      <Link href="#about" className={styles.hero__scroll}>
        <span>Прокрутите вниз</span>
        <motion.div 
          className={styles['hero__scroll-icon']}
          animate={shouldAnimate ? { y: [0, 10, 0] } : { y: 0 }}
          transition={shouldAnimate ? { repeat: Infinity, duration: 1.5 } : { duration: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </Link>
    </section>
  );
};

export default Hero; 