// CampaignDropdown.js

import React, { useState } from 'react';
import './CampaignDropdown.css'; // Stwórz odpowiedni plik CSS

const CampaignDropdown = ({ onNewCampaignClick, onMyCampaignsClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="campaign-dropdown">
      <div className="menu-item" onClick={toggleVisibility}>
        Kampania
      </div>
      {isVisible && (
        <div id="dropdown-content">
          <div className="dropdown-item" onClick={onNewCampaignClick}>
            Nowa Kampania
          </div>
          <div className="dropdown-item" onClick={onMyCampaignsClick}>
            Moje Kampanie
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDropdown;
