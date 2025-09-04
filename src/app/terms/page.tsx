import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности - Cheese Shop',
  description: 'Политика конфиденциальности нашего магазина сыра.',
};

export default function TermsPage() {
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
            Политика конфиденциальности
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
              1. Общие положения
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Настоящая политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу личную информацию
              при использовании нашего сайта и услуг.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              2. Собираемая информация
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Мы можем собирать следующие типы информации:
            </p>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <li>Личная информация: имя, email, телефон, адрес доставки</li>
              <li>Информация о заказах: история покупок, предпочтения</li>
              <li>Техническая информация: IP-адрес, тип браузера, cookies</li>
            </ul>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              3. Использование информации
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Собранная информация используется для:
            </p>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <li>Обработки заказов и доставки</li>
              <li>Улучшения качества обслуживания</li>
              <li>Отправки информационных рассылок (с вашего согласия)</li>
              <li>Анализа посещаемости сайта</li>
            </ul>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              4. Cookies
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Мы используем cookies для улучшения работы сайта и анализа трафика.
              Вы можете отключить cookies в настройках вашего браузера.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              5. Защита данных
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Мы принимаем все необходимые меры для защиты вашей личной информации от несанкционированного доступа,
              изменения, раскрытия или уничтожения.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              6. Ваши права
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Вы имеете право:
            </p>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <li>Получить доступ к своей личной информации</li>
              <li>Исправить неточные данные</li>
              <li>Удалить свою информацию</li>
              <li>Отказаться от рассылок</li>
            </ul>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              7. Контакты
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Если у вас есть вопросы по поводу нашей политики конфиденциальности,
              свяжитесь с нами по email: info@syrart.ru
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
