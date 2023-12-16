import React from 'react';
import CharacterCardDropdown from './Kartapostaci'; 
import EncounterGeneratorDropdown from './Generatorpotyczek';
import AccountButton from './AccountButton';
import './Sidebar.css'; // Twój własny plik CSS dla sidebar

const Sidebar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="sidebar">
      <CharacterCardDropdown />
      <EncounterGeneratorDropdown />
      <AccountButton onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
    </div>
  );
};

export default Sidebar;
