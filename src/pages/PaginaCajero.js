import React, { useState } from 'react';
import MasterPage from '../pages/masterPage';  
import '../styles/PaginaCajero.css';
import { useNavigate } from 'react-router-dom';

const PaginaCajero = () => {
  const [monto, setMonto] = useState(50);  
  const [showModal, setShowModal] = useState(false); 
  const [mensaje, setMensaje] = useState(''); 
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

      
      const montoaSumar = parseInt(localStorage.getItem("monto"), 10) || 0;
      const montoFinal = montoaSumar + monto;
      localStorage.setItem("monto", montoFinal);

      setMensaje('');  
      setShowModal(true); 
    } catch (error) {
      setMensaje('Error al realizar el depósito.'); 
      setShowModal(false); 
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

      
      const montoaRestar = parseInt(localStorage.getItem("monto"), 10) || 0;
      const montoFinal = montoaRestar - monto;
      localStorage.setItem("monto", montoFinal);

      setMensaje('Retiro realizado con éxito.');
    } catch (error) {
      setMensaje('Error al realizar el retiro.');
    }
  };

  const handleRetryTransaction = () => {
    setShowModal(false); 
    setMonto(50); 
  };

  const handleBackToMenu = () => {
    navigate('/jugar'); 
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
          {mensaje && <p className="response-message">{mensaje}</p>} 
        </div>
      </div>

      {}
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
}

export default PaginaCajero;
