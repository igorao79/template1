"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './not-found.module.scss';

// Базовый путь для GitHub Pages
const basePath = process.env.NODE_ENV === 'production' ? '/template1' : '';

// Define a type for the hole properties
type Hole = {
  top: string;
  left: string;
  width: string;
  height: string;
  animationDelay: string;
};

export default function NotFound() {
  // State for storing the randomly generated holes
  const [holes, setHoles] = useState<Hole[]>([]);
  
  // Добавляем эффект для анимации сыра
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cheese = document.querySelector(`.${styles.notFound__cheese}`);
      if (!cheese) return;
      
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      (cheese as HTMLElement).style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Generate random holes only on the client side
  useEffect(() => {
    const generatedHoles = [...Array(10)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 20 + 5}px`,
      height: `${Math.random() * 20 + 5}px`,
      animationDelay: `${Math.random() * 2}s`
    }));
    
    setHoles(generatedHoles);
  }, []);
  
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__container}>
        <motion.div 
          className={styles.notFound__cheese}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.2 
          }}
        >
          <DotLottieReact
            src={`${basePath}/images/cheeseform.lottie`}
            autoplay
            loop
          />
        </motion.div>
        
        <motion.h1 
          className={styles.notFound__title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className={styles.notFound__subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Ой! Кажется, сыр закончился...
        </motion.h2>
        
        <motion.p 
          className={styles.notFound__text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Страница, которую вы ищете, исчезла как кусочек хорошего сыра на праздничном столе.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/" className={styles.notFound__button}>
            Вернуться на главную
          </Link>
        </motion.div>
        
        <motion.div 
          className={styles.notFound__holes}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {holes.map((hole, i) => (
            <div 
              key={i} 
              className={styles.notFound__hole} 
              style={hole}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
} 