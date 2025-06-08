import Link from 'next/link';
import { FaCheese, FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" />
        </svg>
      ),
      href: '#',
      label: 'Facebook'
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z" />
        </svg>
      ),
      href: '#',
      label: 'Twitter'
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" />
        </svg>
      ),
      href: '#',
      label: 'Instagram'
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" />
          <path d="M6 9H2V21H6V9Z" />
          <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" />
        </svg>
      ),
      href: '#',
      label: 'LinkedIn'
    },
  ];

  const navColumns = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Our Story', href: '#story' },
        { label: 'Our Team', href: '#team' },
        { label: 'Careers', href: '#careers' },
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'Soft Cheese', href: '#soft-cheese' },
        { label: 'Hard Cheese', href: '#hard-cheese' },
        { label: 'Blue Cheese', href: '#blue-cheese' },
        { label: 'Fresh Cheese', href: '#fresh-cheese' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQs', href: '#faqs' },
        { label: 'Contact Us', href: '#contact' },
        { label: 'Shipping', href: '#shipping' },
        { label: 'Returns', href: '#returns' },
      ]
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          <Link href="/" className={styles.footer__logo}>
            <div className={styles['footer__logo-image']}>
              <FaCheese size={32} />
            </div>
            <span className={styles['footer__logo-text']}>СырАрт</span>
          </Link>

          <div className={styles.footer__social}>
            <a href="https://facebook.com" className={styles['footer__social-link']} aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" className={styles['footer__social-link']} aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" className={styles['footer__social-link']} aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="https://pinterest.com" className={styles['footer__social-link']} aria-label="Pinterest">
              <FaPinterest size={20} />
            </a>
          </div>
        </div>

        <div className={styles.footer__middle}>
          <nav className={styles.footer__nav}>
            {navColumns.map((column, index) => (
              <div key={index} className={styles['footer__nav-column']}>
                <h3 className={styles['footer__nav-title']}>{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <Link 
                    key={linkIndex}
                    href={link.href}
                    className={styles['footer__nav-link']}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div className={styles.footer__newsletter}>
            <h3 className={styles['footer__newsletter-title']}>Подпишитесь на рассылку</h3>
            <p className={styles['footer__newsletter-text']}>
              Получайте эксклюзивные предложения, новости о новых продуктах и рецепты прямо на вашу электронную почту.
            </p>
            <form className={styles['footer__newsletter-form']}>
              <input 
                type="email" 
                placeholder="Ваш email" 
                className={styles['footer__newsletter-input']}
                required
              />
              <button type="submit" className={styles['footer__newsletter-button']}>
                Подписаться
              </button>
            </form>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <p className={styles.footer__copyright}>
            © {currentYear} СырАрт. Все права защищены.
          </p>

          <div className={styles.footer__links}>
            <Link href="/privacy" className={styles.footer__link}>Условия использования</Link>
            <Link href="/terms" className={styles.footer__link}>Политика конфиденциальности</Link>
            <Link href="/cookies" className={styles.footer__link}>Карта сайта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 