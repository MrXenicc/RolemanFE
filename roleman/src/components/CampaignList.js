import React, { useState } from 'react';

const CampaignList = ({ onEditCampaign, onCampaignDeleted, onCampaignsUpdated }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [usernameInput, setUsernameInput] = useState(''); // Stan dla przechowywania wprowadzonej nazwy użytkownika

  const fetchCampaigns = () => {
    const token = localStorage.getItem('token'); // Pobierz token z localStorage
    const urlWithUsername = `${process.env.REACT_APP_ROLEMAN_BE}/campaign/all?username=${encodeURIComponent(usernameInput)}`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Dodaj nagłówek autoryzacji
      },
    };

    fetch(urlWithUsername, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCampaigns(data);
        onCampaignsUpdated(data);
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
      });
  };

  const handleDeleteCampaign = (campaignId) => {
    const token = localStorage.getItem('token'); // Pobierz token z localStorage
    const urlWithCampaignId = `${process.env.REACT_APP_ROLEMAN_BE}/campaign/${campaignId}`;

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Dodaj nagłówek autoryzacji
      },
    };

    fetch(urlWithCampaignId, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
        setCampaigns(updatedCampaigns);
        onCampaignDeleted();
      })
      .catch(error => {
        console.error('Error deleting campaign:', error);
      });
  };

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    fetchCampaigns();
  };

  return (
    <div>
      <form onSubmit={handleUsernameSubmit}>
        <label>
          Nazwa użytkownika:
          <input
            type="text"
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
            required
          />
        </label>
        <button type="submit">Pobierz kampanie</button>
      </form>
      {campaigns.map(campaign => (
        <div key={campaign.id}>
          <h3>{campaign.campaignName}</h3>
          <p>Mistrz Gry: {campaign.gameMasterUsername}</p>
          <p>Gracze: {campaign.playersUsernames.join(', ')}</p>
          <button onClick={() => onEditCampaign(campaign.id)}>Edytuj</button>
          <button onClick={() => handleDeleteCampaign(campaign.id)}>Usuń</button>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
