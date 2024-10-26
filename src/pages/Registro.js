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

    // Verificar si las contraseñas coinciden antes de enviar la solicitud
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Realizar la solicitud POST a la API de registro
      const response = await axios.post(
        'http://localhost:8080/api/usuarios/registrar', 
        {
          username,
          password,
          email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // Si necesitas enviar cookies, descomenta la siguiente línea:
          // withCredentials: true,
        }
      );

      // Manejo de la respuesta exitosa
      if (response.status === 201) {
        setMessage('Usuario registrado exitosamente');
        setError('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
      } else {
        setError('Error inesperado, intente nuevamente.');
        setMessage('');
      }
    } catch (err) {
      // Manejo de errores con una respuesta específica
      if (err.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado fuera del rango de 2xx
        setError('Error al registrar usuario: ' + err.response.data.message || 'Inténtalo de nuevo más tarde');
      } else if (err.request) {
        // La solicitud fue hecha pero no hubo respuesta
        setError('Error de conexión: no se pudo contactar con el servidor');
      } else {
        // Algo pasó al configurar la solicitud
        setError('Error: ' + err.message);
      }
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
