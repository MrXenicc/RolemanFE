import React, { useState } from 'react';
import './CreateCharacterForm.css'; // Upewnij się, że masz odpowiedni CSS

const CreateCharacterForm = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [characterClass, setCharacterClass] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Tutaj logika zapisywania postaci, np. wysłanie do API lub aktualizacja stanu
    onSave({ name, age, race, height, weight, characterClass });
    // Reset form after save
    setName('');
    setAge('');
    setRace('');
    setHeight('');
    setWeight('');
    setCharacterClass('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nazwa:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Wiek:</label>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Rasa:</label>
        <select value={race} onChange={e => setRace(e.target.value)} required>
            <option value="">Wybierz rasę</option>
            <option value="Człowiek">Człowiek</option>
            <option value="Elf">Elf</option>
            <option value="Ork">Ork</option>
            <option value="Krasnolud">Krasnolud</option>
            <option value="Niziołek">Niziołek</option>
            <option value="Diabelstwo">Diabelstwo</option>
            <option value="Drakon">Drakon</option>
            <option value="Gnom">Gnom</option>
            <option value="Półelf">Półelf</option>
            <option value="Półork">Półork</option>
          </select>
      </div>
      <div className="form-group">
        <label>Wzrost:</label>
          <input type="text" value={height} onChange={e => setHeight(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Waga:</label>
          <input type="text" value={weight} onChange={e => setWeight(e.target.value)} required />
      </div>
        <div className="form-group">
        <label>Klasa:</label>
          <select value={characterClass} onChange={e => setCharacterClass(e.target.value)} required>
            <option value="">Wybierz klasę</option>
            <option value="Barbarzyńca">Barbarzyńca</option>
            <option value="Bard">Bard</option>
            <option value="Czarownik">Czarownik</option>
            <option value="Druid">Druid</option>
            <option value="Kleryk">Kleryk</option>
            <option value="Łotr">Łotr</option>
            <option value="Łowca">Łowca</option>
            <option value="Mag">Mag</option>
            <option value="Mnich">Mnich</option>
            <option value="Paladyn">Paladyn</option>
            <option value="Wojownik">Wojownik</option>
            <option value="Zaklinacz">Zaklinacz</option>
          </select>
        </div>
        <div className="buttons">
            <button type="submit">Stwórz Postać</button>
            <button type="button" onClick={onClose}>Zamknij</button>
        </div>
      </form>
    </div>
    );
};

export default CreateCharacterForm;
