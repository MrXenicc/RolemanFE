import React, { useState, useEffect } from 'react';

const CharacterList = ({ onCharacterSelect, onClose, username, campaignId }) => {
  const [characters, setCharacters] = useState([]);
  username = localStorage.getItem('username');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Error: No token found');
      return;
    }

    const apiUrl = `${process.env.REACT_APP_ROLEMAN_BE}/characters?campaignId=${encodeURIComponent(campaignId)}&username=${encodeURIComponent(username)}`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      }
    };

    fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
      setCharacters(data);
    })
    .catch(error => {
      console.error('Błąd podczas pobierania postaci:', error);
    });
  }, [username, campaignId]);

  const handleDelete = (id) => {
  // Logika usuwania postaci z serwera...
  const token = localStorage.getItem('token');
  const deleteUrl = `${process.env.REACT_APP_ROLEMAN_BE}/character/${id}`;

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, 
    }
  };

  fetch(deleteUrl, requestOptions)
  .then(response => {
    if(response.ok) {
      // Usuń postać z lokalnego stanu po pomyślnym usunięciu z serwera
      setCharacters(characters.filter(character => character.id !== id));
    } else {
      console.error('Błąd podczas usuwania postaci');
    }
  })
  .catch(error => {
    console.error('Błąd podczas wywoływania API:', error);
  });
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