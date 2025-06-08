"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Header.module.scss';
import { FaCheese, FaTimes, FaBars } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import CartButton from '@/components/ui/CartButton';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    // Проверяем начальное положение скролла при загрузке страницы
    const initialScroll = window.scrollY > 50;
    setIsScrolled(initialScroll);
    
    // Определяем активный раздел на основе начальной позиции скролла
    const updateActiveSection = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        
        if (sectionTop <= 100 && sectionId) {
          currentSection = sectionId;
        }
      });
      
      setActiveSection(currentSection);
    };
    
    // Вызываем функцию определения активного раздела сразу после загрузки
    updateActiveSection();

    const handleScroll = () => {
      // Обновляем состояние скролла
      setIsScrolled(window.scrollY > 50);
      
      // Определяем активный раздел на основе позиции скролла
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (sectionId: string) => {
    return activeSection === sectionId;
  };

  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '#about', label: 'О нас' },
    { href: '#products', label: 'Наши сыры' },
    { href: '#process', label: 'Процесс' },
    { href: '#contact', label: 'Контакты' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''}`}>
      <div className={`container ${styles.header__container}`}>
        <Link href="/" className={styles.header__logo}>
          <motion.div 
            className={styles['header__logo-image']}
            initial={{ rotate: 0 }}
            animate={{ rotate: isScrolled ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheese size={32} color="#F5CB5C" />
          </motion.div>
          <span className={styles['header__logo-text']}>СырАрт</span>
        </Link>

        <nav className={styles.header__nav}>
          <Link 
            href="#home" 
            className={`${styles.header__link} ${isActive('home') ? styles['header__link--active'] : ''}`}
          >
            Главная
          </Link>
          <Link 
            href="#about" 
            className={`${styles.header__link} ${isActive('about') ? styles['header__link--active'] : ''}`}
          >
            О нас
          </Link>
          <Link 
            href="#products" 
            className={`${styles.header__link} ${isActive('products') ? styles['header__link--active'] : ''}`}
          >
            Продукты
          </Link>
          <Link 
            href="#process" 
            className={`${styles.header__link} ${isActive('process') ? styles['header__link--active'] : ''}`}
          >
            Процесс
          </Link>
          <Link 
            href="#contact" 
            className={`${styles.header__link} ${isActive('contact') ? styles['header__link--active'] : ''}`}
          >
            Контакты
          </Link>
        </nav>

        <div className={styles.header__actions}>
          <div className={styles.header__cart}>
            <CartButton />
          </div>
          
          <Link href="#contact" className={`${styles.header__cta} ${styles.header__cta_desktop}`}>
            Заказать сейчас
          </Link>
          
          <button 
            className={styles.header__mobile_button}
            onClick={toggleMobileMenu}
            aria-label="Открыть мобильное меню"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      <div className={`${styles['mobile-menu']} ${isMobileMenuOpen ? styles['mobile-menu--open'] : ''}`}>
        <button 
          className={styles['mobile-menu__close']}
          onClick={toggleMobileMenu}
          aria-label="Закрыть мобильное меню"
        >
          <FaTimes size={24} />
        </button>

        <nav className={styles['mobile-menu__nav']}>
          <Link 
            href="#home" 
            className={`${styles['mobile-menu__link']} ${isActive('home') ? styles['mobile-menu__link--active'] : ''}`}
            onClick={toggleMobileMenu}
          >
            Главная
          </Link>
          <Link 
            href="#about" 
            className={`${styles['mobile-menu__link']} ${isActive('about') ? styles['mobile-menu__link--active'] : ''}`}
            onClick={toggleMobileMenu}
          >
            О нас
          </Link>
          <Link 
            href="#products" 
            className={`${styles['mobile-menu__link']} ${isActive('products') ? styles['mobile-menu__link--active'] : ''}`}
            onClick={toggleMobileMenu}
          >
            Продукты
          </Link>
          <Link 
            href="#process" 
            className={`${styles['mobile-menu__link']} ${isActive('process') ? styles['mobile-menu__link--active'] : ''}`}
            onClick={toggleMobileMenu}
          >
            Процесс
          </Link>
          <Link 
            href="#contact" 
            className={`${styles['mobile-menu__link']} ${isActive('contact') ? styles['mobile-menu__link--active'] : ''}`}
            onClick={toggleMobileMenu}
          >
            Контакты
          </Link>
        </nav>

        <div className={styles['mobile-menu__cart']}>
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header; 