import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Rectangle.module.css';
import exclamation_mark from '../img/exclamation_mark.png';

const Rectangle = () => {
  const [showRectangle, setShowRectangle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRectangle(false); // Скрываем прямоугольник через 4 секунды
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return ReactDOM.createPortal(
    showRectangle && (
      <div className={styles.rectangle}>
        <img src={exclamation_mark} alt="Your Image" />
        <div>
          <p className={styles.text}>Неправильный логин или пароль.</p>
          <p className={styles.text} type="second">Попробуйте ещё раз.</p>
        </div>
      </div>
    ),
    document.body
  );
};

export default Rectangle;
