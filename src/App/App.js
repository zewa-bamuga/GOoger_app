import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Registration/Header/Header';
import Menu from '../Menu/Menu';
import RegistrationForm from '../Registration/RegistrationForm/RegistrationForm';
import MasterGroupPages from '../MasterGr/MasterGroup';
import AuthenticationForm from '../Auth/Authentification';
import Progress from '../Progress.js/Progress';
import Account from '../Account/Account';
import ByMasterGroup from '../Purchases/ByMasterGroup';
import ByCource from '../Purchases/ByCource';
import HomeWork from '../HomeWork/HomeWork';
import Teachers from '../Teachers/Teachers';
import Chat from '../Chat/Chat';
import MyMasterGroups from '../MyMG/MyMasterGroups';
import MyCourses from '../MyCourses/MyCourses'; 

const App = () => {
  return (
    <div className='wrapper'>
      <Router>
        <Routes>
            <Route index element={<div><Header showLogoA={false} showAccount={false}/><AuthenticationForm /></div>} />
            <Route path="/RegistrationForm" element={<div><Header showLogoA={false} showAccount={false}/><div></div><RegistrationForm /></div>} />
            <Route path="/auth" element={<div><Header showLogoA={false} showAccount={false}/><AuthenticationForm /></div>} />

            <Route path="/master-group" element={<div><Header  showLogoB={false} showContactInfo={false}/><Menu /><MasterGroupPages /></div>} />
            <Route path="/progress" element={<div><Header showLogoB={false} showContactInfo={false}/><Menu /><Progress /></div>} />
            <Route path="/account" element={<div><Header showLogoB={false} showContactInfo={false}/><Account /></div>} />
            <Route path="/by-master-group" element={<div><Header showLogoB={false} showContactInfo={false}/><Menu /><ByMasterGroup /></div>} />
            <Route path="/by-cource" element={<div><Header showLogoB={false} showContactInfo={false}/><Menu /><ByCource /></div>} />
            <Route path="/home-work" element={<div><Header showLogoB={false} showContactInfo={false}/><Menu /><HomeWork /></div>} />
            <Route path="/teachers" element={<div><Header showLogoB={false} showContactInfo={false}/><Menu /><Teachers /></div>} />
            <Route path="/chat" element={<div><Header showLogoB={false} showContactInfo={false}/><Menu /><Chat /></div>} />
            <Route path="/my-master-group" element={<div><Header showLogoB={false} showContactInfo={false}/><Menu /><MyMasterGroups /></div>} />
            <Route path="/my-courses" element={<div><Header showLogoB={false} showContactInfo={false}/><Menu /><MyCourses /></div>} />
            </Routes>
      </Router>
    </div>
  );
};

export default App;