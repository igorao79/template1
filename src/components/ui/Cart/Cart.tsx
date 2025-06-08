"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaArrowRight } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import styles from './Cart.module.scss';
import Checkout from '../Checkout';

const Cart = () => {
  const { 
    isOpen, 
    closeCart, 
    cartItems, 
    totalPrice, 
    updateQuantity, 
    removeFromCart,
    totalItems,
    openCart
  } = useCart();
  
  // Состояние для отслеживания, показывать ли оформление заказа
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Сбрасываем состояние checkout при закрытии корзины
  useEffect(() => {
    if (!isOpen) {
      setShowCheckout(false);
    }
  }, [isOpen]);
  
  // Обработчик перехода к оформлению заказа
  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };
  
  // Обработчик возврата к корзине
  const handleBackToCart = () => {
    setShowCheckout(false);
  };
  
  // Обработчик закрытия оформления заказа
  const handleCloseCheckout = () => {
    setShowCheckout(false);
    closeCart();
  };

  // Функция для изменения количества товара
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  // Функция для удаления товара из корзины
  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  return (
    <>
      {/* Кнопка корзины */}
      <button 
        className={styles.cart__button} 
        onClick={openCart}
        aria-label="Открыть корзину"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {totalItems > 0 && (
          <span className={styles.cart__count}>{totalItems}</span>
        )}
      </button>

      {/* Модальное окно корзины */}
      <AnimatePresence>
        {isOpen && !showCheckout && (
          <motion.div 
            className={styles.cart__overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          >
            <motion.div 
              className={styles.cart__modal}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.cart__header}>
                <h3 className={styles.cart__title}>Корзина</h3>
                <button 
                  className={styles.cart__close}
                  onClick={closeCart}
                  aria-label="Закрыть корзину"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div className={styles.cart__content}>
                {cartItems.length > 0 ? (
                  <>
                    <ul className={styles.cart__items}>
                      {cartItems.map(item => (
                        <li key={item.id} className={styles.cart__item}>
                          <div className={styles.cart__item_info}>
                            <h4 className={styles.cart__item_name}>{item.name}</h4>
                            <p className={styles.cart__item_price}>{item.price} ₽</p>
                          </div>
                          
                          <div className={styles.cart__item_actions}>
                            <div className={styles.cart__item_quantity}>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className={styles.cart__item_button}
                                aria-label="Уменьшить количество"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className={styles.cart__item_button}
                                aria-label="Увеличить количество"
                              >
                                +
                              </button>
                            </div>
                            
                            <button 
                              className={styles.cart__item_remove}
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label="Удалить товар"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className={styles.cart__footer}>
                      <div className={styles.cart__total}>
                        <span>Итого:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                      
                      <button 
                        className={styles.cart__checkout}
                        onClick={handleProceedToCheckout}
                      >
                        Оформить заказ <FaArrowRight size={14} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.cart__empty}>
                    <p>Ваша корзина пуста</p>
                    <p className={styles.cart__empty_message}>
                      Выберите сыр, чтобы добавить его в корзину
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Компонент оформления заказа */}
      <Checkout 
        isOpen={isOpen && showCheckout} 
        onClose={handleCloseCheckout}
      />
    </>
  );
};

export default Cart; 