import React from 'react';
import MasterPage from './masterPage';  
import '../styles/PaginaCajero.css';

const PaginaCajero = () => {
  return (
    <MasterPage>
      <div className="content">
        <div className="card">
          <h2 className="card-title">CAJERO</h2>
          <p className="card-text">Ingrese monto a depositar:</p>
          <div className="deposit-section">
            <span className="currency">$</span>
            <input type="text" value="50" className="input-box" />
          </div>
          <p className="limit-text">(tope: $1000)</p>
          <button className="deposit-button">DEPOSITAR</button>
          <button className="withdraw-button">RETIRAR</button>
        </div>
      </div>
    </MasterPage>
  );
};

export default PaginaCajero;
