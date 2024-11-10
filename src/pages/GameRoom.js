import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useWebSocket from './UseWebSocket';

const GameRoom = () => {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const { client, lobbyMessages } = useWebSocket(lobbyId);
  const [jugadores, setJugadores] = useState([]);
  const username = localStorage.getItem('username');

  // Unirse al lobby al cargar el componente
  useEffect(() => {
    if (client && username && lobbyId) {
      client.send(`/app/lobby/${lobbyId}`, {}, JSON.stringify({ tipo: 'JOIN', jugador: username }));
    }
  }, [client, username, lobbyId]);

  // Manejar mensajes del WebSocket
  useEffect(() => {
    if (lobbyMessages.length > 0) {
      const latestMessage = lobbyMessages[lobbyMessages.length - 1];
      try {
        const data = JSON.parse(latestMessage);

        if (data.tipo === 'START') {
        
          navigate('/paginaRuleta', {
            state: { isMultiplayer: true, lobbyId, jugadores, turno},
          });
        } else {
          
          setJugadores((prev) => [...new Set([...prev, data.jugador])]);
        }
      } catch (error) {
        console.error("Error al parsear el mensaje:", error);
      }
    }
  }, [lobbyMessages, navigate, lobbyId, jugadores]);

  const startGame = () => {
    if (jugadores.length === 2 && client) {
      
      const data = {
        lobbyId: lobbyId,
        jugadores: jugadores, r
      };
      
      
      client.send(`/app/start/${lobbyId}`, {}, JSON.stringify(data));
    } else {
      alert('El lobby no está listo para comenzar');
    }
  };

  return (
    <div>
      <h2>Lobby ID: {lobbyId}</h2>
      <h4>Jugadores:</h4>
      <ul>
        {jugadores.map((jugador, index) => (
          <li key={index}>{jugador}</li>
        ))}
      </ul>
      <button onClick={startGame}>Comenzar Juego</button>
    </div>
  );
};

export default GameRoom;
