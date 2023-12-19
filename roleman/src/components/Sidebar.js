import React from 'react';
import CharacterCardDropdown from './Kartapostaci'; 
import EncounterGeneratorDropdown from './Generatorpotyczek';
import AccountButton from './AccountButton';
import './Sidebar.css'; // Upewnij się, że ścieżka do pliku CSS jest poprawna

const Sidebar = ({ onLoginClick, onRegisterClick, onCalendarClick }) => {
  return (
    <div className="sidebar">
      {/* Pozostałe elementy paska bocznego */}
      <CharacterCardDropdown />
      <EncounterGeneratorDropdown />
      <AccountButton onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      {/* Przycisk kalendarza, który wywołuje funkcję onCalendarClick po kliknięciu */}
      <button onClick={onCalendarClick}>Kalendarz</button>
    </div>
  );
};

export default Sidebar;
