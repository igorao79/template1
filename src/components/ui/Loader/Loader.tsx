"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.scss';
import { useAnimation } from '@/context/AnimationContext';

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(isLoading);
  
  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Задержка для анимации исчезновения
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`${styles.loader} loader-container`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className={styles.loader__container}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.loader__circle}></div>
            <div className={styles.loader__ring1}></div>
            <div className={styles.loader__ring2}></div>
            <div className={styles.loader__ring3}></div>
            <div className={styles.loader__ring4}></div>
            
            <motion.p 
              className={styles.loader__text}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              Загрузка...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader; 