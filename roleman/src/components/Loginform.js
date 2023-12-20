import React, { useState } from 'react';
import './Loginform.css'

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Dane do wysłania
    const loginData = {
      username: username,
      password: password,
    };
  
    // Opcje żądania HTTP
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    };
  
    // Wywołanie API
    fetch('http://143.198.111.58/authorization/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Login successful:', data);
        onClose(); // Zamknij formularz po zalogowaniu
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-Username">Nazwa użytkownika:</label>
          <input
            type="Username"
            id="login-Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Hasło:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Zaloguj się</button>
      </form>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};

export default LoginForm;
