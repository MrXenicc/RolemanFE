import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '30%', // Zwiększ szerokość modala
          height: 'auto', // Wysokość dostosowana do zawartości
          overflow: 'visible' // Pozwól na przewijanie jeśli zawartość wykracza poza modal
        },
      }}
    >
      <h2>Kalendarz</h2>
      <DatePicker
        selected={selectedDate}
        onChange={date => onDateChange(date)}
        inline
      />
      <div>
        <input
          type="text"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Dodaj wydarzenie"
        />
         <button onClick={handleSaveEvent}>Zapisz Wydarzenie</button>
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
      <button onClick={onClose}>Zamknij</button>
    </Modal>
  );
};

export default CalendarModal;
