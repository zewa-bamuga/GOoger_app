import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MasterGroup.module.css';
import { useAuth } from '../Auth/AuthContext';

export default function MasterGroupPages() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

  login();

  // return (
 
  // );
}