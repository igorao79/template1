"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaTimes } from 'react-icons/fa';
import styles from './SuccessModal.module.scss';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  lottieFile: string;
}

const SuccessModal = ({ isOpen, onClose, title, message, lottieFile }: SuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.modal__overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className={styles.modal__content}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              className={styles.modal__close} 
              onClick={onClose}
              aria-label="Закрыть"
            >
              <FaTimes size={18} />
            </button>
            
            <h3 className={styles.modal__title}>{title}</h3>
            <p className={styles.modal__message}>{message}</p>
            
            <div className={styles.modal__animation}>
              <DotLottieReact
                src={lottieFile}
                autoplay
                loop
                style={{ width: '200px', height: '200px' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal; 