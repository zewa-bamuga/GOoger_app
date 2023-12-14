import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MasterGroup.module.css';

export default function MasterGroupPages() {
  const navigate = useNavigate();

  const goToByMG = () => {
    navigate('/by-master-group');
  };
  const goToByCource = () => {
    navigate('/by-cource');
  };
  const goToHomeWork = () => {
    navigate('/home-work');
  };
  const goToTeachers = () => {
    navigate('/teachers');
  };
  const goToProgress = () => {
    navigate('/progress');
  };
  const goToChat = () => {
    navigate('/chat');
  };
  const goToMyMG = () => {
    navigate('/my-master-group');
  };
  const goToMyCourses = () => {
    navigate('/my-courses');
  };

  return (
    <div>
      <form className={styles.LCForm}>
        <h1 className={styles.LCTitle}>Личный кабинет</h1>
        <div className={styles.LCButton}>
          <button onClick={goToByMG} className={styles.ByMGButton}>
            Купить мастер-группу
          </button>
          <button onClick={goToByCource} className={styles.ByCourceButton}>
            Купить курс
          </button>
        </div>
      </form>

      <form className={styles.Menu}>
        <div className={styles.MenuButton}>
          <img src="/fire.png" type="faer" className={styles.logoMenu} />
          <button onClick={goToByMG} className={styles.MenuByMGButton}>
            Мастер-группы
          </button>
          <img src="/hair.png" type="LogoHair" className={styles.logoMenu} />
          <button onClick={goToByCource} type="cource" className={styles.MenuByMGButton}>
            Курсы
          </button>
          <img src="/books.png" type="LogoBooks" className={styles.logoMenu} />
          <button onClick={goToHomeWork} type="home-work" className={styles.MenuByMGButton}>
            Домашние задания
          </button>
          <img src="/teachers.png" type="LogoTeachers" className={styles.logoMenu} />
          <button onClick={goToTeachers} type="teachers" className={styles.MenuByMGButton}>
            Преподаватели
          </button>
          <img src="/progress.png" type="LogoProgress" className={styles.logoMenu} />
          <button onClick={goToProgress} type="progress" className={styles.MenuByMGButton}>
            Достижения
          </button>
          <img src="/chat.png" type="LogoChat" className={styles.logoMenu} />
          <button onClick={goToChat} type="chat" className={styles.MenuByMGButton}>
            Общий чат
          </button>
          <button onClick={goToMyMG} type="my-mg" className={styles.MenuByMGButton}>
            Основной курс
          </button>
          <button onClick={goToMyCourses} type="my-courses" className={styles.MenuByMGButton}>
            Курсы
          </button>
        </div>
        <h5 className={styles.my_mgStatus}>Вы еще ничего не выбрали</h5>
        <h5 className={styles.my_CourceStatus}>У вас нет курсов</h5>
        <hr type="line" className={styles.MenuByMGButton}/>
      </form>
    </div>
  );
}
