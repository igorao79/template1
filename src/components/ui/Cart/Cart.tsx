"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaArrowRight } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import styles from './Cart.module.scss';

const Cart = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    totalPrice, 
    updateQuantity, 
    removeFromCart,
    totalItems,
    openCheckout
  } = useCart();
  
  // Закрытие корзины при нажатии Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isCartOpen, closeCart]);

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

  if (!isCartOpen) return null;

  return (
    <div className={styles.cart__overlay} onClick={closeCart}>
      <div 
        className={styles.cart__modal}
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
                  onClick={openCheckout}
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
      </div>
    </div>
  );
};

export default Cart; 