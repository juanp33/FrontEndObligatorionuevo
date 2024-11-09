import React, { useState } from 'react';
import MasterPage from '../pages/masterPage';  
import '../styles/PaginaCajero.css';
import { useNavigate } from 'react-router-dom';

const PaginaCajero = () => {
  const [monto, setMonto] = useState(50);  // Estado para el monto
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal de depósito exitoso
  const [mensaje, setMensaje] = useState(''); // Mensaje de respuesta en la interfaz principal
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleDeposit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cajero/depositar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, monto }), 
      });

      // Actualizar el monto en el localStorage
      const montoaSumar = parseInt(localStorage.getItem("monto"), 10) || 0;
      const montoFinal = montoaSumar + monto;
      localStorage.setItem("monto", montoFinal);

      setMensaje('');  // Limpiar el mensaje anterior
      setShowModal(true); // Mostrar el modal de éxito
    } catch (error) {
      setMensaje('Error al realizar el depósito.'); // Mostrar mensaje de error en la interfaz
      setShowModal(false); // Si hay error, asegurarse de que el modal no se muestre
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cajero/retirar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, monto }), 
      });

      // Actualizar el monto en el localStorage
      const montoaRestar = parseInt(localStorage.getItem("monto"), 10) || 0;
      const montoFinal = montoaRestar - monto;
      localStorage.setItem("monto", montoFinal);

      setMensaje('Retiro realizado con éxito.');
    } catch (error) {
      setMensaje('Error al realizar el retiro.');
    }
  };

  const handleRetryTransaction = () => {
    setShowModal(false); // Cerrar el modal y permitir hacer otra transacción
    setMonto(50); // Reiniciar monto por defecto
  };

  const handleBackToMenu = () => {
    navigate('/jugar'); // Volver al menú principal
  };

  return (
    <MasterPage>
      <div className="content">
        <div className="card">
          <h2 className="card-title">CAJERO</h2>
          <p className="card-text">Ingrese monto a depositar:</p>
          <div className="deposit-section">
            <span className="currency">$</span>
            <input 
              type="number" 
              value={monto} 
              onChange={(e) => setMonto(e.target.value)} 
              className="input-box" 
            />
          </div>
          <p className="limit-text">(tope: $1000)</p>
          <div className="button-group">
            <button className="deposit-button" onClick={handleDeposit}>DEPOSITAR</button>
            <button className="withdraw-button" onClick={handleWithdraw}>RETIRAR</button>
          </div>
          {mensaje && <p className="response-message">{mensaje}</p>} {/* Mostrar error si ocurre */}
        </div>
      </div>

      {/* Modal de éxito del depósito */}
      {showModal && (
  <div className="modal-container">
    <div className="modal">
      <h2>DEPÓSITO EXITOSO</h2>
      <p>¡Tu depósito se realizó correctamente!</p>
      <div className="button-group">
        <button className="retry-button" onClick={handleRetryTransaction}>Hacer otra transacción</button>
        <button className="back-button" onClick={handleBackToMenu}>Volver al menú</button>
      </div>
    </div>
  </div>
)}
    </MasterPage>
  );
};

export default PaginaCajero;
