import React, { useState } from 'react';
import AccountButton from './components/AccountButton';
import CharacterCardDropdown from './components/Kartapostaci'; 
import EncounterGeneratorDropdown from './components/Generatorpotyczek';
import LoginForm from './components/Loginform';
import RegisterForm from './components/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <div className="App">
      <header className="account-header">
        <CharacterCardDropdown />
        <EncounterGeneratorDropdown />
        <AccountButton onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      </header>
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      <header className="App-header">
        <h1 style={{ fontSize: 80 }}> Roleman! </h1>
      </header>
    </div>
  );
}

export default App;
