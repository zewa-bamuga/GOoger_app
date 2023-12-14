import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ByMasterGroup.module.css'

export default function ByMasterGroup(){

  return (
    <form className={styles.LCForm}>
      <h1 className={styles.LCTitle}>Тут можно купить мастер-группу</h1>
    </form>
  );
};
