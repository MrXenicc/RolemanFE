import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Campaign = ({ isOpen, onClose, campaignData  }) => {
  // Rozróżnienie między nową kampanią a edycją istniejącej
  const isEditing = campaignData != null;
  
  // Ustawienie stanu początkowego na podstawie danych wejściowych lub pustych wartości
  const [campaign, setCampaign] = useState({
    campaignName: isEditing ? campaignData.campaignName : '',
    gameMaster: isEditing ? campaignData.gameMaster : '',
    players: isEditing ? campaignData.players : ['']
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCampaign({ ...campaign, [name]: value });
  };

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...campaign.players];
    newPlayers[index] = value;
    setCampaign({ ...campaign, players: newPlayers });
  };

  const addPlayerField = () => {
    if(campaign.players.length < 20) {
      setCampaign({ ...campaign, players: [...campaign.players, ''] });
    }
  };

  const removePlayerField = (index) => {
    const newPlayers = campaign.players.filter((_, i) => i !== index);
    setCampaign({ ...campaign, players: newPlayers });
  };

  const saveCampaign = () => {
    
    // Zbuduj obiekt z danymi kampanii
    const campaignData = {
      campaignName: campaign.campaignName,
      gameMasterUsername: campaign.gameMaster,
      playersUsernames: campaign.players
    };
  
    const token = localStorage.getItem('token'); // Pobierz token z localStorage
      if (!token) {
        console.error('Error: No token found');
        return;
      }
    // Opcje żądania HTTP
    const method = isEditing ? 'PUT' : 'POST'; // Użycie PUT dla edycji i POST dla nowej kampanii
    const apiUrl = isEditing
      ? `${process.env.REACT_APP_ROLEMAN_BE}/campaign/${campaignData.id}`
      : `${process.env.REACT_APP_ROLEMAN_BE}/campaign`;

    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(campaignData)
    };
  
    // Endpoint API dla kampanii
   // const apiUrl = process.env.REACT_APP_ROLEMAN_BE + '/campaign'; // Zaktualizuj URL, jeśli to potrzebne
  
    // Wywołanie API
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Campaign saved:', data);
        onClose(); // Możesz zamknąć modal po udanym zapisie
      })
      .catch(error => {
        console.error('Saving campaign failed:', error);
      });
  };
  
  // Dodaj wywołanie saveCampaign w obsłudze handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    saveCampaign(); // Wywołaj funkcję zapisującą kampanię
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}
    style={{
      overlay: {
        backgroundColor: 'none',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        marginBottom: '10px',
        transform: 'translate(-50%, -50%)',
        width: '20%', // Możesz dostosować szerokość modala
        height: 'auto', // Wysokość dostosowana do zawartości
        overflow: 'visible', // Pozwól na przewijanie jeśli zawartość wykracza poza modal
        background: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'black',
        color: 'white',
        borderRadius: '10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      },
    }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Nazwa Kampanii:
          <input name="campaignName" value={campaign.campaignName} onChange={handleInputChange} />
        </label>
        <label>
          Mistrz Gry:
          <input name="gameMaster" value={campaign.gameMaster} onChange={handleInputChange} />
        </label>
        {campaign.players.map((player, index) => (
          <div key={index}>
            <label>
              Gracz {index + 1}:
              <input
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
              />
              {index !== 0 && (
                <button type="button" onClick={() => removePlayerField(index)}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px', 
                  margin: '10px', 
                }}
                >
                  Usuń
                </button>
              )}
            </label>
          </div>
        ))}
        {campaign.players.length < 20 && (
          <button type="button" onClick={addPlayerField}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            color: 'white', 
            border: 'none', 
            padding: '5px', 
            margin: '10px', 
          }}
          >
            Dodaj kolejnego gracza
          </button>
        )}
        <button type="submit"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          color: 'white', 
          border: 'none', 
          padding: 'px', 
          margin: '10px', 
        }}
        >Zapisz Kampanię</button>
      </form>
      <button onClick={onClose}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        color: 'white', 
        border: 'none', 
        padding: '5px', 
        margin: '10px', 
      }}
      >Zamknij</button>
    </Modal>
  );
};

export default Campaign;