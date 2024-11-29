import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useWebSocket from '../utils/UseWebSocket';
import MasterPage from './masterPage';
import '../styles/gameRoom.css';
import imagenPerfil from '../images/iconoPerfil.png'
const GameRoom = () => {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const { client, lobbyMessages, chatMessages } = useWebSocket(lobbyId);
  const [jugadores, setJugadores] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const username = localStorage.getItem('username');
  const [comienzaElJuego, setComienzaElJuego]= useState(false);

  // Unirse al lobby al cargar el componente
  useEffect(() => {
    if (client && username && lobbyId) {
      client.send(`/app/lobby/${lobbyId}`, {}, JSON.stringify({ tipo: 'JOIN', jugador: username }));
    }

    // Función para manejar el cierre de la ventana
    const handleWindowClose = () => {
      if(client){
        if(!comienzaElJuego){
          client.send(`/app/leave/${lobbyId}`, {}, JSON.stringify({ tipo: 'LEAVE', jugador: username }));
        }
      
      }
      ;
    };

    // Agregar el event listener para beforeunload
    window.addEventListener('beforeunload', handleWindowClose);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      handleWindowClose();
    };
  }, [client, username, lobbyId]);

  // Manejar mensajes del WebSocket
  useEffect(() => {
    if (lobbyMessages.length > 0) {
      const latestMessage = lobbyMessages[lobbyMessages.length - 1];
      try {
        const data = JSON.parse(latestMessage);
        if (data.tipo === 'START') {
          const jugador1 = jugadores[0];
          const jugador2 = jugadores[1];
          navigate('/paginaRuletaMultiplayer', {
            state: { jugador1, jugador2, lobbyId },
          });
        } else {
          setJugadores(data);
        }
      } catch (error) {
        console.error('Error al parsear el mensaje:', error);
      }
    }
  }, [lobbyMessages, navigate,  lobbyId]);

  const startGame = () => {
    if (jugadores.length === 2 && client) {
      const data = {
        lobbyId: lobbyId,
        jugadores: [jugadores[0], jugadores[1]],
      };
      setComienzaElJuego(true);
      client.send(`/app/start/${lobbyId}`, {}, JSON.stringify(data));
    } else {
      alert('El lobby no está listo para comenzar');
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && client) {
      const chatData = {
        mensaje: `${username}: ${newMessage}`,
      };
      client.send(`/app/chat/${lobbyId}`, {}, JSON.stringify(chatData));
      setNewMessage('');
    }
  };

  return (
    <MasterPage>
      <div className="players-container">
        <div className="player-card">
          <div className="player-image">
            <img src="" alt="James Williams" />
          </div>
          <h3>{jugadores[0]}</h3>
          <p>RECORD W: 0 L: 0</p>
        </div>
        <div className="chat-box">
        <div className="chat-messages">
  {chatMessages.map((message, index) => {
    const parsedMessage = JSON.parse(message); // Parsear el mensaje JSON
    return <p key={index}>{parsedMessage.mensaje}</p>; // Mostrar solo el texto
  })}
</div>
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
        <div className="player-card">
          <div className="player-image">
            <img src={imagenPerfil} alt="Jake Trump" />
          </div>
          <h3>{jugadores[1]}</h3>
          <p>RECORD W: 0 L: 0</p>
        </div>
      </div>
      <button className="start-game-button" onClick={startGame}>
        Empezar partida
      </button>
    </MasterPage>
  );
};

export default GameRoom;