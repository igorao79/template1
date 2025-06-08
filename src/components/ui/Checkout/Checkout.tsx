"use client";

import { useReducer, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useCart, CartItem } from '@/context/CartContext';
import styles from './Checkout.module.scss';

// Определяем базовый путь для GitHub Pages
const basePath = process.env.NODE_ENV === 'production' ? '/template1' : '';

// Типы состояний для редьюсера
type CheckoutState = {
  step: number;
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: 'card' | 'cash' | '';
  };
  isCompleted: boolean;
};

// Типы действий для редьюсера
type CheckoutAction = 
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_STEP', step: number }
  | { type: 'UPDATE_FIELD', field: string, value: string }
  | { type: 'COMPLETE_ORDER' }
  | { type: 'RESET' };

// Начальное состояние
const initialState: CheckoutState = {
  step: 1, // По умолчанию начинаем с шага 1 (первого шага)
  formData: {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
  },
  isCompleted: false,
};

// Редьюсер для управления состоянием оформления заказа
const checkoutReducer = (state: CheckoutState, action: CheckoutAction): CheckoutState => {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: Math.max(1, state.step - 1) };
    case 'SET_STEP':
      return { ...state, step: action.step };
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'COMPLETE_ORDER':
      return { ...state, isCompleted: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void; // Опциональный пропс для возврата к корзине
}

