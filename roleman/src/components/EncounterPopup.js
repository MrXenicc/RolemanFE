// import React, { useState } from 'react';
// import './EncounterPopup.css'

// const EncounterPopup = ({ onClose }) => {
//   // Example state structure, you would replace this with your actual data
//   const [encounterData, setEncounterData] = useState({
//     monsters: [],
//   });

//   const fetchEncounterData = () => {
//     // Placeholder URL, you need to replace it with your actual endpoint
//     fetch('http://your-api-endpoint/encounter/generate')
//       .then(response => response.json())
//       .then(data => {
//         setEncounterData(data);
//       })
//       .catch(error => {
//         console.error('Encounter generation failed:', error);
//       });
//   };

//   // Call this function when the "Generate" button is clicked
//   const handleGenerateClick = () => {
//     fetchEncounterData();
//   };

//   return (
//     <div className="popup-container" style={{ display: encounterData.monsters.length > 0 ? 'block' : 'none' }}>
//       {/* Iterate through the monsters and display their information */}
//       {encounterData.monsters.map((monster, index) => (
//         <div key={index} className="monster-info">
//           <img src={monster.imageUrl} alt={monster.name} />
//           <p>Name: {monster.name}</p>
//           <p>Count:{monster.count}</p>
//         </div>
//       ))}
//     <button onClick={onClose}>Close</button>
//     </div>
//   );
// };

// export default EncounterPopup;

import React from 'react';
import './EncounterPopup.css'; // Stwórz odpowiedni plik CSS

const EncounterPopup = ({ data, onClose }) => {
  if (!data || !data.monsters) {
    // Nie próbuj renderować zawartości komponentu, jeśli dane są niekompletne
    return null;
  }

  return (
   
<div className="encounter-popup">
      <div className="encounter-content">
        <h2>Wygenerowana Potyczka</h2>
        {data.monsters.map((monster, index) => (
          <div key={index} className="monster-info">
            <img className="monster-image" src={monster.imageUrl} alt={monster.name} />
            <p>{monster.name} - Ilość: {monster.count}</p>
          </div>
        ))}
        <button onClick={onClose} className="close-button">Zamknij</button>
      </div>
    </div>
  );
};
export default EncounterPopup;