import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './AccountButton.css';

    const AccountButton = ({ onLoginClick, onRegisterClick }) => {
        return (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-account">
              Konto
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item onClick={onLoginClick}>Zaloguj się</Dropdown.Item>
              <Dropdown.Item onClick={onRegisterClick}>Zarejestruj się</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      };

export default AccountButton;
