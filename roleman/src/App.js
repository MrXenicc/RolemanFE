import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LoginForm from './components/Loginform';
import RegisterForm from './components/RegisterForm';
import CalendarModal from './components/CalendarModal';
//import CreateCharacterForm from './components/CreateCharacterForm';
import EncounterPopup from './components/EncounterPopup';
import Campaign from './components/Campaign';
import CampaignList from './components/CampaignList';
import Map from './components/Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Sidebar.css'
import tlo1 from './tło1.webp';

  const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState({});
    //const [showCreateCharacter, setShowCreateCharacter] = useState(false);
    const [isEncounterPopupVisible, setIsEncounterPopupVisible] = useState(false);
    const [encounterPopupData, setEncounterPopupData] = useState(null);
    const [backgroundLoaded, setBackgroundLoaded] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [showCampaignModal, setShowCampaignModal] = useState(false);
    const [campaignsVisible, setCampaignsVisible] = useState(false); // Dodane
    const [selectedCampaign, setSelectedCampaign] = useState(null); // Dodane
    const [campaigns, setCampaigns] = useState([]); // Dodane
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [isMapVisible, setIsMapVisible] = useState(false);
    

    // const handleLoginClick = () => {
    //   setShowLogin(true);
    //   setShowRegister(false);
    // };

    // const handleRegisterClick = () => {
    //   setShowRegister(true);
    //   setShowLogin(false);
    // };

    const handleCalendarClick = () => {
      setShowCalendar(true);
    };

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const saveEvent = (date, eventText) => {
      const dateString = date.toISOString().slice(0, 10);
      const updatedEvents = { ...events };
    
      if (updatedEvents[dateString]) {
        updatedEvents[dateString].push(eventText);
      } else {
        updatedEvents[dateString] = [eventText];
      }
    
      setEvents(updatedEvents);
    };

    const deleteEvent = (date, index) => {
      const dateString = date.toISOString().slice(0, 10);
      const updatedEvents = { ...events };
    
      // Usuń wydarzenie z listy
      if (updatedEvents[dateString]) {
        updatedEvents[dateString].splice(index, 1);
        // Jeśli nie ma więcej wydarzeń, usuń klucz z obiektu
        if (updatedEvents[dateString].length === 0) {
          delete updatedEvents[dateString];
        }
      }
    
      setEvents(updatedEvents);
    };

    const showEncounterPopup = (data) => {
      setEncounterPopupData(data);
      setIsEncounterPopupVisible(true);
    };

    const hideEncounterPopup = () => {
      setIsEncounterPopupVisible(false);
    };

    const handleNewCampaignClick = () => {
      setShowCampaignModal(true); // Pokaż modal z formularzem
    };
  
    const handleMyCampaignsClick = () => {
      const username = localStorage.getItem('username'); // Pobierz nazwę użytkownika z localStorage
    if (username) {
      setCampaignsVisible(!campaignsVisible); // Przełącz widoczność listy kampanii
    } else {
      // Możesz dodać tutaj obsługę logiki, jeśli username nie jest dostępne
      console.log('No username found. Please log in.');
    }
  };

    const handleSelectCampaign = (campaignId) => {
      setSelectedCampaignId(campaignId);
    };

    const handleCampaignsUpdated = (updatedCampaigns) => {
      setCampaigns(updatedCampaigns);
    };

    const handleEditCampaign = (campaignId) => {
      const campaignToEdit = campaigns.find(c => c.id === campaignId);
      if (campaignToEdit) {
        setSelectedCampaign(campaignToEdit);
        setShowCampaignModal(true);
      } else {
        console.error('Campaign not found');
      }
    };

    const handleCampaignDeleted = () => {
      setCampaignsVisible(false); // Możesz chcieć chwilowo ukryć listę, jeśli to jest spójne z UX
      setCampaignsVisible(true); // Potem ponownie wyświetlić zaktualizowaną listę
    };

    const handleMapOpen = () => {
      setIsMapVisible(true);
    };

    const handleMapClose = () => {
      setIsMapVisible(false);
    };

    const updateCharacterLocation = (campaignId, x, y) => {
      // Update the character's location in the database using the PUT / endpoint
      fetch('/map-controller', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          currentLocation: { x, y }
        })
      })
          .then(response => {
            if (response.ok) {
              console.log('Character location updated successfully');
            } else {
              console.error('Failed to update character location');
            }
          })
          .catch(error => console.error('Error updating character location:', error));
    };


    return (
      <div className="App" style={{ 
        backgroundImage: backgroundLoaded ? `url(${tlo1})` : 'none', // 'none' to placeholder, możesz użyć innego tła jako fallback
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }} >
        <img
         src={tlo1}
         alt="Tło"
         onLoad={() => setBackgroundLoaded(true)}
         style={{ display: 'none' }} // Obraz jest niewidoczny, służy tylko do załadowania tła
        />
        <Sidebar onLoginClick={() => setShowLogin(true)} 
        onRegisterClick={() => setShowRegister(true)} 
        onCalendarClick={handleCalendarClick} 
        onGenerateEncounter={showEncounterPopup}
        onNewCampaignClick={handleNewCampaignClick}
        onMyCampaignsClick={handleMyCampaignsClick}
        onMapOpen={handleMapOpen}
        campaignId={selectedCampaignId}
         />
        {showCalendar && (
        <CalendarModal
          onClose={() => setShowCalendar(false)}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          events={events}
          onSaveEvent={saveEvent}
          onDeleteEvent={deleteEvent}
          onCampaignsUpdated={handleCampaignsUpdated}
          campaignId={selectedCampaignId}
        />
        )}
        {campaignsVisible && (
           <CampaignList 
           onEditCampaign={handleEditCampaign}
           onCampaignDeleted={handleCampaignDeleted}
           onCampaignsUpdated={handleCampaignsUpdated}
           campaigns={campaigns} // Przekazuje aktualną listę kampanii do CampaignList
           username={localStorage.getItem('username')} // Przekazuje nazwę użytkownika do CampaignList
           selectedCampaignId={selectedCampaignId}
           onSelectCampaign={handleSelectCampaign}
           onClose={() => setCampaignsVisible(false)}
         />
        )}
        {showCampaignModal && (
        <Campaign
          isOpen={showCampaignModal}
          onClose={() => {
            setShowCampaignModal(false);
            setSelectedCampaign(null); // Resetuj wybraną kampanię po zamknięciu modala
            handleCampaignsUpdated();
          }}
        campaignData={selectedCampaign}
        />
        )}
        {isMapVisible && (
            <Map
                isVisible={isMapVisible}
                onClose={handleMapClose}
                campaignId={selectedCampaignId} // Assuming this is the current campaign ID
                updateCharacterLocation={updateCharacterLocation}
            />
        )}

        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
        {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
        {isEncounterPopupVisible && (
        <>
          <div className="modal-backdrop" onClick={hideEncounterPopup}></div>
          <EncounterPopup data={encounterPopupData} onClose={hideEncounterPopup} />
        </>
        )}
        <header className="App-header">
        {logoLoaded ? (
          <img src="/Logo1.webp" alt="Roleman Logo" style={{ width: '200px', height: 'auto' }} />
          ) : (
          <div></div> // Możesz tu umieścić spinner ładowania lub inny placeholder
        )}
          <img
          src="/Logo1.webp"
          alt="Roleman Logo"
          onLoad={() => setLogoLoaded(true)}
          style={{ display: 'none' }} // Obraz jest niewidoczny, służy tylko do załadowania
          />
        </header>
      </div>
    );
  }
export default App;
