"use client";

import { useReducer, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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

// Варианты анимации для шагов
const variants = {
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

const Checkout = () => {
  const { isCheckoutOpen, closeCheckout, cartItems, totalPrice, clearCart } = useCart();
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const [direction, setDirection] = useState(0);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [lottieData, setLottieData] = useState<ArrayBuffer | null>(null);

  // Закрытие оформления заказа при нажатии Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCheckoutOpen) {
        closeCheckout();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isCheckoutOpen, closeCheckout]);

  // Сбрасываем состояние при закрытии
  useEffect(() => {
    if (!isCheckoutOpen) {
      dispatch({ type: 'RESET' });
      setLottieLoaded(false);
    }
  }, [isCheckoutOpen]);

  // Предзагрузка Lottie анимации
  useEffect(() => {
    if (isCheckoutOpen) {
      const preloadLottie = async () => {
        try {
          const response = await fetch(`${basePath}/images/cheeseform.lottie`);
          if (!response.ok) throw new Error('Failed to load animation');
          const data = await response.arrayBuffer();
          setLottieData(data);
        } catch (error) {
          console.error('Error preloading Lottie animation:', error);
        }
      };
      
      preloadLottie();
    }
  }, [isCheckoutOpen]);

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
    } else if (step === 2) {
      // Проверка обязательных полей на втором шаге
      return (
        formData.address.trim() !== '' &&
        formData.paymentMethod !== ''
      );
    }
    
    return true;
  };

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  };

  // Обработчик перехода к следующему шагу
  const handleNextStep = () => {
    if (isStepValid()) {
      if (state.step === 2) {
        // Если это последний шаг, завершаем заказ
        handleCompleteOrder();
      } else {
        setDirection(1); // Устанавливаем направление анимации вперед
        dispatch({ type: 'NEXT_STEP' });
      }
    }
  };

  // Обработчик перехода к предыдущему шагу
  const handlePrevStep = () => {
    setDirection(-1); // Устанавливаем направление анимации назад
    dispatch({ type: 'PREV_STEP' });
  };
  
  // Обработчик завершения заказа
  const handleCompleteOrder = () => {
    dispatch({ type: 'COMPLETE_ORDER' });
    
    // Очищаем корзину
    clearCart();
    
    // Автоматически закрываем модальное окно через некоторое время
    setTimeout(() => {
      closeCheckout();
    }, 5000);
  };

  // Обработчик загрузки Lottie анимации
  const handleLottieLoad = () => {
    setLottieLoaded(true);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className={styles.checkout__overlay} onClick={closeCheckout}>
      <motion.div 
        className={styles.checkout__modal}
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.checkout__header}>
          <h3 className={styles.checkout__title}>
            {state.isCompleted ? 'Заказ оформлен' : 'Оформление заказа'}
          </h3>
          
          {!state.isCompleted && (
            <div className={styles.checkout__steps}>
              <div className={`${styles.checkout__step} ${styles.active}`}>1</div>
              <div className={styles.checkout__step_line}></div>
              <div className={`${styles.checkout__step} ${state.step >= 2 ? styles.active : ''}`}>2</div>
            </div>
          )}
          
          <button 
            className={styles.checkout__close}
            onClick={closeCheckout}
            aria-label="Закрыть оформление заказа"
          >
            <FaTimes size={18} />
          </button>
        </div>
        
        <div className={styles.checkout__content}>
          {state.isCompleted ? (
            <motion.div 
              className={styles.checkout__success}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={styles.checkout__success_icon}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <FaCheck size={40} />
              </motion.div>
              
              <motion.div 
                className={styles.checkout__animation}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <DotLottieReact
                  src={`${basePath}/images/cheeseform.lottie`}
                  autoplay
                  loop
                  onLoad={handleLottieLoad}
                />
              </motion.div>
              
              <motion.h4 
                className={styles.checkout__success_title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Спасибо за заказ!
              </motion.h4>
              
              <motion.p 
                className={styles.checkout__success_message}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Мы свяжемся с вами в ближайшее время для подтверждения.
              </motion.p>
            </motion.div>
          ) : (
            <>
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                {state.step === 1 && (
                  <motion.div 
                    key="step1"
                    className={styles.checkout__form}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 0.3 }}
                  >
                    <h4 className={styles.checkout__step_title}>Контактная информация</h4>
                    
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
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </motion.div>
                )}
                
                {state.step === 2 && (
                  <motion.div 
                    key="step2"
                    className={styles.checkout__form}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 0.3 }}
                  >
                    <h4 className={styles.checkout__step_title}>Адрес доставки</h4>
                    
                    <div className={styles.checkout__form_group}>
                      <label htmlFor="address" className={styles.checkout__form_label}>Адрес*</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={state.formData.address}
                        onChange={handleChange}
                        className={styles.checkout__form_input}
                        required
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
                      <label htmlFor="paymentMethod" className={styles.checkout__form_label}>Способ оплаты*</label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={state.formData.paymentMethod}
                        onChange={handleChange}
                        className={styles.checkout__form_select}
                        required
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
              
              <div className={styles.checkout__actions}>
                {state.step > 1 && (
                  <motion.button 
                    className={styles.checkout__button_secondary} 
                    onClick={handlePrevStep}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaArrowLeft size={14} />
                    Назад
                  </motion.button>
                )}
                
                <motion.button 
                  className={styles.checkout__button_primary} 
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  whileTap={{ scale: 0.95 }}
                >
                  {state.step === 2 ? 'Оформить заказ' : 'Продолжить'}
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;