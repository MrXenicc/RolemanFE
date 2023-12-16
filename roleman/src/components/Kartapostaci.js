import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './Kartapostaci.css'

const CharacterCardDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-character-card">
        Karta Postaci
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/my-characters">Moje Postacie</Dropdown.Item>
        <Dropdown.Item href="#/create-character">Stwórz Postać</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CharacterCardDropdown;
