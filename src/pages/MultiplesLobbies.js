import React from 'react';
import MasterPage from './masterPage';
import '../styles/MultiplesLobbies.css';

const MultiplesLobbies = () => {
  return (
    <MasterPage>
      <div className="lobbies-container">
        <h1 className="titulo">preguntI.Ados</h1>
        <div className="tarjetas-container">
          <div className="tarjeta-lobby">
            <img src="url-a-la-imagen" alt="James Williams" className="imagen" />
            <h2 className="nombre">Juancho</h2>
            <button className="boton-unirse">Unirse</button>
          </div>
          <div className="tarjeta-lobby">
            <img src="url-a-la-imagen" alt="Nombre" className="imagen" />
            <h2 className="nombre">Colo</h2>
            <button className="boton-unirse">Unirse</button>
          </div>
          <div className="tarjeta-lobby">
            <img src="url-a-la-imagen" alt="Nombre" className="imagen" />
            <h2 className="nombre">Guille</h2>
            <button className="boton-unirse">Unirse</button>
          </div>
        </div>
      </div>
    </MasterPage>
  );
};

export default MultiplesLobbies;
