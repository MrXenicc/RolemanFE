// import React from 'react';
// import CharacterCardDropdown from './Kartapostaci'; 
// import EncounterGeneratorDropdown from './Generatorpotyczek';
// import AccountButton from './AccountButton';
// import './Sidebar.css'; // Upewnij się, że ścieżka do pliku CSS jest poprawna

// const Sidebar = ({ onLoginClick, onRegisterClick, onCalendarClick }) => {
//   return (
//     <div className="sidebar">
//       {/* Pozostałe elementy paska bocznego */}
//       <CharacterCardDropdown />
//       <EncounterGeneratorDropdown />
//       {/* Przycisk kalendarza, który wywołuje funkcję onCalendarClick po kliknięciu */}
//       <div className="menu-item" onClick={onCalendarClick}>
//       Kalendarz
//       </div>
//       <div className="account-button-container">
//       <AccountButton onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import CharacterCardDropdown from './Kartapostaci'; 
import EncounterGeneratorDropdown from './Generatorpotyczek';
import AccountButton from './AccountButton';
import './Sidebar.css'; // Make sure the CSS path is correct

const Sidebar = ({ onLoginClick, onRegisterClick, onCalendarClick }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
        <CharacterCardDropdown />
        <EncounterGeneratorDropdown />
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
