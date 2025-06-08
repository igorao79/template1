"use client";

import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import styles from './CartButton.module.scss';

const CartButton = () => {
  const { openCart, totalItems } = useCart();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openCart();
  };

  return (
    <button 
      className={styles.cartButton} 
      onClick={handleClick}
      aria-label="Открыть корзину"
      type="button"
    >
      <FaShoppingCart size={20} />
      {totalItems > 0 && (
        <span className={styles.cartButton__count}>{totalItems}</span>
      )}
    </button>
  );
};

export default CartButton; 