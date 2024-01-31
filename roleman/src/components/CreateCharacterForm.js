import React, { useState } from 'react';
import './CreateCharacterForm.css'; // Upewnij się, że masz odpowiedni CSS

const CreateCharacterForm = ({ onSave, onClose, username, campaignId }) => {
  const [characterName, setCharacterName] = useState('');
  const [characterRace, setCharacterRace] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [strength, setStrength] = useState(10);
  const [dexterity, setDexterity] = useState(10);
  const [constitution, setConstitution] = useState(10);
  const [intelligence, setIntelligence] = useState(10);
  const [wisdom, setWisdom] = useState(10);
  const [charisma, setCharisma] = useState(10);
  const [armorClass, setArmorClass] = useState(10);
  const [initiative, setInitiative] = useState(5);
  const [speed, setSpeed] = useState(30);
  const [maxHp, setMaxHp] = useState(15);
  const [currentHp, setCurrentHp] = useState(15);
  username = localStorage.getItem('username');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Tworzenie obiektu postaci z nowymi polami
    const characterData = {
      username,
      campaignId,
      name: characterName,
      race: characterRace,
      characterClass,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      armorClass,
      initiative,
      speed,
      maxHp,
      currentHp
    };

    const apiUrl = `${process.env.REACT_APP_ROLEMAN_BE}/character?campaignId=${encodeURIComponent(campaignId)}&username=${encodeURIComponent(username)}`;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Error: No token found');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(characterData)
    };
    
    fetch(apiUrl, requestOptions)
    .then(response => {
      if (response.ok) {
        console.log('Dane postaci zapisane pomyślnie');
        response.json().then(data => {
          onSave(data); // informuje komponent nadrzędny o nowej postaci
        });
      } else {
        console.error('Błąd podczas zapisywania danych postaci');
      }
    })
    .catch(error => {
      console.error('Błąd podczas wywoływania API:', error);
    });

    onSave(characterData);
    // Reset form after save
    setCharacterName('');
    setCharacterRace('');
    setCharacterClass('');
    setStrength(10);
    setDexterity(10);
    setConstitution(10);
    setIntelligence(10);
    setWisdom(10);
    setCharisma(10);
    setArmorClass(10);
    setInitiative(5);
    setSpeed(30);
    setMaxHp(15);
    setCurrentHp(15);
  };

  return (
    <div className="character-form-container">
      <form onSubmit={handleSubmit}>
        <div className="character-form-group">
          <label>Nazwa:</label>
          <input type="text" value={characterName} onChange={e => setCharacterName(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Rasa:</label>
          <select value={characterRace} onChange={e => setCharacterRace(e.target.value)} required>
            <option value="">Wybierz rasę</option>
            <option value="DRAGONBORN">Dragonborn</option>
            <option value="DWARF">Krasnolud</option>
            <option value="ELF">Elf</option>
            <option value="HALF_ELF">Półelf</option>
            <option value="HALFLING">Niziołek</option>
            <option value="HALF_ORC">Półork</option>
            <option value="HUMAN">Człowiek</option>
            <option value="TIEFLING">Diabelstwo</option>
            {/* Dodaj resztę ras zgodnie z Twoją grą */}
          </select>
        </div>
        <div className="character-form-group">
          <label>Klasa postaci:</label>
          <select value={characterClass} onChange={e => setCharacterClass(e.target.value)} required>
            <option value="">Wybierz klasę</option>
            <option value="BARBARIAN">Barbarzyńca</option>
            <option value="BARD">Bard</option>
            <option value="CLERIC">Kleryk</option>
            <option value="DRUID">Druid</option>
            <option value="FIGHTER">Wojownik</option>
            <option value="MONK">Mnich</option>
            <option value="PALADIN">Paladyn</option>
            <option value="RANGER">Łowca</option>
            <option value="ROGUE">Łotr</option>
            <option value="SORCERER">Czarownik</option>
            <option value="WARLOCK">Zaklinacz</option>
            <option value="WIZARD">Mag</option>
            {/* Dodaj resztę klas zgodnie z Twoją grą */}
          </select>
        </div>
        {/* Atrybuty postaci */}
        <div className="character-form-group">
          <label>Siła:</label>
          <input type="number" value={strength} onChange={e => setStrength(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Zręczność:</label>
          <input type="number" value={dexterity} onChange={e => setDexterity(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Kondycja:</label>
          <input type="number" value={constitution} onChange={e => setConstitution(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Inteligencja:</label>
          <input type="number" value={intelligence} onChange={e => setIntelligence(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Mądrość:</label>
          <input type="number" value={wisdom} onChange={e => setWisdom(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Charyzma:</label>
          <input type="number" value={charisma} onChange={e => setCharisma(e.target.value)} required />
        </div>
        {/* Dane bitewne */}
        <div className="character-form-group">
          <label>Klasa pancerza (AC):</label>
          <input type="number" value={armorClass} onChange={e => setArmorClass(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Inicjatywa:</label>
          <input type="number" value={initiative} onChange={e => setInitiative(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Prędkość:</label>
          <input type="number" value={speed} onChange={e => setSpeed(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Maksymalne zdrowie:</label>
          <input type="number" value={maxHp} onChange={e => setMaxHp(e.target.value)} required />
        </div>
        <div className="character-form-group">
          <label>Obecne zdrowie:</label>
          <input type="number" value={currentHp} onChange={e => setCurrentHp(e.target.value)} required />
        </div>
        <div className="button">
            <button type="submit" onClick={onClose}>Stwórz Postać</button>
            <button type="button" onClick={onClose}>Zamknij</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCharacterForm;