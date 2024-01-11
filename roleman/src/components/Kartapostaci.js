import React, { useState } from 'react';
import './Kartapostaci.css';

const CharacterCardDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="menu-item" onClick={toggleVisibility}>
        Karta Postaci
      </div>
      {isVisible && (
        <div id="character-card-dropdown-content">
          {/* Tu dodaj treść menu */}
          <div className="dropdown-menu-item">Moje Postacie</div>
          <div className="dropdown-menu-item">Stwórz Postać</div>
        </div>
      )}
    </>
  );
};

export default CharacterCardDropdown;