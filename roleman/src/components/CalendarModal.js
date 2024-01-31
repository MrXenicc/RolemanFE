import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Kartapostaci.css';

Modal.setAppElement('#root');

const CalendarModal = ({ onClose, selectedDate, onDateChange, events, onSaveEvent, onDeleteEvent, campaignId }) => {
    const [eventText, setEventText] = useState('');
    const dateString = selectedDate.toISOString().slice(0, 10);
    const [weather, setWeather] = useState(null);
    const [isWeatherRequested, setIsWeatherRequested] = useState(false);
    const username = localStorage.getItem('username');
  
    const handleDateSelect = (date) => {
      onDateChange(date);
      setEventText(events[date.toISOString().slice(0, 10)] || '');
    };
  
    const handleSaveEvent = () => {
        onSaveEvent(selectedDate, eventText);
        setEventText('');
    };

    const handleDeleteEvent = (eventIndex) => {
        onDeleteEvent(selectedDate, eventIndex);
    };


  const fetchWeather = () => {
      const weatherApiUrl = `${process.env.REACT_APP_ROLEMAN_BE}/weather?campaignId=${encodeURIComponent(campaignId)}&username=${encodeURIComponent(username)}`; // Adres URL do twojego backendu
      setIsWeatherRequested(true); 
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Error: No token found');
        return;
      }
    fetch(weatherApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data.message)) {
        setWeather(data.message);
      } else {
        // Jeśli data.message nie jest tablicą, ale chcesz wyświetlić komunikat jako element listy
        setWeather([data.message]);
      }
      console.log(data);// Wyloguj dane, aby zobaczyć, co otrzymujesz
      setIsWeatherRequested(true); 
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
    });
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
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
          transform: 'translate(-50%, -50%)',
          width: '20%', // Zwiększ szerokość modala
          height: 'auto', // Wysokość dostosowana do zawartości
          overflow: 'visible', // Pozwól na przewijanie jeśli zawartość wykracza poza modal
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white', 
          borderRadius: '10px',
          borderColor: 'black',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        },
      }}
    >
      <h2 style={{ color: 'white' }}>Kalendarz</h2>
      <DatePicker
        selected={selectedDate}
        onChange={date => onDateChange(date)}
        inline
      />
      <div style={{ width: '100%' }}>
        <input
          type="text"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Dodaj wydarzenie"
        />
         <button 
        onClick={handleSaveEvent}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Zmień na wybrany kolor tła przycisku
          color: 'white', // Zmień na wybrany kolor tekstu przycisku
          border: 'none', // Usunięcie obramowania
          padding: '10px', // Padding dla przycisku
          margin: '10px', // Margines wokół przycisku
          // Inne style dla przycisku
        }}
        >
        Zapisz Wydarzenie
        </button>
         <ul>
      {events[dateString] && events[dateString].map((event, index) => (
        <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
          {event}
          <button onClick={() => handleDeleteEvent(index)} 
                  style={{ 
                    color: 'red', 
                    background: 'none', 
                    border: 'none', 
                    padding: '0.2em',
                    marginLeft: '10px',
                    cursor: 'pointer'
                  }}>
            &#10060; {/* Unicode'owy znak krzyża */}
          </button>
        </li>
      ))}
    </ul>
      </div>
      <button onClick={fetchWeather}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        color: 'white', 
        border: 'none', 
        padding: '10px', 
        margin: '10px', 
      }}
      >
      Generuj Pogodę
      </button>
      {
        isWeatherRequested && weather && (
          <div style={{ color: 'white', marginTop: '20px' }}>
            Dzisiejsza pogoda: {weather.map((item, index) => <div key={index}>{item}</div>)}
          </div>
        )
      }
      <button 
      onClick={onClose}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        color: 'white', 
        border: 'none', 
        padding: '10px', 
        margin: '10px', 
      }}
      >
      Zamknij
      </button>
    </Modal>
  );
};

export default CalendarModal;
