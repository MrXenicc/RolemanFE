import React, { useState } from 'react';

const CampaignList = ({ onEditCampaign, onCampaignDeleted, onCampaignsUpdated }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [usernameInput, setUsernameInput] = useState(''); // Stan dla przechowywania wprowadzonej nazwy użytkownika

  const fetchCampaigns = () => {
    const urlWithUsername = `${process.env.REACT_APP_ROLEMAN_BE}/campaign/all?username=${encodeURIComponent(usernameInput)}`;
    fetch(urlWithUsername, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setCampaigns(data);
        onCampaignsUpdated(data);
      })
      .catch(error => console.error('Error fetching campaigns:', error));
  };

  const handleDeleteCampaign = (campaignId) => {
    const urlWithCampaignId = `${process.env.REACT_APP_ROLEMAN_BE}/campaign/${campaignId}`;
    fetch(urlWithCampaignId, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting campaign');
        }
        return response.json();
      })
      .then(() => {
        const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
        setCampaigns(updatedCampaigns);
        onCampaignDeleted();
      })
      .catch(error => console.error('Error deleting campaign:', error));
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
