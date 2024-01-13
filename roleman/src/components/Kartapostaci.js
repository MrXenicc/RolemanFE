import React, { useState } from 'react';
import './Kartapostaci.css';
import CharacterList from './CharacterList';
import CharacterDetails from './CharacterDetails';
import CreateCharacterForm from './CreateCharacterForm'

const CharacterCardDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCharacterList, setShowCharacterList] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [showCreateCharacterForm, setShowCreateCharacterForm] = useState(false);

  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCharacterSelect = (id) => {
    setSelectedCharacterId(id);
    setShowCharacterList(false); // Zamknij listę postaci
  };

  const saveCharacter = (characterData) => {
    console.log('Zapisz postać:', characterData);
    // Tutaj możesz wysłać dane do API lub dodać do stanu aplikacji
  };
  

  return (
    <>
      <div className="menu-item" onClick={toggleVisibility}>
        Karta Postaci
      </div>
      {isVisible && (
        <div id="character-card-dropdown-content">
          <div className="dropdown-menu-item" onClick={() => setShowCharacterList(true)}>Moje Postacie</div>
          <div className="dropdown-menu-item" onClick={() => setShowCreateCharacterForm(true)}>Stwórz Postać</div>
        </div>
      )}
      {showCharacterList && (
        <CharacterList 
          onCharacterSelect={handleCharacterSelect}
          onClose={() => setShowCharacterList(false)} 
        />
      )}
      {selectedCharacterId && (
        <CharacterDetails 
          characterId={selectedCharacterId} 
          onClose={() => setSelectedCharacterId(null)}
        />
      )}
      {showCreateCharacterForm && (
      <CreateCharacterForm
      onSave={saveCharacter}
      onClose={() => setShowCreateCharacterForm(false)}
      />
      )}
    </>
  );
};

export default CharacterCardDropdown;