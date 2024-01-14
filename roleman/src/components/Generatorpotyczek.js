import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import EncounterPopup from './EncounterPopup';
import './Generatorpotyczek.css'; // Upewnij się, że ścieżka do pliku CSS jest poprawna

const EncounterGeneratorDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [teamSize, setTeamSize] = useState('');
  const [teamLevel, setTeamLevel] = useState('');
  const [rarity, setRarity] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [showEncounterPopup, setShowEncounterPopup] = useState(false);
  const [encounterData, setEncounterData] = useState(null);

  const handleGenerate = (event) => {
    event.preventDefault();
    const generatedEncounterData = {
      monsters: [
        { name: 'Goblin', count: 3, imageUrl: '/images/goblin.png' },
        { name: 'Dragon', count: 1, imageUrl: '/images/dragon.png' },
      ],
    // // Logika generowania potyczki
    // console.log(teamSize, teamLevel, rarity, difficulty);
  };
  setEncounterData(generatedEncounterData);
  setShowEncounterPopup(true); // Pokaż okienko potyczki
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
              <Form.Control type="text" placeholder="Wpisz ilość osób" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Poziom drużyny</Form.Label>
              <Form.Control type="text" placeholder="Wpisz poziom drużyny" value={teamLevel} onChange={(e) => setTeamLevel(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rzadkość</Form.Label>
              <Form.Control type="text" placeholder="Wpisz rzadkość" value={rarity} onChange={(e) => setRarity(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Trudność</Form.Label>
              <Form.Control type="text" placeholder="Wpisz trudność" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
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
