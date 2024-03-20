// CourseContext.js
import React, { createContext, useContext, useState } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const addCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  return (
    <CourseContext.Provider value={{ courses, setCourses, addCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  return useContext(CourseContext);
};
