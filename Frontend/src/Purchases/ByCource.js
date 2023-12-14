import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ByCource.module.css'

export default function ByCource(){

  return (
    <form className={styles.LCForm}>
      <h1 className={styles.LCTitle}>Тут можно купить курс</h1>
    </form>
  );
};
