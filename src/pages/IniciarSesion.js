import React, { useState } from 'react';
import axios from 'axios';
import MasterPage from './masterPage';
import '../styles/IniciarSesion.css';

function IniciarSesion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://backendobligatoriospringboot.railway.internal/api/login',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true, // Esto permite que el navegador maneje automáticamente las cookies de sesión
        }
      );

      console.log('Response data:', response.data);
      setError('');
      console.log('Inicio de sesión exitoso');
     
    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
        setError('Usuario o contraseña incorrectos');
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
        setError('No se recibió respuesta del servidor.');
      } else {
        console.error('Error during setup:', error.message);
        setError('Ocurrió un error durante la configuración.');
      }

      console.error('Unexpected error:', error.message);
    }
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  return (
    <MasterPage>
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">
            <span role="img" aria-label="user">👤</span>
          </div>
          <div className="login-inputs">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" onClick={handleLogin}>
            Iniciar sesión
          </button>
          <button className="register-button" onClick={handleRegister}>
            Registrarse
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </MasterPage>
  );
}

export default IniciarSesion;
