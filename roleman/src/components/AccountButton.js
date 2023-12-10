import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

/*const AccountButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    // Tutaj można dodać logikę wylogowania, np. czyszczenie tokenu sesji
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Konto
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {isLoggedIn ? (
          <>
            <Dropdown.Item href="#/options">Opcje</Dropdown.Item>
            <Dropdown.Item href="#/" onClick={handleLoginLogout}>Wyloguj się</Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item href="#/login">Zaloguj się</Dropdown.Item>
            <Dropdown.Item href="#/register">Zarejestruj się</Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};*/

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
