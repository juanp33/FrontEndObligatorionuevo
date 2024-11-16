import React, { useEffect, useState } from 'react';
import MasterPage from './masterPage';
import Ruleta from './Ruleta';
import PaginaPregunta from './PaginaPregunta';
import '../styles/PaginaRuleta.css';
import iconoPerfil from '../images/iconoPerfil.png';
import { useLocation } from 'react-router-dom';
import useMultiplayer from './UseMultiplayer';
import useWebSocket from './UseWebSocket';
import { Client as StompClient, Stomp } from '@stomp/stompjs';
const PaginaRuletaMultiplayer = () => {
  const { state } = useLocation(); 
  const [preguntaData,setPreguntaData]= useState(null);
  const lobbyId = state?.lobbyId || null;
  const [turno, setTurno] = useState();
  const jugador1 = state?.jugador1 || null;
  const jugador2 = state?.jugador2 || null;
  const { client, lobbyMessages } = useWebSocket(lobbyId);
  const [puntos, setPuntos] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isTurnoActivo,setIsTurnoActivo]= useState(true);
  const username = localStorage.getItem('username');

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Configura y conecta el cliente Stomp
    const client = Stomp.client('ws://localhost:8080/game');
    client.connect({}, () => {
      console.log('Conectado a WebSocket');
      setStompClient(client);
    }, (error) => {
      console.error('Error al conectar con WebSocket:', error);
    });
    setTurno(jugador1);
    // Desconectar al desmontar
    return () => {
      if (client) client.disconnect();
    };
    
  }, []);

  useEffect(() => {
    if (stompClient) {
      fetchPregunta();
    }
  }, [stompClient]);
  
  useEffect(() => {
    if (lobbyMessages.length > 0) {
      try {
        const latestMessage = JSON.parse(lobbyMessages[lobbyMessages.length - 1]);
        
        if (latestMessage.pregunta && latestMessage.turnoActivo) {
          
          setPreguntaData(latestMessage.pregunta);
          setTurno(latestMessage.turnoActivo);
        }
      } catch (error) {
        console.error("Error al procesar el mensaje del WebSocket:", error);
      }
    }
  }, [lobbyMessages]);
  
  const fetchPregunta = async () => {
    try {
      console.log("xd")
      
      
      console.log(turno)
      if(turno == jugador1){
        client.send(`/app/pregunta/${lobbyId}`, {}, JSON.stringify({
          turno: turno,
          jugadores: [jugador1, jugador2]
        }));
        
      }
      if(turno == jugador2){
        client.send(`/app/pregunta/${lobbyId}`, {}, JSON.stringify({
          turno: turno,
          jugadores: [jugador1, jugador2]
        }));
      }
      
    } catch (err) {

    }
  };

  const handleCategorySelect = (category) => {
    
    fetchPregunta();
  }
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setPuntos((prevPuntos) => prevPuntos + 1);
    } else {
      setIsGameOver(true);
      setShowModal(true);
    }
    if (turno == jugador1){
      setTurno(jugador2)
    }else{
      setTurno(jugador1)
    }
    setPreguntaData(null);
  };

  const resetGame = () => {
    setPuntos(0);
    setPreguntaData(null);
    setIsGameOver(false);
    setShowModal(false);
  };

  return (
    <MasterPage>
      <div className="jugar-page">
        {!preguntaData && !isGameOver && (
          <>
            <div className="player-card">
              <img src={iconoPerfil} alt="Player 1" className="player-image" />
              <h2>{jugador1} </h2>
            </div>
            <div className="ruleta-container">
              {/* Solo permite interactuar con la ruleta si es el turno del jugador */}
              <Ruleta onSelectCategory={handleCategorySelect}  />
            </div>
            <div className="player-card">
              <img src={iconoPerfil} alt="Player 1" className="player-image" />
              <h2>{jugador2}</h2>
            </div>
          </>
        )}
        {preguntaData && (
          <PaginaPregunta
            preguntaData={preguntaData}
            onAnswer={handleAnswer}
            puntos={puntos}
             desabilitado={turno !== username}
          />
        )}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Juego terminado</h2>
              <p>Puntuación final: {puntos}</p>
              <button onClick={resetGame}>Reiniciar</button>
            </div>
          </div>
        )}
      </div>
    </MasterPage>
  );
};

export default PaginaRuletaMultiplayer;
