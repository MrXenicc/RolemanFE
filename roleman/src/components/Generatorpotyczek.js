import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Generatorpotyczek.css'; // Upewnij się, że ścieżka do pliku CSS jest poprawna

const EncounterGeneratorDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [teamSize, setTeamSize] = useState('');
  const [teamLevel, setTeamLevel] = useState('');
  const [rarity, setRarity] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleGenerate = (event) => {
    event.preventDefault();
    // Logika generowania potyczki
    console.log(teamSize, teamLevel, rarity, difficulty);
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
    </div>
  );
};

export default EncounterGeneratorDropdown;
