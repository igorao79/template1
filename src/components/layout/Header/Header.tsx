"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Header.module.scss';
import { FaCheese, FaTimes, FaBars } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import CartButton from '@/components/ui/CartButton';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Проверяем начальное положение скролла при загрузке страницы
    const initialScroll = window.scrollY > 50;
    setIsScrolled(initialScroll);
    
    // Проверяем хеш в URL при загрузке
    const initialHash = window.location.hash.replace('#', '') || 'home';
    setActiveSection(initialHash);
    
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
      
      // Обновляем URL с якорем текущего раздела, если он отличается от текущего
      if (currentSection !== 'home' && window.location.hash !== `#${currentSection}`) {
        window.history.replaceState(null, '', `#${currentSection}`);
      } else if (currentSection === 'home' && window.location.hash !== '') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };
    
    // Вызываем функцию определения активного раздела сразу после загрузки
    setTimeout(updateActiveSection, 200);

    const handleScroll = () => {
      // Обновляем состояние скролла
      setIsScrolled(window.scrollY > 50);
      
      // Определяем активный раздел на основе позиции скролла
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Проверяем хеш в URL при загрузке страницы
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const targetElement = document.getElementById(hash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(hash);
          }
        }, 500); // Задержка для корректной работы после загрузки страницы
      }
    }
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Если цель - home, обновляем URL без хеша
    if (targetId === 'home' || targetId === '') {
      window.history.pushState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      // Иначе скроллим к нужному разделу и обновляем URL с хешем
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.history.pushState(null, '', `#${targetId}`);
        
        // Сохраняем хеш в sessionStorage для восстановления при перезагрузке
        sessionStorage.setItem('lastHash', `#${targetId}`);
        
        // Плавная прокрутка к элементу
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
      }
    }
    
    // Закрываем мобильное меню если оно открыто
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (sectionId: string) => {
    return activeSection === sectionId;
  };

  const navLinks = [
    { href: '#home', id: 'home', label: 'Главная' },
    { href: '#about', id: 'about', label: 'О нас' },
    { href: '#products', id: 'products', label: 'Наши сыры' },
    { href: '#process', id: 'process', label: 'Процесс' },
    { href: '#contact', id: 'contact', label: 'Контакты' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''}`}>
      <div className={`container ${styles.header__container}`}>
        <a 
          href="#home"
          className={styles.header__logo}
          onClick={(e) => handleNavLinkClick(e, '#home')}
        >
          <motion.div 
            className={styles['header__logo-image']}
            initial={{ rotate: 0 }}
            animate={{ rotate: isScrolled ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheese size={32} color="#F5CB5C" />
          </motion.div>
          <span className={styles['header__logo-text']}>СырАрт</span>
        </a>

        <nav className={styles.header__nav}>
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href} 
              className={`${styles.header__link} ${isActive(link.id) ? styles['header__link--active'] : ''}`}
              onClick={(e) => handleNavLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.header__actions}>
          <div className={styles.header__cart}>
            <CartButton />
          </div>
          
          <a 
            href="#contact" 
            className={`${styles.header__cta} ${styles.header__cta_desktop}`}
            onClick={(e) => handleNavLinkClick(e, '#contact')}
          >
            Заказать сейчас
          </a>
          
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
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href} 
              className={`${styles['mobile-menu__link']} ${isActive(link.id) ? styles['mobile-menu__link--active'] : ''}`}
              onClick={(e) => handleNavLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles['mobile-menu__cart']}>
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header; 