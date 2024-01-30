import React, { useState } from 'react';
import './Loginform.css'

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_ROLEMAN_BE + '/authorization/login';

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
    fetch(apiUrl, requestOptions)
  .then(response => {
    // Odczytaj token z nagłówka 'Authorization'
    const authToken = response.headers.get('Authorization');
    if (authToken) {
      const token = authToken.split(' ')[1]; // Usuń 'Bearer' z ciągu
      // Zapisz token w localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      console.log('Login successful: Token saved');
      onClose(); // Zamknij formularz po zalogowaniu
    } else {
      console.error('Login failed: No token received');
    }
    return response.json();
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
        <div className="form-group">
        <button type="submit">Zaloguj się</button>
        </div>
      </form>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};

export default LoginForm;
