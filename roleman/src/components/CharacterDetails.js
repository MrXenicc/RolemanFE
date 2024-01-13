import React from 'react';
import './CharacterDetails.css'; // Stwórz i dostosuj CSS

const CharacterDetails = ({ characterId, onClose }) => {
  // Logika do pobrania szczegółów postaci na podstawie characterId

  return (
    <div className="form-container">
      {/* Wyświetl szczegóły postaci */}
      <h3>Szczegóły Postaci: {characterId}</h3>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};

export default CharacterDetails;
