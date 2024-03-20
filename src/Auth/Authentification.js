import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Authentification.module.css';
import api from '../Registration/api';
import Rectangle from './Rectangle';
import open_eye from '../img/open_eye.png';
import close_eye from '../img/close_eye.png'; // Импортируйте изображение закрытой иконки


export default function AuthenticationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [showRectangle, setShowRectangle] = useState(false); // Состояние для управления видимостью прямоугольника
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState('open'); // Изначально используется иконка 'open_eye.png'
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getCookie('fastapiusersauth');
    if (cookie) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Изменяем состояние отображения пароля
    setEyeIcon(showPassword ? 'close' : 'open'); // Изменяем состояние иконки
  };
  

  const handleInputChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const setCookie = (name, value, maxAge) => {
    document.cookie = `${name}=${value}; max-age=${maxAge}; secure; samesite=None; path=/`;
  };

  const getCookie = (name) => {
    const value = document.cookie.match(`(^|;)\\s*${name}\\s*=([^;]+)`);
    return value ? value.pop() : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post(
        'http://localhost:8000/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      const cookies = response.headers['set-cookie'];

      if (cookies) {
        setCookie('fastapiusersauth', cookies, 3600);
      }

      navigate('/master-group');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Ошибка входа:', error.response ? error.response.data : 'Сервер не ответил');
      setError('Неправильный логин или пароль');
      setShowRectangle(true); // Показываем прямоугольник при ошибке
      setTimeout(() => setShowRectangle(false), 4000); // Скрываем прямоугольник через 4 секунды
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className={styles.registrationContainer}>
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <h1 className={styles.registrationTitle}>Вход в GOoger</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => handleInputChange(e, setUsername)}
          placeholder="Почта"
          className={styles.inputField}
        />
        <br />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          placeholder="Пароль"
          className={`${styles.inputField} ${styles.passwordField}` }
        />
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className={styles.passwordVisibilityButton}
        >
          <img
            src={eyeIcon === 'open' ? open_eye : close_eye}
            alt="Toggle Password Visibility"
            className={styles.passwordVisibilityIcon}
          />
        </button>

        <span onClick={() => navigate('/RegistrationForm')} className={styles.linkText} type="newPas">
          Забыли пароль?
        </span>
        <br />

        {/* {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        )} */}

        <button type="submit" className={styles.submitButton}>
          Войти
        </button>

        <span className={styles.agreementText} type="last_agree">
          При входе вы принимаете условия
          <a href="https://disk.yandex.ru/i/w9SBr8X7PzHhUw" target="_blank" className={styles.link}>
            публичной оферты
          </a>
          <span className={styles.andSpacer}> и</span>
          <a href="https://disk.yandex.ru/i/w9SBr8X7PzHhUw" target="_blank" className={styles.link}>
            политики обработки персональных данных
          </a>
        </span>

        <hr className={styles.hrLine} />

        <label className={styles.labelText} type="acc">
          Нет аккаунта? <span onClick={() => navigate('/RegistrationForm')} className={styles.linkText} type="reg">Зарегистрироваться</span>
        </label>
      </form>
      {showRectangle && <Rectangle text="Ошибка входа" />} {/* Подключаем компонент с прямоугольником только при наличии ошибки */}
    </div>
  );
}
