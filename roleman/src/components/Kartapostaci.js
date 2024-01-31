import React, { useState } from 'react';
import './Kartapostaci.css';
import CharacterList from './CharacterList';
import CreateCharacterForm from './CreateCharacterForm'

const CharacterCardDropdown = ({ campaignId, setCharacters }) => {
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

  const saveCharacter = (newCharacter) => {
    // aktualizuje stan z nową postacią
    setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
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
          campaignId={campaignId} 
        />
      )}
      {showCreateCharacterForm && (
      <CreateCharacterForm
      onSave={saveCharacter}
      onClose={() => setShowCreateCharacterForm(false)}
      campaignId={campaignId}
      />
      )}
    </>
  );
};

export default CharacterCardDropdown;