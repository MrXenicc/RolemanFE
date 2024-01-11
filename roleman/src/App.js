import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LoginForm from './components/Loginform';
import RegisterForm from './components/RegisterForm';
import CalendarModal from './components/CalendarModal';
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

    const handleLoginClick = () => {
      setShowLogin(true);
      setShowRegister(false);
    };

    const handleRegisterClick = () => {
      setShowRegister(true);
      setShowLogin(false);
    };

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

    return (
      <div className="App" style={{ backgroundImage: `url(${tlo1})`}} >
        <Sidebar onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} onCalendarClick={handleCalendarClick} />
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
        <header className="App-header">
          <img src="/Logo1.png" alt="Roleman Logo" style={{ width: '200px', height: 'auto' }} />
        </header>
      </div>
    );
  }
export default App;
