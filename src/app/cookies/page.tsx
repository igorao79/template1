import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика Cookies - Cheese Shop',
  description: 'Информация об использовании cookies на нашем сайте.',
};

export default function CookiesPage() {
  return (
    <main style={{ padding: '120px 0 60px' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '2rem',
            color: '#333',
            textAlign: 'center'
          }}>
            Политика использования Cookies
          </h1>

          <div style={{
            lineHeight: '1.7',
            fontSize: '1.1rem',
            color: '#666'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              1. Что такое Cookies?
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Cookies - это небольшие текстовые файлы, которые сохраняются на вашем устройстве
              при посещении нашего сайта. Они помогают нам улучшить работу сайта и предоставить вам лучший опыт.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              2. Какие Cookies мы используем?
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Мы используем следующие типы cookies:
            </p>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <li><strong>Необходимые cookies:</strong> обеспечивают базовую функциональность сайта</li>
              <li><strong>Аналитические cookies:</strong> помогают нам понять, как используется сайт</li>
              <li><strong>Функциональные cookies:</strong> запоминают ваши предпочтения</li>
              <li><strong>Маркетинговые cookies:</strong> используются для персонализации рекламы</li>
            </ul>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              3. Управление Cookies
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Вы можете управлять использованием cookies следующим образом:
            </p>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <li>Через настройки вашего браузера</li>
              <li>Через наш баннер согласия с cookies</li>
              <li>Связавшись с нами напрямую</li>
            </ul>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              4. Cookies третьих сторон
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Некоторые cookies могут устанавливаться третьими сторонами, такими как Google Analytics,
              для анализа трафика и улучшения работы сайта.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              5. Изменения политики
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Мы можем обновлять эту политику cookies. Все изменения будут опубликованы на этой странице.
              Рекомендуем периодически проверять эту информацию.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              6. Контакты
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Если у вас есть вопросы по поводу использования cookies, свяжитесь с нами:
            </p>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <li>Email: info@syrart.ru</li>
              <li>Телефон: +7 (999) 123-45-67</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
