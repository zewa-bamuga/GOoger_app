import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeAfera, setAgreeAfera] = useState(false);
  const [agreeProcessing, setAgreeProcessing] = useState(false);
  const [agreeAds, setAgreeAds] = useState(false);
  const [checkboxesValid, setCheckboxesValid] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };

  const handleCheckboxChange = (setterFunction) => {
    setterFunction((prevValue) => !prevValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!agreeAfera || !agreeProcessing || !agreeAds) {
        setCheckboxesValid(false);
        console.error('Please agree to all terms and conditions.');
        return;
      }

      const response = await axios.post('http://localhost:8000/auth/register', {
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
    setAgreeAfera(false);
    setAgreeProcessing(false);
    setAgreeAds(false);
    setCheckboxesValid(true);
  };

  return (
    <div className={styles.registrationContainer}>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <h1 className={styles.registrationTitle}>Регистрация в GOoger</h1>
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
              placeholder="Имя пользователя"
              className={styles.inputField}
            />
          <br />
            <input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              placeholder="Почта"
              className={styles.inputField}
            />
          <br />
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              placeholder="Пароль"
              className={styles.inputField}
            />
          <br />
          
          <label className={`${styles.labelText} ${!checkboxesValid ? styles.error : ''}`} type="checkboxes1">
            <input
              type="checkbox"
              checked={agreeAfera}
              onChange={() => handleCheckboxChange(setAgreeAfera)}
              className={styles.checkBoxes}
            />
            <span className={styles.agreementText}>
              Согласен с
              <a href="https://disk.yandex.ru/i/w9SBr8X7PzHhUw" target="_blank" className={styles.link}>
                публичной афертой
              </a>
            </span>
          </label>
          <br />

          <label className={`${styles.labelText} ${!checkboxesValid ? styles.error : ''}`} type="checkboxes2">
            <input
              type="checkbox"
              checked={agreeAds}
              onChange={() => handleCheckboxChange(setAgreeAds)}
              className={styles.checkBoxes}
            />
            <span className={styles.agreementText}>
              Согласен на  
              <a href="https://disk.yandex.ru/i/w9SBr8X7PzHhUw" target="_blank" className={styles.link}>
                получение рекламных, информационных и иных рассылок
              </a>
            </span>
          </label>

          <button onClick={handleSubmit} type="submit" className={styles.submitButton}>
            Зарегистрироваться
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
            Есть аккаунт? <span onClick={() => navigate('/auth')} className={styles.linkText}>Войти</span>
          </label>
        </form>
    </div>
  );
}
