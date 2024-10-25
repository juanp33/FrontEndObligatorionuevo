import React, { useState } from 'react';
import axios from 'axios';
import MasterPage from './masterPage'; // Asegúrate de ajustar la ruta según tu proyecto.
import '../styles/registro.css'; // Archivo de estilos con los ajustes necesarios.

const PaginaRegistro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('https://backendobligatoriospringboot-production.up.railway.app/api/auth/register', {
        username,
        password,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'NacionalNacional'
        }
      });
      setMessage('Usuario registrado exitosamente');
      setError('');
      
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
    } catch (err) {
      setError('Error al registrar usuario: ' + (err.response?.data || 'Inténtalo de nuevo más tarde'));
      setMessage('');
    }
  };

  return (
    <MasterPage>
      <div className="registro-container">
        <button className="back-button" onClick={() => window.history.back()}>⬅️</button>
        <div className="tarjeta-registro">
          <div className="icono-persona">
            <span role="img" aria-label="icono persona">👤➕</span>
          </div>
          <form className="formulario-registro" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre usuario"
              className="input-registro"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="input-registro"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Repetir contraseña"
              className="input-registro"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Gmail"
              className="input-registro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="boton-registrarse">Registrarse</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </MasterPage>
  );
};

export default PaginaRegistro;