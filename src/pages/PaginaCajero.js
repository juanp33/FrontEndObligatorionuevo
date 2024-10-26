import React, { useState } from 'react';
import MasterPage from './masterPage';  
import '../styles/PaginaCajero.css';

const PaginaCajero = () => {
  const [monto, setMonto] = useState(50);  // Estado para el monto
  const [mensaje, setMensaje] = useState(''); // Estado para mostrar el mensaje de respuesta
  const username = localStorage.getItem('username');
  const handleDeposit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cajero/depositar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, monto }), 
      });
      const montoaSumar=parseInt(localStorage.getItem("monto"), 10) || 0
      const montoFinal =  montoaSumar+monto
      localStorage.setItem("monto", monto+montoFinal)
      setMensaje( 'Depósito realizado con éxito.');
    } catch (error) {
      setMensaje('Error al realizar el depósito.');
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cajero/retirar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, monto }), // Cambia 'usuario1' por el nombre de usuario real
      });
      const montoaRestar=parseInt(localStorage.getItem("monto"), 10) || 0
      const montoFinal =  montoaRestar-monto
      localStorage.setItem("monto",montoFinal)
      setMensaje( 'Retiro realizado con éxito.');
    } catch (error) {
      setMensaje('Error al realizar el retiro.');
    }
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
          <button className="deposit-button" onClick={handleDeposit}>DEPOSITAR</button>
          <button className="withdraw-button" onClick={handleWithdraw}>RETIRAR</button>
          {mensaje && <p className="response-message">{mensaje}</p>}
        </div>
      </div>
    </MasterPage>
  );
};

export default PaginaCajero;