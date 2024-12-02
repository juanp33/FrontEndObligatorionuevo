import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from '../utils/UseWebSocket';
import MasterPage from './masterPage'; 
import '../styles/lobbies.css'; 
import imagenPerfil from '../images/iconoPerfil.png'
const Lobbies = () => {
  const [lobbies, setLobbies] = useState([]);
  const navigate = useNavigate();
  const { client } = useWebSocket(); 

  
  const fetchLobbies = () => {
    fetch('http://localhost:8080/api/lobbies/activos')
      .then((response) => response.json())
      .then((data) => setLobbies(data))
      .catch((error) => console.error('Error al obtener lobbies:', error));
  };

  useEffect(() => {
    fetchLobbies(); 
    
    if (client) {
      client.subscribe('/topic/lobbies', (message) => {
        const updatedLobbies = JSON.parse(message.body);
        setLobbies(updatedLobbies); 
      });
    }

    return () => {
      if (client) {
        client.unsubscribe('/topic/lobbies');
      }
    };
  }, [client]);

  const handleCreateLobby = () => {
    const newLobbyId = `lobby-${Date.now()}`;
    const username = localStorage.getItem('username');
    
    fetch(`http://localhost:8080/api/lobbies/crear?lobbyId=${newLobbyId}&jugador=${username}`, {
      method: 'POST'
    })
    .then(() => {
      alert(`Lobby ${newLobbyId} creado`);
      navigate(`/lobby/${newLobbyId}`); 
    })
    .catch((error) => console.error('Error al crear el lobby:', error));
  };

  const handleJoinLobby = (lobbyId) => {
    const username = localStorage.getItem('username');
    
    fetch(`http://localhost:8080/api/lobbies/unir?lobbyId=${lobbyId}&jugador=${username}`, { method: 'POST' })
      .then((response) => response.text())
      .then((message) => {
        if (message === "Jugador añadido correctamente") {
          navigate(`/lobby/${lobbyId}`); 
        } else {
          alert(message); 
        }
      })
      .catch((error) => console.error('Error al unirse al lobby:', error));
  };

  return (
    <MasterPage>
      <div className="lobbies-container">
        <div className="header-title">
          Lobbies Activos
        </div>
        <div className="lobbies-grid">
          {lobbies.length > 0 ? (
            lobbies.map((lobby) => (
              <div className="lobby-card" key={lobby.id}>
                <div className="player-image">
                  <img src={imagenPerfil} alt={lobby.jugadores[0] || 'Avatar'} />
                </div>
                <p>{lobby.id}</p>
                <p>{lobby.jugadores[0] || 'NOMBRE'}</p>
                <button className="join-button" onClick={() => handleJoinLobby(lobby.id)}>
                  Unirse
                </button>
              </div>
            ))
          ) : (
            <p>No hay lobbies activos en este momento.</p>
          )}
        </div>
        <button className="create-lobby-button" onClick={handleCreateLobby}>
          Crear un Nuevo Lobby
        </button>
      </div>
    </MasterPage>
  );
};

export default Lobbies;
