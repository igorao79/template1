"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTelegram } from 'react-icons/fa';
import styles from './Contact.module.scss';
import SuccessModal from '@/components/ui/SuccessModal';
import { useAnimation } from '@/context/AnimationContext';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loaderHidden, registerIntersection } = useAnimation();
  
  // Обработчик изменения видимости
  const handleInViewChange = useCallback((inView: boolean) => {
    registerIntersection('contact', inView);
  }, [registerIntersection]);
  
  // Создаем ref для отслеживания видимости секции
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1, // Элемент считается видимым, когда 10% его видно
    triggerOnce: true, // Анимация запускается только один раз
    onChange: handleInViewChange, // Используем onChange вместо useEffect
  });

  // Определяем, нужно ли показывать анимацию
  const shouldAnimate = loaderHidden && inView;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
    
    // Открываем модальное окно вместо alert
    setIsModalOpen(true);
    
    // Очищаем форму
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Адрес',
      content: 'ул. Сырная, 123, Москва, Россия',
    },
    {
      icon: <FaPhone />,
      title: 'Телефон',
      content: '+7 (999) 123-45-67',
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'info@syrart.ru',
    },
    {
      icon: <FaClock />,
      title: 'Режим работы',
      content: 'Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 16:00',
    },
  ];

  const socialLinks = [
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaFacebook />, url: 'https://facebook.com' },
    { icon: <FaTelegram />, url: 'https://t.me' },
  ];

  return (
    <>
      <section className={styles.contact} id="contact" ref={sectionRef}>
        <div className="container">
          <motion.div 
            className={styles.contact__header}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.contact__title}>Связаться с нами</h2>
            <p className={styles.contact__subtitle}>
              У вас есть вопросы или вы хотите сделать заказ? Свяжитесь с нами любым удобным способом
            </p>
          </motion.div>

          <div className={styles.contact__container}>
            <motion.div 
              className={styles.contact__info}
              initial={{ opacity: 0, x: -20 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.contact__info_list}>
                {contactInfo.map((item, index) => (
                  <div key={index} className={styles.contact__info_item}>
                    <div className={styles.contact__info_icon}>
                      {item.icon}
                    </div>
                    <div className={styles.contact__info_content}>
                      <h3 className={styles.contact__info_title}>{item.title}</h3>
                      <p className={styles.contact__info_text}>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.contact__social}>
                <h3 className={styles.contact__social_title}>Мы в соцсетях</h3>
                <div className={styles.contact__social_links}>
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index} 
                      href={link.url} 
                      className={styles.contact__social_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.contact__form_container}
              initial={{ opacity: 0, x: 20 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <form className={styles.contact__form} onSubmit={handleSubmit}>
                <div className={styles.contact__form_group}>
                  <label htmlFor="name" className={styles.contact__form_label}>Имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.contact__form_input}
                    required
                    placeholder="Ваше имя"
                  />
                </div>

                <div className={styles.contact__form_row}>
                  <div className={styles.contact__form_group}>
                    <label htmlFor="email" className={styles.contact__form_label}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.contact__form_input}
                      required
                      placeholder="Ваш email"
                    />
                  </div>

                  <div className={styles.contact__form_group}>
                    <label htmlFor="phone" className={styles.contact__form_label}>Телефон</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.contact__form_input}
                      placeholder="Ваш телефон"
                    />
                  </div>
                </div>

                <div className={styles.contact__form_group}>
                  <label htmlFor="message" className={styles.contact__form_label}>Сообщение</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.contact__form_textarea}
                    required
                    placeholder="Ваше сообщение"
                    rows={5}
                  />
                </div>

                <button type="submit" className={styles.contact__form_button}>
                  Отправить сообщение
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      <SuccessModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Спасибо!"
        message="Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время."
        lottieFile="/images/cheeseform.lottie"
      />
    </>
  );
};

export default Contact; 