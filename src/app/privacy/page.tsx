import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Условия использования - Cheese Shop',
  description: 'Условия использования и правила нашего магазина сыра.',
};

export default function PrivacyPage() {
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
            Условия использования
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
              Добро пожаловать в наш магазин премиального сыра. Используя наш сайт, вы соглашаетесь с настоящими условиями использования.
              Пожалуйста, внимательно прочитайте эти условия перед использованием нашего сервиса.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              2. Использование сайта
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Наш сайт предназначен для ознакомления с ассортиментом продукции и оформления заказов.
              Вы обязуетесь использовать сайт только в законных целях и не нарушать права других пользователей.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              3. Заказы и оплата
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Все заказы подлежат подтверждению. Мы принимаем различные способы оплаты.
              Цены на сайте указаны в рублях и могут быть изменены без предварительного уведомления.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              4. Доставка
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Мы осуществляем доставку по Москве и Московской области.
              Сроки и стоимость доставки зависят от адреса и объема заказа.
            </p>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              margin: '2rem 0 1rem',
              color: '#333'
            }}>
              5. Возврат и обмен
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Возврат товара возможен в течение 7 дней с момента получения при условии сохранения товарного вида и упаковки.
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
              По всем вопросам вы можете обратиться к нам:
            </p>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <li>Телефон: +7 (999) 123-45-67</li>
              <li>Email: info@syrart.ru</li>
              <li>Адрес: ул. Сырная, 123, Москва</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
