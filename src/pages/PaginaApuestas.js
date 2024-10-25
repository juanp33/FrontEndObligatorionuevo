import React from 'react';
import MasterPage from './masterPage';
import '../styles/paginaApuestas.css';

// Componente PaginaApuestas
const PaginaApuestas = () => {
  return (
    <MasterPage>
    
      {/* Categoría Seleccionada */}
      
      <div className="content">
        {/* Categoría Seleccionada */}
        <div className="category-section">
          <h2 className="category-text">LA CATEGORIA SELECCIONADA ES :</h2>
          <div className="category-box">
            <span className="category-icon">🌍</span>
            <span className="category-name">GEOGRAFIA</span>
          </div>
        </div>

        {/* Betting Section */}
        <div className="betting-section">
          <div className="slider-container">
            <div className="amount-indicator">
              <span>$5</span>
            </div>
            <input type="range" className="bet-slider" min="0" max="50" step="5" />
          </div>

          <div className="balance-info">
            <div className="balance-box">
              <span>SALDO $50</span>
            </div>
            <div className="pot-box">
              <span>POZO $80</span>
            </div>
          </div>

          <div className="button-group">
            <button className="bet-button">APOSTAR</button>
            <button className="pass-button">PASAR</button>
          </div>
        </div>
      </div>
    
    </MasterPage>
  );
};

export default PaginaApuestas;
