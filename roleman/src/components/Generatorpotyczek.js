import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import EncounterPopup from './EncounterPopup';
import './Generatorpotyczek.css'; // Upewnij się, że ścieżka do pliku CSS jest poprawna

const EncounterGeneratorDropdown = ({ onGenerateEncounter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [teamSize, setTeamSize] = useState('');
  const [teamLevel, setTeamLevel] = useState('');
  const [enemySize, setEnemySize] = useState('');
  const [rarity, setRarity] = useState('COMMON');
  const [difficulty, setDifficulty] = useState('EASY');
  const [showEncounterPopup, setShowEncounterPopup] = useState(false);
  const [encounterData, setEncounterData] = useState(null);
  const rarities = ["COMMON", "UNCOMMON", "RARE", "VERYRARE", "LEGENDARY"];
  const difficulties = ["EASY", "MEDIUM", "HARD", "DEADLY"];
  const apiUrl = process.env.REACT_APP_ROLEMAN_BE + '/generator/generate';

const handleGenerate = (event) => {
  event.preventDefault();
  
  const token = localStorage.getItem('token'); // Pobierz token z localStorage
    if (!token) {
      console.error('Error: No token found');
      return;
    }

  // Here we are assuming that the generatedEncounterData is shaped according to the GeneratorDto schema.
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      numberOfPlayers: parseInt(teamSize),
      teamLevel: parseInt(teamLevel),
      numberOfEnemies: parseInt(enemySize),
      rarity: rarity,
      difficulty: difficulty
    })
  };

  // Replace 'your-backend-endpoint' with the actual endpoint where you want to send the data
  fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('Encounter generated:', data);
      setEncounterData(data); // Set the encounter data with the response from the backend
      console.log('showEncounterPopup:', showEncounterPopup);
      onGenerateEncounter(data); // Show encounter popup with the new data
    })
    .catch(error => {
      console.error('Error generating encounter:', error);
    });
};  

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  return (
    <div>
      <div className="menu-item" onClick={toggleVisibility}>
        Generator Potyczek
      </div>
      {isVisible && (
        <div id="encounter-generator-dropdown-content">
          <Form onSubmit={handleGenerate}>
            <Form.Group>
              <Form.Label>Ilość osób w drużynie</Form.Label>
              <Form.Control type="number" placeholder="Wpisz ilość osób" min="1" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Poziom drużyny</Form.Label>
              <Form.Control type="number" placeholder="Wpisz poziom drużyny" min="1" max="20" value={teamLevel} onChange={(e) => setTeamLevel(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ilość przeciwników</Form.Label>
              <Form.Control type="number" placeholder="Wpisz ilość przeciwników" min="1" value={enemySize} onChange={(e) => setEnemySize(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rzadkość</Form.Label>
              <Form.Select value={rarity} onChange={(e) => setRarity(e.target.value)}>
                {rarities.map(rarityOption => (
                  <option key={rarityOption} value={rarityOption}>{rarityOption}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Trudność</Form.Label>
              <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                {difficulties.map(difficultyOption => (
                  <option key={difficultyOption} value={difficultyOption}>{difficultyOption}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Generuj
            </Button>
          </Form>
        </div>
      )}
      {showEncounterPopup && encounterData && (
        <EncounterPopup data={encounterData} onClose={() => setShowEncounterPopup(false)} />
      )}
    </div>
  );
};

export default EncounterGeneratorDropdown;
