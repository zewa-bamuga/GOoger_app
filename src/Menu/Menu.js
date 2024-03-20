import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Menu.module.css';
import { useAuth } from '../Auth/AuthContext';


export default function Menu() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentPage, setCurrentPage] = useState('');
  const { pathname } = useLocation();
  const [courseList, setCourseList] = useState([]);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [clientId, setClientId] = useState(Date.now());
  const chatListRef = useRef(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/chat/last_messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching last messages:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/chat/ws/${clientId}`);
  
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, { message: event.data }]);
    };
    
    return () => {
      ws.close();
    };
  }, [clientId]);
  const sendMessage = async (event) => {
    event.preventDefault();

    const ws = new WebSocket(`ws://localhost:8000/chat/ws/${clientId}`);

    ws.addEventListener('open', () => {
      ws.send(inputText);
    });

    ws.addEventListener('close', () => {
      ws.close();
    });

    setInputText('');
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8000/rip/get_courses');
      const data = await response.json();
      setCourseList(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (pathname === '/by-cource') {
      intervalId = setInterval(() => {
        fetchCourses();
      }, 50);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [pathname]);

  useEffect(() => {
    fetchCourses();
  }, []); 

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

  useEffect(() => {
    // Обновляем текущую страницу при изменении маршрута
    setCurrentPage(pathname);
  }, [pathname]);

  login();

  return (
    <div>
        {/* Код для страницы "Мастер-группы" */}
        {pathname === '/by-master-group' ? (
            <form className={styles.LCForm}>
                <div className={styles.LCTitleContainer}>
                    <h1 className={styles.LCTitle} data-type="by_mg_title">
                        Купить мастер-группу
                    </h1>
                    <div className={styles.TooltipContainer}>
                        <div className={styles.TooltipElement}>?</div>
                        <div className={styles.TooltipInfo}>
                            <p>Мастер-группа — полный курс по предмету, после </p>
                            <p>завершения которого, ты усвоишь весь </p>
                            <p>необходимый для сдачи экзаменов материал и </p>
                            <p>научишься решать типовые задачи </p>
                        </div>
                    </div>
                    <button /*onClick={goToByMG}*/ className={styles.Promocode}>
                        Промокод
                    </button>
                </div>
            </form>

        /* Код для страницы "Курсы" */
        ) : pathname === '/by-cource' ? (
            <form className={`${styles.LCForm} ${styles.ScrollableForm}`}>
            <div className={styles.LCTitleContainer}>
                <h1 className={styles.LCTitle} data-type="by_cource_title">
                    Выбор курса
                </h1>
                <button /*onClick={goToByCource}*/ className={styles.Promocode}>
                    Промокод
                </button>
                <h3>
                    {Array.isArray(courseList) && courseList.length > 0 && (
                        <ul className={styles.courseList}>
                            {courseList.map((course) => (
                                <li key={course.id} className={styles.courseListItem}>
                                    <span>{course.name} - {course.level}</span>
                                    <button className={styles.courseButton}>Выбрать</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </h3>
            </div>
        </form>

        /* Код для страницы "Домашние задания" */
        ) : pathname === '/home-work' ? (
            <form className={styles.LCForm}>
                <div className={styles.LCTitleContainer}>
                    <h1 className={styles.LCTitle} data-type="home_work_title">
                        Домашние задания
                    </h1>
                </div>
                <div className={styles.select_home_work}>
                    <select id="select1">
                        <option value="1">Общие(0)</option>
                        <option value="2">Индивидуальные</option>
                        <option value="3">Бесплатные</option>
                    </select>
                </div>
                <div className={styles.select_home_work} data-type="select_home_work2">
                    <select id="select2">
                        <option value="1">Все месяцы</option>
                        <option value="2">Январь</option>
                        <option value="3">Февраль</option>
                        <option value="4">Декабрь</option>
                        <option value="5">Март</option>
                        <option value="6">Июнь</option>
                        <option value="7">Июль</option>
                        <option value="8">Август</option>
                        <option value="9">Сентабрь</option>
                        <option value="10">Октябрь</option>
                        <option value="11">Ноябрь</option>
                        <option value="12">Декабрь</option>
                        <option value="13">Сентабрь</option>
                    </select>
                </div>
                <div className={styles.select_home_work} data-type="select_home_work3">
                    <select id="select3">
                        <option value="1">Все предметы</option>
                        <option value="2">Русский язык</option>
                        <option value="3">Базовая математика</option>
                        <option value="4">Информатика</option>
                        <option value="5">Физика</option>
                        <option value="6">Обществознание</option>
                        <option value="7">История</option>
                        <option value="8">Литература</option>
                        <option value="9">Химия</option>
                    </select>
                </div>
                <div className={styles.select_home_work} data-type="select_home_work4">
                    <select id="select4">
                        <option value="1">Все типы заданий</option>
                        <option value="2">Зачёт</option>
                        <option value="3">Домашнее задание</option>
                        <option value="4">Итоговый вариант</option>
                        <option value="5">Сгенерированное</option>
                    </select>
                </div>
            </form>

        /* Код для страницы "Преподаватели" */
        ) : pathname === '/teachers' ? (
            <form className={styles.LCForm}>
                <div className={styles.LCTitleContainer}>
                    <h1 className={styles.LCTitle} data-type="teachers_title">
                        Преподаватели
                    </h1>
                </div>
                <div className={styles.select_teachers}>
                    <select id="select1">
                        <option value="1">Все года</option>
                        <option value="2">11 класс</option>
                        <option value="3">10 класс</option>
                        <option value="4">9 класс</option>
                        <option value="5">ВУЗ</option>
                    </select>
                </div>
                <div className={styles.select_teachers} data-type="select_teachers1">
                    <select id="select">
                        <option value="1">Все предметы</option>
                        <option value="2">Русский язык</option>
                        <option value="3">Базовая математика</option>
                        <option value="4">Информатика</option>
                        <option value="5">Физика</option>
                        <option value="6">Обществознание</option>
                        <option value="7">История</option>
                        <option value="8">Литература</option>
                        <option value="9">Химия</option>
                    </select>
                </div>
            </form>


        /* Код для страницы "Достижения" */
        ) : pathname === '/progress' ? (
            <form className={styles.LCForm}>
                <div className={styles.LCTitleContainer}>
                    <h1 className={styles.LCTitle} data-type="progress_title">
                        Мои достижения
                    </h1>
                    <button /*onClick={goToByMG}*/ className={styles.Promocode}>
                        Как это работает
                    </button>
                </div>
            </form>

        /* Код для страницы "Мои мастер-группы" */
        ) : pathname === '/my-master-group' ? (
            <form className={styles.LCForm}>
                <div className={styles.LCTitleContainer}>
                    <h1 className={styles.LCTitle} data-type="my-master-group_title">
                        Мои мастер-группы
                    </h1>
                </div>
            </form>

        /* Код для страницы "Мои курсы" */
        ) : pathname === '/my-courses' ? (
            <form className={styles.LCForm}>
                <div className={styles.LCTitleContainer}>
                    <h1 className={styles.LCTitle} data-type="my-courses_title">
                        Мои курсы
                    </h1>
                </div>
            </form>
        
        /* Код для страницы "Чат" */
        ) : pathname === '/chat' ? (
            <div className={`${styles.LCForm} ${styles.ScrollChat}`} data-type="lc_chat">
            <h1 className={styles.LCTitle} data-type="chat_id">Ваш ID: <span>{clientId}</span></h1>
            <div className={styles.ChatContainer}>
              <form className={styles.FormInputField} onSubmit={sendMessage}>
                <input
                  className={styles.inputField}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Напишите сообщение..."
                  autoComplete="off"
                />
                <button className={styles.inputButton} type="submit">Отправить</button>
              </form>
              <ul className={styles.chatList} data-type="chat_list" ref={chatListRef}>
                <li>Предыдущие 5 сообщений:</li>
                {messages.slice(0, 5).map((msg, index) => (
                  <li key={index}>{msg.message}</li>
                ))}
                <li>Новые сообщения:</li>
                {messages.slice(5).map((msg, index) => (
                  <li key={index + 5}>{msg.message}</li>
                ))}
              </ul>
            </div>
          </div>
          ) : (

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
        )}

            <form className={styles.Menu}>
            <div className={styles.MenuButton}>
                <img src="/fire.png" type="faer" className={styles.logoMenu} />
                <button
                onClick={goToByMG}
                className={`${styles.MenuByMGButton} ${
                    currentPage === '/by-master-group' ? styles.activeButton : ''
                }`}
                >
                Мастер-группы
                </button>

                <img src="/hair.png" type="LogoHair" className={styles.logoMenu} />
                <button
                onClick={goToByCource}
                type="cource"
                className={`${styles.MenuByMGButton} ${
                    currentPage === '/by-cource' ? styles.activeButton : ''
                }`}
                >
                Курсы
                </button>

                <img src="/books.png" type="LogoBooks" className={styles.logoMenu} />
                <button
                onClick={goToHomeWork}
                type="home-work"
                className={`${styles.MenuByMGButton} ${
                    currentPage === '/home-work' ? styles.activeButton : ''
                }`}
                >
                Домашние задания
                </button>

                <img src="/teachers.png" type="LogoTeachers" className={styles.logoMenu} />
                <button
                onClick={goToTeachers}
                type="teachers"
                className={`${styles.MenuByMGButton} ${
                    currentPage === '/teachers' ? styles.activeButton : ''
                }`}
                >
                Преподаватели
                </button>

                <img src="/progress.png" type="LogoProgress" className={styles.logoMenu} />
                <button
                onClick={goToProgress}
                type="progress"
                className={`${styles.MenuByMGButton} ${
                    currentPage === '/progress' ? styles.activeButton : ''
                }`}
                >
                Достижения
                </button>

                <img src="/chat.png" type="LogoChat" className={styles.logoMenu} />
                <button
                onClick={goToChat}
                type="chat"
                className={`${styles.MenuByMGButton} ${
                    currentPage === '/chat' ? styles.activeButton : ''
                }`}
                >
                Общий чат
                </button>

                <button
                onClick={goToMyMG}
                type="my-mg"
                className={`${styles.MenuByMGButton} ${
                    currentPage === '/my-master-group' ? styles.activeButton : ''
                }`}
                >
                Мои мастер-группы
                </button>

                <button
                onClick={goToMyCourses}
                type="my-courses"
                className={`${styles.MenuByMGButton} ${
                    currentPage === '/my-courses' ? styles.activeButton : ''
                }`}
                >
                Мои курсы
                </button>
            </div>
            <h5 className={styles.my_mgStatus}>Вы еще ничего не выбрали</h5>
            <h5 className={styles.my_CourceStatus}>У вас нет курсов</h5>
            <hr type="line" className={styles.MenuByMGButton} />
            </form>
    </div>
  );
}