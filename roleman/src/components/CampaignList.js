import React, { useState, useEffect } from 'react';
import './CampaignList.css'

const CampaignList = ({ onEditCampaign, onCampaignDeleted, onCampaignsUpdated, username, onClose, onSelectCampaign, selectedCampaignId }) => {
  const [campaigns, setCampaigns] = useState([]);
  

  const fetchCampaigns = () => {
    const token = localStorage.getItem('token'); // Pobierz token z localStorage
    const username = localStorage.getItem('username');
    const urlWithUsername = `${process.env.REACT_APP_ROLEMAN_BE}/campaign/all?username=${encodeURIComponent(username)}`;

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

  useEffect(() => {
    if (username) {
      fetchCampaigns();
    }
  }, [username]);

  const handleDeleteCampaign = (campaignId) => {
    const token = localStorage.getItem('token'); // Pobierz token z localStorage
    const username = localStorage.getItem('username');
    
    if (!token || !username) {
      console.error('No token or username found, please log in.');
      return; // Jeśli nie ma tokena lub nazwy użytkownika, nie kontynuuj dalej.
    }

    const url = `${process.env.REACT_APP_ROLEMAN_BE}/campaign?campaignId=${encodeURIComponent(campaignId)}&username=${encodeURIComponent(username)}`;
  
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    };
  
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Ponieważ odpowiedź może nie być w formacie JSON
      })
      .then(text => {
        console.log('Delete response:', text); // Może zwrócić pusty string jeśli nie ma treści
        const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
        setCampaigns(updatedCampaigns);
        onCampaignDeleted();
      })
      .catch(error => {
        console.error('Error deleting campaign:', error);
      });
  };

  const handleSelectCampaign = (campaignId) => {
    onSelectCampaign(campaignId);
  };

  return (
    <div className="campaign-list-container"> 
      {campaigns.map(campaign => (
        <div key={campaign.id} className={`campaign-item ${selectedCampaignId === campaign.id ? 'selected' : ''}`}>
          <h3 className={`campaign-header ${selectedCampaignId === campaign.id ? 'selected' : ''}`}>
          {campaign.campaignName}
          </h3>
          <p className="campaign-info">Mistrz Gry: {campaign.gameMasterUsername}</p> 
          <p className="campaign-info">Gracze: {campaign.playersUsernames.join(', ')}</p>
          <button onClick={() => handleSelectCampaign(campaign.id)} className="campaign-button">Wybierz</button> 
          <button onClick={() => onEditCampaign(campaign.id)} className="campaign-button">Edytuj</button> 
          <button onClick={() => handleDeleteCampaign(campaign.id)} className="campaign-button">Usuń</button> 
        </div>
      ))}
      <button onClick={onClose} className="close-button">Zamknij</button>
    </div>
  );
};

export default CampaignList;
