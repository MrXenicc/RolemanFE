// import React, { useState } from 'react';
// import './EncounterPopup.css'; // Stwórz odpowiedni plik CSS

// const EncounterPopup = ({ data, onClose }) => {
//   const [detailsVisible, setDetailsVisible] = useState(false);
//   if (!data || !data[0]) {
//     // Nie próbuj renderować zawartości komponentu, jeśli dane są niekompletne
//     return null;
//   }

//   const monster = data[0];

//   const toggleDetails = () => {
//     setDetailsVisible(!detailsVisible);
//   };

//   return (
//     <div className="encounter-popup">
//       <div className="encounter-content">
//         <h2>Wygenerowana Potyczka</h2>
//         <div className="monster-info">
//           <img className="monster-image" src={monster.image} alt={monster.name} />
//           <p>Nazwa: {monster.name} - Ilość: {monster.number}</p>
//           <p>Rzadkość: {monster.rarity} - CR: {monster.cr}</p>
//           <button onClick={toggleDetails} className="details-button">
//             {detailsVisible ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}
//           </button>
//           {detailsVisible && (
//             <div className="monster-details">
//               <div className="character-sheet">
//                 <p>Siła: {monster.characterSheet.strength}</p>
//                 <p>Zręczność: {monster.characterSheet.dexterity}</p>
//                 <p>Wytrzymałość: {monster.characterSheet.constitution}</p>
//                 <p>Inteligencja: {monster.characterSheet.intelligence}</p>
//                 <p>Mądrość: {monster.characterSheet.wisdom}</p>
//                 <p>Charyzma: {monster.characterSheet.charisma}</p>
//                 <p>Klasa Pancerza: {monster.characterSheet.armorClass}</p>
//                 <p>Inicjatywa: {monster.characterSheet.initiative}</p>
//                 <p>Szybkość: {monster.characterSheet.speed}</p>
//                 <p>HP: {monster.characterSheet.hp}</p>
//                 <p>Obrażenia: {monster.characterSheet.damage}</p>
//               </div>
//               <p>Opis: {monster.description}</p>
//               </div>
//           )}
//         </div>
//         <button onClick={onClose} className="close-button">Zamknij</button>
//       </div>
//     </div>
//   );
// };

// export default EncounterPopup;

import React, { useState } from 'react';
import './EncounterPopup.css';

const EncounterPopup = ({ data, onClose }) => {
  const [detailsVisible, setDetailsVisible] = useState(new Array(data.length).fill(false));

  if (!data || data.length === 0) {
    return null;
  }

  const toggleDetails = (index) => {
    setDetailsVisible(detailsVisible.map((detail, i) => i === index ? !detail : detail));
  };

  return (
    <div className="encounter-popup">
      <div className="encounter-content">
        <h2>Wygenerowana Potyczka</h2>
        <div className="monsters-container">
          {data.map((monster, index) => (
            <div key={index} className="monster-info">
              <img className="monster-image" src={monster.image} alt={monster.name} />
              <p>Nazwa: {monster.name} - Ilość: {monster.number}</p>
              <p>Rzadkość: {monster.rarity} - CR: {monster.cr}</p>
              <button onClick={() => toggleDetails(index)} className="details-button">
                {detailsVisible[index] ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}
              </button>
              {detailsVisible[index] && (
                <div className="monster-details">
                  {/* Tutaj szczegóły potwora */}
                  <div className="character-sheet">
                    <p>Siła: {monster.characterSheet.strength}</p>
                    <p>Zręczność: {monster.characterSheet.dexterity}</p>
                    <p>Wytrzymałość: {monster.characterSheet.constitution}</p>
                    <p>Inteligencja: {monster.characterSheet.intelligence}</p>
                    <p>Mądrość: {monster.characterSheet.wisdom}</p>
                    <p>Charyzma: {monster.characterSheet.charisma}</p>
                    <p>Klasa Pancerza: {monster.characterSheet.armorClass}</p>
                    <p>Inicjatywa: {monster.characterSheet.initiative}</p>
                    <p>Szybkość: {monster.characterSheet.speed}</p>
                    <p>HP: {monster.characterSheet.hp}</p>
                    <p>Obrażenia: {monster.characterSheet.damage}</p>
                  </div>
                  <p>Opis: {monster.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="close-button-container">
        <button onClick={onClose} className="close-button">Zamknij</button>
      </div> */}
    </div>
  );
};

export default EncounterPopup;
