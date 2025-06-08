"use client";

import { motion } from 'framer-motion';
import { FaCheese, FaLeaf, FaAward } from 'react-icons/fa';
import Image from 'next/image';
import styles from './Products.module.scss';
import { useCart, CartItem } from '@/context/CartContext';
import { useAnimation } from '@/context/AnimationContext';
import { useInView } from 'react-intersection-observer';
import { useCallback } from 'react';

const products = [
  {
    id: "1",
    name: 'Камамбер',
    description: 'Мягкий сыр с белой плесневой корочкой и нежной сливочной текстурой. Идеален для подачи с фруктами и вином.',
    image: './images/cheesecard/camembert.webp',
    price: 750,
    icon: <FaCheese size={24} />,
  },
  {
    id: "2",
    name: 'Пармезан',
    description: 'Твердый выдержанный сыр с насыщенным вкусом и зернистой текстурой. Отлично подходит для пасты и салатов.',
    image: './images/cheesecard/parmezan.webp',
    price: 950,
    icon: <FaAward size={24} />,
  },
  {
    id: "3",
    name: 'Горгонзола',
    description: 'Итальянский голубой сыр с характерным пикантным вкусом и кремовой текстурой. Идеален для соусов и ризотто.',
    image: './images/cheesecard/gorgonzola.webp',
    price: 820,
    icon: <FaLeaf size={24} />,
  },
];

const Products = () => {
  const { addToCart, openCart } = useCart();
  const { loaderHidden, registerIntersection } = useAnimation();
  
  // Обработчик изменения видимости
  const handleInViewChange = useCallback((inView: boolean) => {
    registerIntersection('products', inView);
  }, [registerIntersection]);
  
  // Создаем ref для отслеживания видимости секции
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1, // Элемент считается видимым, когда 10% его видно
    triggerOnce: true, // Анимация запускается только один раз
    onChange: handleInViewChange, // Используем onChange вместо useEffect
  });

  // Определяем, нужно ли показывать анимацию
  const shouldAnimate = loaderHidden && inView;

  // Функция для добавления товара в корзину
  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Добавляем товар в корзину через контекст
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    
    addToCart(cartItem);
    openCart();
  };

  return (
    <section className={styles.products} id="products" ref={sectionRef}>
      <div className="container">
        <motion.div 
          className={styles.products__header}
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.products__title}>Наши Сыры</h2>
          <p className={styles.products__subtitle}>
            Изысканная коллекция ремесленных сыров, созданных с любовью и мастерством
          </p>
        </motion.div>

        <div className={styles.products__grid}>
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              className={styles.products__item}
              initial={{ opacity: 0, y: 20 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.products__image}>
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={300}
                  height={300}
                  quality={90}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className={styles.products__content}>
                <div className={styles.products__icon}>
                  {product.icon}
                </div>
                <h3 className={styles.products__name}>{product.name}</h3>
                <p className={styles.products__description}>{product.description}</p>
                <div className={styles.products__footer}>
                  <span className={styles.products__price}>{product.price} ₽</span>
                  <button 
                    className={styles.products__button} 
                    data-product={product.name}
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className={styles.products__cta}
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#contact" className={styles.products__cta_button}>
            Посмотреть все сыры
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Products; 