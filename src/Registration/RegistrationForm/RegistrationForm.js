import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [agreeAfera, setAgreeAfera] = useState(false);
  // const [agreeProcessing, setAgreeProcessing] = useState(false);
  // const [agreeAds, setAgreeAds] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };

  // const handleCheckboxChange = (setterFunction) => {
  //   setterFunction((prevValue) => !prevValue);
  // };

  // const goToHome = () => {
  //   navigate('/master-group');
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // if (!agreeAfera || !agreeProcessing) {
      //   console.error('Please agree to all terms and conditions.');
      //   return;
      // }

      const response = await axios.post('http://127.0.0.1:8000/auth/register', {
        email,
        password,
        username,
      });

      console.log('Registration successful', response.data);

    } catch (error) {
      if (error.response) {
        console.error('Registration failed', error.response.data);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error during registration', error.message);
      }
    }

    setUsername('');
    setEmail('');
    setPassword('');
    navigate('/auth');
    // setAgreeAfera(false);
    // setAgreeProcessing(false);
    // setAgreeAds(false);
  };

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.centeredContent}>
        <h1 className={styles.registrationTitle}>Регистрация</h1>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <label className={styles.labelText}>
            Имя пользователя
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.labelText}>
            Адрес электронной почты
            <input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
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
          {/* <label className={styles.labelText}>
            <input
              type="checkbox"
              checked={agreeAfera}
              onChange={() => handleCheckboxChange(setAgreeAfera)}
              className={styles.checkBoxes}
            />
            Согласен с публичной аферой
          </label>
          <br />
          <label className={styles.labelText}>
            <input
              type="checkbox"
              checked={agreeProcessing}
              onChange={() => handleCheckboxChange(setAgreeProcessing)}
            />
            Согласен на обработку персональных данных и с политикой обработки персональных данных
          </label>
          <br />
          <label className={styles.labelText}>
            <input
              type="checkbox"
              checked={agreeAds}
              onChange={() => handleCheckboxChange(setAgreeAds)}
            />
            Согласен на получение рекламных информационных и иных сообщений.
          </label> */}
          <label className={styles.labelText} type="acc">
            Есть аккаунт? <span onClick={() => navigate('/auth')} className={styles.linkText}>Войти</span>
          </label>
          <button onClick={handleSubmit} type="submit" className={styles.submitButton}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
