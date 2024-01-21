import React, { useState } from 'react';
import CharacterCardDropdown from './Kartapostaci'; 
import EncounterGeneratorDropdown from './Generatorpotyczek';
import AccountButton from './AccountButton';
import './Sidebar.css'; // Make sure the CSS path is correct

const Sidebar = ({ onLoginClick, onRegisterClick, onCalendarClick, onGenerateEncounter }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
        <CharacterCardDropdown />
        <EncounterGeneratorDropdown onGenerateEncounter={onGenerateEncounter} />
        <div className="menu-item" onClick={onCalendarClick}>
          Kalendarz
        </div>
        <div className="account-button-container">
        <AccountButton onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
        </div>
      </div>
      <div className="sidebar-toggle" onClick={handleToggleSidebar}>
        &#8942; {/* Unicode for three vertical dots */}
      </div>
    </>
  );
};

export default Sidebar;
