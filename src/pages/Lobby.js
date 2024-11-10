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
        <div className="players-chat-container">
          <div className="player-card player-card-left">
            <img src="path/to/player1.jpg" alt="Player 1" />
            <div className="player-name">JAMES WILLIAMS</div>
            <div className="player-record">RECORD<br />W: 0 L: 0</div>
          </div>

          <div className="chat-box">
            <div className="chat-text">
              Lorem ipsum dolor sit amet consectetur. Odio rhoncus proin duis pharetra condimentum nullam...
            </div>
            <button className="chat-button">Enviar mensaje</button>
          </div>

          <div className="player-card player-card-right">
            <img src="path/to/player2.jpg" alt="Player 2" />
            <div className="player-name">JAKE TRUMP</div>
            <div className="player-record">RECORD<br />W: 0 L: 0</div>
          </div>
        </div>
        <button className="start-game-button">Empezar partida</button>
      </div>
    </MasterPage>
  );
};

export default Lobby;
