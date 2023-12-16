import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Generatorpotyczek.css';

const EncounterGeneratorDropdown = () => {
  const [teamSize, setTeamSize] = useState('');
  const [teamLevel, setTeamLevel] = useState('');
  const [rarity, setRarity] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleGenerate = (event) => {
    event.preventDefault();
    // Tutaj logika generowania potyczki z podanymi parametrami
    console.log(teamSize, teamLevel, rarity, difficulty);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-encounter-generator">
        Generator Potyczek
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form onSubmit={handleGenerate}>
          <Form.Group>
            <Form.Label>Ilość osób w drużynie</Form.Label>
            <Form.Control
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Poziom drużyny</Form.Label>
            <Form.Control
              type="number"
              value={teamLevel}
              onChange={(e) => setTeamLevel(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rzadkość</Form.Label>
            <Form.Control
              type="text"
              value={rarity}
              onChange={(e) => setRarity(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Trudność</Form.Label>
            <Form.Control
              type="text"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Generuj
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default EncounterGeneratorDropdown;
