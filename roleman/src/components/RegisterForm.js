import React, { useState } from 'react';
import './RegisterForm.css'

const RegisterForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Tutaj możesz obsłużyć rejestrację, np. wywołać API
    console.log(email, confirmEmail, nickname, password);
    onClose(); // Zamknij formularz po rejestracji (opcjonalnie)
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="confirm-email">Powtórz email:</label>
          <input
            type="email"
            id="confirm-email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nick:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
