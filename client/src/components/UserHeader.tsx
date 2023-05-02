import React from "react";
import { useNavigate } from 'react-router-dom';

import jesterIcon from '../icons/jester3.png';

interface HeaderProps {
  userEmail: string;
}




function UserHeader({ userEmail }: HeaderProps) {
  const navigate = useNavigate();
  const onLogout = () => navigate('/');
  const onUpdatePassword = () => navigate('/update-password');
  
  return (
    <header>
      <div className="user-header-container">
        <div className="center-content">
          <h1>
            <img src={jesterIcon} alt="Jester Icon" />
            JokeBox
          </h1>
        </div>
  
        <div className="user-info">
          <p>{userEmail}</p>
          <div className="button-container">
            <button className="header-button" onClick={onUpdatePassword}>Update Password</button>
            <button className="header-button" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;