const Checkout = ({ isOpen, onClose, onBack }: CheckoutProps) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const { cartItems, totalPrice, clearCart } = useCart();
  
  // Сбрасываем состояние при закрытии
  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: 'RESET' });
    }
  }, [isOpen]);

  // Проверка валидности формы для текущего шага
  const isStepValid = () => {
    const { formData, step } = state;
    
    if (step === 1) {
      // Проверка обязательных полей на первом шаге
      return (
        formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.phone.trim() !== ''
      );
    }
    
    return true;
  };

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  };

  // Обработчик перехода к предыдущему шагу (возврат в корзину)
  const handlePrevStep = () => {
    if (onBack) {
      onBack();
    } else {
      onClose();
    }
  };

  // Обработчик завершения заказа
  const handleCompleteOrder = () => {
    dispatch({ type: 'COMPLETE_ORDER' });
    // Очищаем корзину
    clearCart();
  };

  // Обработчик закрытия с сбросом состояния
  const handleClose = () => {
    onClose();
  };

  // Варианты анимации для свайпа между шагами
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.checkout__overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div 
            className={styles.checkout__modal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              className={styles.checkout__close} 
              onClick={handleClose}
              aria-label="Закрыть"
            >
              <FaTimes size={18} />
            </button>

            {/* Заголовок модального окна */}
            <div className={styles.checkout__header}>
              <h3 className={styles.checkout__title}>
                {state.isCompleted 
                  ? 'Заказ оформлен' 
                  : 'Оформление заказа'}
              </h3>
              
              {/* Индикатор шагов */}
              {!state.isCompleted && (
                <div className={styles.checkout__steps}>
                  <div className={`${styles.checkout__step} ${styles.active}`}>1</div>
                  <div className={styles.checkout__step_line}></div>
                  <div className={`${styles.checkout__step} ${state.step >= 2 ? styles.active : ''}`}>2</div>
                  <div className={styles.checkout__step_line}></div>
                  <div className={`${styles.checkout__step} ${state.isCompleted ? styles.active : ''}`}>3</div>
                </div>
              )}
            </div>

            {/* Содержимое в зависимости от шага */}
            <div className={styles.checkout__content}>
              <AnimatePresence mode="wait" initial={false} custom={state.step}>
                {state.isCompleted ? (
                  // Шаг 3: Заказ успешно оформлен
                  <motion.div 
                    key="completed"
                    className={styles.checkout__completed}
                    custom={state.step}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.checkout__success_icon}>
                      <FaCheck size={40} />
                    </div>
                    <h4 className={styles.checkout__success_title}>Спасибо за покупку!</h4>
                    <p className={styles.checkout__success_message}>
                      Мы уже везем ваш сыр :)
                    </p>
                    <div className={styles.checkout__animation}>
                      <DotLottieReact
                        src={`${basePath}/images/cheeseform.lottie`}
                        autoplay
                        loop
                      />
                    </div>
                  </motion.div>
                ) : (
                  // Шаг 1: Ввод контактной информации
                  <motion.div 
                    key="contact"
                    className={styles.checkout__form}
                    custom={state.step}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.checkout__form_group}>
                      <label htmlFor="name" className={styles.checkout__form_label}>Имя*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={state.formData.name}
                        onChange={handleChange}
                        className={styles.checkout__form_input}
                        required
                        placeholder="Ваше имя"
                      />
                    </div>
                    
                    <div className={styles.checkout__form_row}>
                      <div className={styles.checkout__form_group}>
                        <label htmlFor="email" className={styles.checkout__form_label}>Email*</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={state.formData.email}
                          onChange={handleChange}
                          className={styles.checkout__form_input}
                          required
                          placeholder="Ваш email"
                        />
                      </div>
                      
                      <div className={styles.checkout__form_group}>
                        <label htmlFor="phone" className={styles.checkout__form_label}>Телефон*</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={state.formData.phone}
                          onChange={handleChange}
                          className={styles.checkout__form_input}
                          required
                          placeholder="Ваш телефон"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.checkout__form_group}>
                      <label htmlFor="address" className={styles.checkout__form_label}>Адрес</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={state.formData.address}
                        onChange={handleChange}
                        className={styles.checkout__form_input}
                        placeholder="Адрес доставки"
                      />
                    </div>
                    
                    <div className={styles.checkout__form_row}>
                      <div className={styles.checkout__form_group}>
                        <label htmlFor="city" className={styles.checkout__form_label}>Город</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={state.formData.city}
                          onChange={handleChange}
                          className={styles.checkout__form_input}
                          placeholder="Город"
                        />
                      </div>
                      
                      <div className={styles.checkout__form_group}>
                        <label htmlFor="zipCode" className={styles.checkout__form_label}>Индекс</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={state.formData.zipCode}
                          onChange={handleChange}
                          className={styles.checkout__form_input}
                          placeholder="Почтовый индекс"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.checkout__form_group}>
                      <label htmlFor="paymentMethod" className={styles.checkout__form_label}>Способ оплаты</label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={state.formData.paymentMethod}
                        onChange={handleChange}
                        className={styles.checkout__form_select}
                      >
                        <option value="">Выберите способ оплаты</option>
                        <option value="card">Банковская карта</option>
                        <option value="cash">Наличные при получении</option>
                      </select>
                    </div>
                    
                    <div className={styles.checkout__summary}>
                      <h4 className={styles.checkout__summary_title}>Ваш заказ</h4>
                      <div className={styles.checkout__summary_items}>
                        {cartItems.map(item => (
                          <div key={item.id} className={styles.checkout__summary_item}>
                            <span>{item.name} x{item.quantity}</span>
                            <span>{item.price * item.quantity} ₽</span>
                          </div>
                        ))}
                      </div>
                      <div className={styles.checkout__summary_total}>
                        <span>Итого:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Кнопки навигации */}
            <div className={styles.checkout__actions}>
              {state.isCompleted ? (
                <button 
                  className={styles.checkout__button_primary} 
                  onClick={handleClose}
                >
                  Закрыть
                </button>
              ) : (
                <>
                  <button 
                    className={styles.checkout__button_secondary} 
                    onClick={handlePrevStep}
                  >
                    <FaArrowLeft size={14} />
                    Назад
                  </button>
                  
                  <button 
                    className={styles.checkout__button_primary} 
                    onClick={handleCompleteOrder}
                    disabled={!isStepValid()}
                  >
                    Оформить заказ
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Checkout; 