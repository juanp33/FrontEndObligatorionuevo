import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from './UseWebSocket';

const Lobbies = () => {
  const [lobbies, setLobbies] = useState([]);
  const navigate = useNavigate();
  const { client } = useWebSocket(); // Obtén el cliente WebSocket del hook

  // Función para obtener lobbies activos desde el servidor
  const fetchLobbies = () => {
    fetch('http://localhost:8080/api/lobbies/activos')
      .then((response) => response.json())
      .then((data) => setLobbies(data))
      .catch((error) => console.error('Error al obtener lobbies:', error));
  };

  useEffect(() => {
    fetchLobbies(); // Obtener lobbies al cargar el componente

    
    if (client) {
      client.subscribe('/topic/lobbies', (message) => {
        const updatedLobbies = JSON.parse(message.body);
        setLobbies(updatedLobbies); // Actualizar la lista de lobbies con datos en tiempo real
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
    navigate(`/lobby/${newLobbyId}`); // Redirigir al lobby creado
  })
  .catch((error) => console.error('Error al crear el lobby:', error));
};

  const handleJoinLobby = (lobbyId) => {
    const username = localStorage.getItem('username');
    fetch(`http://localhost:8080/api/lobbies/unir?lobbyId=${lobbyId}&jugador=${username}`, { method: 'POST' })
      .then((response) => response.text())
      .then((message) => {
        if (message === "Jugador añadido correctamente") {
          navigate(`/lobby/${lobbyId}`); // Redirigir al lobby
        } else {
          alert(message); // Mostrar mensaje de error si el lobby está completo
        }
      })
      .catch((error) => console.error('Error al unirse al lobby:', error));
  };

  return (
    <div>
      <h1>Lobbies Activos</h1>
      {lobbies.length > 0 ? (
        <ul>
          {lobbies.map((lobby) => (
            <li key={lobby.id}>
              {lobby.id} - {lobby.jugadores.length} jugadores
              <button onClick={() => handleJoinLobby(lobby.id)}>Unirse</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay lobbies activos en este momento.</p>
      )}
      <button onClick={handleCreateLobby}>Crear un Nuevo Lobby</button>
    </div>
  );
};

export default Lobbies;