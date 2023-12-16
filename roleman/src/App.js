import React, { useState } from 'react';
import AccountButton from './components/AccountButton';
import CharacterCardDropdown from './components/Kartapostaci'; 
import EncounterGeneratorDropdown from './components/Generatorpotyczek';
import Sidebar from './components/Sidebar';
import LoginForm from './components/Loginform';
import RegisterForm from './components/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Sidebar.css'

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
      <Sidebar onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      <header className="App-header">
        <img src="/Logo1.png" alt="Roleman Logo" style={{ width: '200px', height: 'auto' }} />
      </header>
    </div>
  );
}

export default App;
