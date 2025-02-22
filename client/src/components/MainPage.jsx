import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      {/* Верхняя панель (Хедер) */}
      <header>
        <div className="logo">
          <Link to="/">Логотип компании</Link>
        </div>
        <div className="accessibility-options">
          <button>Выбор языка и режима доступности</button>
          <div className="menu">
            <ul>
              <li>Увеличенный шрифт</li>
              <li>Высококонтрастный режим</li>
              <li>Голосовое сопровождение</li>
              <li>Включение субтитров для видео</li>
              <li>Поддержка управления с клавиатуры и экранных дикторов</li>
            </ul>
          </div>
        </div>
        <div className="login">
          <button>Войти в личный кабинет</button>
        </div>
      </header>

      {/* Основной экран (Херо-секция) */}
      <section className="hero-section">
        <h1>Добро пожаловать в систему онбординга!</h1>
      </section>

      {/* Раздел «О процессе онбординга» */}
      <section className="onboarding-process">
        <h2>О процессе онбординга</h2>
        <ul>
          <li>Тестирование – определение квалификации и потребностей</li>
          <li>Создание личного кабинета – доступ к персонализированным курсам</li>
          <li>Обучение – онлайн-курсы + VR-практика</li>
          <li>Отслеживание прогресса – допускается к работе при 95% завершенных курсов</li>
          <li>Выход на работу – онбординг завершен, доступ к обучению остается</li>
        </ul>
      </section>

      {/* Подвал (Футер) */}
      <footer>
        <div className="support-contacts">
          <h3>Контакты службы поддержки</h3>
          <p>support@example.com</p>
        </div>
        <div className="privacy-policy">
          <h3>Политика конфиденциальности</h3>
          <p>Ссылка на политику конфиденциальности</p>
        </div>
        <div className="faq">
          <h3>Часто задаваемые вопросы (FAQ)</h3>
          <p>Ссылка на FAQ</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;