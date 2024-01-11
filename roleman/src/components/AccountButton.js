import React, { useState } from 'react';
import './AccountButton.css';

const AccountButton = ({ onLoginClick, onRegisterClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="account-dropdown-container">
          <div onClick={toggleVisibility} className="menu-item">
            Konto
          </div>
          <div className={`dropdown-content ${isVisible ? 'visible' : ''}`}>
            <div className="menu-item" onClick={onLoginClick}>Zaloguj się</div>
            <div className="menu-item" onClick={onRegisterClick}>Zarejestruj się</div>
          </div>
        </div>
      );
    };
    
    export default AccountButton;