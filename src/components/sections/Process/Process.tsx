"use client";

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaFlask, FaClock, FaCheck, FaWineBottle } from 'react-icons/fa';
import { GiMilkCarton } from 'react-icons/gi';
import styles from './Process.module.scss';
import { useAnimation } from '@/context/AnimationContext';
import { useInView } from 'react-intersection-observer';

const processSteps = [
  {
    id: 1,
    title: 'Отбор молока',
    description: 'Мы используем только свежее молоко высшего качества от местных фермеров, которые заботятся о своих животных.',
    icon: <GiMilkCarton size={32} />,
  },
  {
    id: 2,
    title: 'Ферментация',
    description: 'Добавление специальных культур и ферментов для запуска процесса створаживания молока.',
    icon: <FaFlask size={32} />,
  },
  {
    id: 3,
    title: 'Созревание',
    description: 'Сыр выдерживается в специальных условиях для развития уникального вкуса и аромата.',
    icon: <FaClock size={32} />,
  },
  {
    id: 4,
    title: 'Контроль качества',
    description: 'Каждая партия сыра проходит строгий контроль качества перед тем, как попасть к вам на стол.',
    icon: <FaCheck size={32} />,
  },
];

const Process = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loaderHidden, registerIntersection } = useAnimation();
  
  // Обработчик изменения видимости
  const handleInViewChange = useCallback((inView: boolean) => {
    registerIntersection('process', inView);
  }, [registerIntersection]);
  
  // Создаем ref для отслеживания видимости секции
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1, // Элемент считается видимым, когда 10% его видно
    triggerOnce: true, // Анимация запускается только один раз
    onChange: handleInViewChange, // Используем onChange вместо useEffect
  });

  // Определяем, нужно ли показывать анимацию
  const shouldAnimate = loaderHidden && inView;

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Video play failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <section className={styles.process} id="process" ref={sectionRef}>
      <div className="container">
        <motion.div 
          className={styles.process__header}
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.process__title}>Наш Процесс</h2>
          <p className={styles.process__subtitle}>
            Узнайте, как мы создаем наши великолепные сыры, сочетая традиции и инновации
          </p>
        </motion.div>

        <div className={styles.process__timeline}>
          {processSteps.map((step, index) => (
            <motion.div 
              key={step.id}
              className={styles.process__step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.process__icon}>
                {step.icon}
                <div className={styles.process__number}>{step.id}</div>
              </div>
              <div className={styles.process__content}>
                <h3 className={styles.process__step_title}>{step.title}</h3>
                <p className={styles.process__description}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.process__video}
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.process__video_container}>
            <video 
              ref={videoRef}
              className={styles.process__video_player}
              poster="./images/cheesecard/about.webp"
              preload="metadata"
              playsInline
              onEnded={handleVideoEnd}
              controls={isPlaying}
            >
              <source src="/images/making.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <button 
              className={`${styles.process__play_button} ${isPlaying ? styles.process__play_button_hidden : ''}`} 
              aria-label="Смотреть видео"
              onClick={toggleVideo}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            </button>
          </div>
          <p className={styles.process__video_caption}>
            Посмотрите, как мы делаем наш фирменный сыр
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process; 