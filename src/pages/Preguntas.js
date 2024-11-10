import React from 'react';
import MasterPage from './masterPage';
import '../styles/Lobby.css';

const Lobby = () => {
  return (
    <MasterPage>
      <div className="lobby-container">
        <div className="header">
          <h1>preguntI.Ados</h1>
        </div>

        <div className="player-cards">
          <div className="player-card">
            <div className="player-image" />
            <h2>JAMES WILLIAMS</h2>
            <p>RECORD W: L:</p>
          </div>

          <div className="middle-panel">
            <div className="game-info">
              <p>
                Lorem ipsum dolor sit amet consectetur. Odio rhoncus proin duis pharetra condimentum nullam. A morbi
                aenean tempus faucibus integer id semper sed non. Lobortis tempus vitae urna commodo. 
              </p>
            </div>
            <button className="start-game-button">Empezar partida</button>
          </div>

          <div className="player-card">
            <div className="player-image" />
            <h2>JAKE TRUMP</h2>
            <p>RECORD W: L:</p>
          </div>
        </div>
      </div>
    </MasterPage>
  );
};

export default Lobby;
