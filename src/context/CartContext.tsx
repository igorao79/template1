"use client";

import React, { createContext, useState, useContext, useCallback, useEffect, ReactNode } from 'react';

// Определяем тип для товара в корзине
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Определяем тип для контекста корзины
interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Создаем контекст с начальными значениями
const CartContext = createContext<CartContextType>({
  cartItems: [],
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

// Хук для использования контекста корзины
export const useCart = () => useContext(CartContext);

// Провайдер контекста корзины
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Загружаем корзину из localStorage при инициализации
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Ошибка при загрузке корзины из localStorage:', error);
        }
      }
    }
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined' && cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Подписываемся на событие добавления в корзину
  useEffect(() => {
    const handleAddToCartEvent = (event: Event) => {
      if (event instanceof CustomEvent) {
        const item = event.detail;
        addToCart(item);
        openCart();
      }
    };

    document.addEventListener('add-to-cart', handleAddToCartEvent as EventListener);

    return () => {
      document.removeEventListener('add-to-cart', handleAddToCartEvent as EventListener);
    };
  }, []);

  // Функция открытия корзины
  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Функция закрытия корзины
  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Функция добавления товара в корзину
  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);

      if (existingItemIndex >= 0) {
        // Если товар уже есть в корзине, увеличиваем количество
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1)
        };
        return updatedItems;
      } else {
        // Если товара нет в корзине, добавляем его
        return [...prevItems, { ...item, quantity: item.quantity || 1 }];
      }
    });
  }, []);

  // Функция удаления товара из корзины
  const removeFromCart = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  // Функция обновления количества товара
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Функция очистки корзины
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cart');
  }, []);

  // Вычисляем общее количество товаров
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Вычисляем общую стоимость
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Значение контекста
  const value = {
    cartItems,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 