import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Kartapostaci.css';

Modal.setAppElement('#root');

const CalendarModal = ({ onClose, selectedDate, onDateChange, events, onSaveEvent, onDeleteEvent }) => {
    const [eventText, setEventText] = useState('');
    const dateString = selectedDate.toISOString().slice(0, 10);
  
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
