"use client";

import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import styles from './CartButton.module.scss';

const CartButton = () => {
  const { openCart, totalItems } = useCart();

  return (
    <button 
      className={styles.cartButton} 
      onClick={openCart}
      aria-label="Открыть корзину"
    >
      <FaShoppingCart size={20} />
      {totalItems > 0 && (
        <span className={styles.cartButton__count}>{totalItems}</span>
      )}
    </button>
  );
};

export default CartButton; 