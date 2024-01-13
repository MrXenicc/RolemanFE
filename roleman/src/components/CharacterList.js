import React, { useState } from 'react';
import './CharacterList.css'; // Stwórz i dostosuj CSS podobnie do LoginForm.css

const CharacterList = ({ onCharacterSelect, onClose }) => {
  const [characters, setCharacters] = useState([
    // Tutaj przykładowe postacie, w przyszłości pobierane z API
    { id: 1, name: 'Postać 1' },
    { id: 2, name: 'Postać 2' },
    // itd.
  ]);

  const handleDelete = (id) => {
    // Logika usuwania postaci
    setCharacters(characters.filter(character => character.id !== id));
  };

  return (
    <div className="form-container">
      {characters.map(character => (
        <div key={character.id} className="character-item">
          <span className="character-name" onClick={() => onCharacterSelect(character.id)}>
            {character.name}
          </span>
          <button onClick={() => handleDelete(character.id)}>Usuń</button>
        </div>
      ))}
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};

export default CharacterList;