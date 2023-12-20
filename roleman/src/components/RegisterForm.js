import React, { useState } from 'react';
import './RegisterForm.css'

const RegisterForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Dane do rejestracji
    const registrationData = {
      username: username,
      email: email,
      password: password
    };
  
    // Opcje żądania HTTP
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    };
  
    // Wywołanie API
    fetch('http://143.198.111.58/authorization/register', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Response not OK');
        }
        return response.json();
      })
      .then(data => {
        console.log('Registration successful:', data);
        onClose(); // Zamknij formularz po rejestracji
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-email">Email:</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Hasło:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Zarejestruj się</button>
      </form>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};

export default RegisterForm;
