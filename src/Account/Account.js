import { useNavigate } from 'react-router-dom';
import api from '../Registration/api';
import { useAuth } from '../Auth/AuthContext';
import { useCourseContext } from './CourseContext';
import React, { useState } from 'react';
import styles from './Account.module.css';

export default function Account() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { addCourse: contextAddCourse } = useCourseContext();
  const [userId, setUserId] = useState('');
  const [userIdToDisplay, setUserIdToDisplay] = useState('');
  const [usernameToDisplay, setUserNameToDisplay] = useState(''); // Добавленное объявление
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDifficulty, setCourseDifficulty] = useState('');
  const [userDeleted, setUserDeleted] = useState(false);
  const [courseDeleted, setCourseDeleted] = useState('');

  const handleLogout = async () => {
    try {
      await api.post('http://localhost:8000/auth/logout');
      logout();
      console.log('Успешный выход');
      navigate('/auth');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  const fetchUserName = async () => {
    try {
      const response = await api.get('http://localhost:8000/rip/get_username');
      const user_name = response.data.user_name;
      setUserNameToDisplay(user_name);
      console.log('Имя пользователя:', user_name);
    } catch (error) {
      console.error('Ошибка получения имени пользователя:', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await api.get('http://localhost:8000/rip/get_current_user');
      const user_id = response.data.user_id;
      setUserIdToDisplay(user_id);
    } catch (error) {
      console.error('Ошибка получения ID пользователя:', error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await api.delete(`http://localhost:8000/rip/delete_user/${userId}`);
      console.log('Пользователь успешно удален:', response.data);
      setUserDeleted(true);
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
    }
    setUserId('');
  };

  const deleteCourse = async () => {
    try {
      const response = await api.delete(`http://localhost:8000/rip/delete_course/${courseId}`);
      console.log('Курс успешно удален:', response.data);
      setCourseDeleted(true);
    } catch (error) {
      console.error('Ошибка удаления курса:', error);
    }
    setCourseId('');
  };
  const addCourse = async () => {
    try {
      const newCourse = {
        name: courseName,
        level: courseDifficulty,
      };

      const response = await api.post('http://localhost:8000/rip/add_course', newCourse);

      console.log('Курс успешно добавлен:', response.data);

      contextAddCourse(newCourse);

    } catch (error) {
      console.error('Ошибка добавления курса:', error);
    }

    setCourseId('');
    setCourseName('');
    setCourseDifficulty('');
  };
  
  return (
    <div>
      <h1>Тут будет Аккаунт</h1>
      <label className={styles.IdLabel}>
        <h3 className={styles.IdTitle}>
          Пользователь:
        </h3>
        <p className={styles.nameStyle}>Введите id пользователя:</p>
        <input
          className={styles.InputStyle}
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={deleteUser} className={styles.buttonDeleteStyle}>Удалить пользователя</button>
        {userDeleted && <p className={styles.infoStyle}>Пользователь удалён</p>}
        
        <p><button onClick={getUser} className={styles.buttonGetStyle}>Получить id</button></p>
        {userIdToDisplay && <p className={styles.getIdStyle}>ID пользователя: {userIdToDisplay}</p>}

        <button onClick={fetchUserName} className={styles.buttonGetStyle}>Получить username</button>
        {usernameToDisplay && <p className={styles.getIdStyle}>Username пользователя: {usernameToDisplay}</p>}
      </label>

      <label className={styles.IdLabel}>
        <h3 className={styles.IdTitle}>
          Курс:
        </h3>
        <input
          className={styles.InputStyle}
          type="text"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button onClick={deleteCourse} className={styles.buttonDeleteStyle}>Удалить курс</button>
        {courseDeleted && <p className={styles.infoStyle}>Курс удалён</p>} 
      </label>
      
      <label className={styles.IdLabel}>
        <h3 className={styles.IdTitle}>
          Добавить курс:
        </h3>
        <p className={styles.nameStyle}>Введите название курса:</p>
        <input
          className={styles.InputStyle}
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </label>
      <label>
        <p className={styles.nameStyle}>Введите сложность курса:</p>
        <input
          className={styles.InputStyle}
          type="text"
          value={courseDifficulty}
          onChange={(e) => setCourseDifficulty(e.target.value)}
        />
        <p><button onClick={addCourse} className={styles.buttonGetStyle}>Добавить курс</button></p>
      </label>
      <p><button onClick={handleLogout} className={styles.buttonStyle}>Выйти</button></p>
    </div>
  );
}
