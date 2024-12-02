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
        'http://localhost:8080/api/usuarios/login',
        {
          username: username,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      
      const loginResponse = response.data;
      localStorage.setItem('mensaje', loginResponse.mensaje);
      localStorage.setItem('username', loginResponse.nombreUsuario);
      localStorage.setItem('email', loginResponse.email);
      localStorage.setItem('monto', loginResponse.montoSaldo);
      localStorage.setItem('puntajeMAX',loginResponse.jugadorMaxPuntuacion)
      localStorage.setItem('jugadorVictorias', loginResponse.victorias)
      localStorage.setItem('jugadorDerrotas', loginResponse.derrotas)
      setError('');
      console.log('Inicio de sesión exitoso:', loginResponse);

    
      window.location.href = '/jugar'; 
    } catch (error) {
      if (error.response) {
        setError('Usuario o contraseña incorrectos');
      } else if (error.request) {
        setError('No se recibió respuesta del servidor.');
      } else {
        setError('Ocurrió un error durante la configuración.');
      }
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
