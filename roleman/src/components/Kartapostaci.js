import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

const CharacterCardDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="menu-item" onClick={() => setOpen(!open)}>
        Karta Postaci
      </div>
      <Collapse in={open}>
        <div id="character-card-dropdown-content">
          {/* Tu dodaj treść menu */}
          <div className="dropdown-menu-item">Moje Postacie</div>
          <div className="dropdown-menu-item">Stwórz Postać</div>
        </div>
      </Collapse>
    </>
  );
};

export default CharacterCardDropdown;