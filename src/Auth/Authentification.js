import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Authentification.module.css';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка аутентификации при загрузке страницы
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleInputChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращение дефолтного поведения формы (перезагрузки страницы)

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post(
        'http://127.0.0.1:8000/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,  // Убедитесь, что эта опция установлена
        }
      );

      navigate('/master-group');
      console.log('Успешный вход:', response.data);
      setIsLoggedIn(true); // Установите состояние аутентификации в true после успешного входа
      localStorage.setItem('token', response.data.token); // Сохраните токен в localStorage
    } catch (error) {
      // Обработка ошибок
      console.error('Ошибка входа:', error.response ? error.response.data : 'Сервер не ответил');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.centeredContent}>
        <h1 className={styles.registrationTitle}>Вход в GOoger</h1>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <br />
          <label className={styles.labelText}>
            Адрес электронной почты
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.labelText}>
            Пароль
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.labelText} type="acc">
            Нет аккаунта? <span onClick={() => navigate('/RegistrationForm')} className={styles.linkText}>Зарегистрироваться</span>
          </label>
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}