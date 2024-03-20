import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import logoA from '../../img/logoA.jpg';
import logoB from '../../img/logoB.jpg';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Header({
  showLogoA = true,
  showLogoB = true,
  showContactInfo = true,
  showAccount = true,
}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const goToMasterGroup = () => {
    navigate('/master-group');
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await api.get('http://localhost:8000/rip/get_username');
        console.log(response.data);
        setUsername(response.data.user_name);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
  
    fetchUsername();
  }, []);
  

  return (
    <header className={styles.header}>
      {showLogoA &&(
        <>
          <button className={styles.logoButton} onClick={goToMasterGroup}>
            <div style={{ backgroundImage: `url(${logoB})` }}></div>
          </button>
        </>
      )}
      {showLogoB &&(
        <>
          <div className={styles.logo} style={{ backgroundImage: `url(${logoA})` }}></div>
        </>
      )}
      <div className={styles.content}>
        {showContactInfo && (
          <>
            <div className={styles['contact-info']}>
              <div className={styles.phone}>
                <img src="/phone.jpeg" alt="логотип" className={styles.logoBeforePhone} />
                8 913 879 03 96
              </div>
            </div>
            <div className={styles['contact-info']}>
              <div className={styles.email}>
                <img src="/email.jpeg" alt="почта" className={styles.logoBeforeEmail} />
                tikhonov.igor2028@yandex.ru
              </div>
            </div>
          </>
        )}
        {showAccount && (
          <>
            <label className={styles['account-info']}>
              <span onClick={() => navigate('/progress')} className={styles.lvl}>Ололошка (0XP)</span>
            </label>
            <label className={styles['account-info']}>
              {/* <li key="username"> */}
                <span onClick={() => navigate('/account')} className={styles.acc}>{username}</span>
              {/* </li> */}
            </label>
          </>
        )}
      </div>
    </header>
  );
}