import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LoginForm from './components/Loginform';
import RegisterForm from './components/RegisterForm';
import CalendarModal from './components/CalendarModal';
//import CreateCharacterForm from './components/CreateCharacterForm';
import EncounterPopup from './components/EncounterPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Sidebar.css'
import tlo1 from './tło1.png';

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
        <Sidebar onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} onCalendarClick={handleCalendarClick} onGenerateEncounter={showEncounterPopup} />
        {showCalendar && (
        <CalendarModal
          onClose={() => setShowCalendar(false)}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          events={events}
          onSaveEvent={saveEvent}
          onDeleteEvent={deleteEvent}
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
          <img src="/Logo1.png" alt="Roleman Logo" style={{ width: '200px', height: 'auto' }} />
          ) : (
          <div></div> // Możesz tu umieścić spinner ładowania lub inny placeholder
        )}
          <img
          src="/Logo1.png"
          alt="Roleman Logo"
          onLoad={() => setLogoLoaded(true)}
          style={{ display: 'none' }} // Obraz jest niewidoczny, służy tylko do załadowania
          />
        </header>
      </div>
    );
  }
export default App;
