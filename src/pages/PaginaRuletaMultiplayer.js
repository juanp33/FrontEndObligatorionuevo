import React, { useEffect, useState, useRef } from 'react';
import MasterPage from './masterPage';
import Ruleta from './Ruleta';
import PaginaPregunta from './PaginaPregunta';
import '../styles/PaginaRuletaMultiplayer.css';
import iconoPerfil from '../images/iconoPerfil.png';
import { useLocation } from 'react-router-dom';
import useWebSocket from '../utils/UseWebSocket';
import { useNavigate } from 'react-router-dom';

const PaginaRuletaMultiplayer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const lobbyId = state?.lobbyId || null;
  const { client, chatMessages, lobbyMessages } = useWebSocket(lobbyId);
  const jugador1 = state?.jugador1 || null;
  const jugador2 = state?.jugador2 || null;
  const [turno, setTurno] = useState(jugador1);
  const [preguntaData, setPreguntaData] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const username = localStorage.getItem('username');
  const ruletaSpinFuncRef = useRef(null); 
  const [categoria, setCategoria] = useState(null);
  const [passToQuestion, setPassToQuestion] = useState(false); 
  const [pedirPregunta, setPedirPregunta] = useState(false);
  const [puntosJugador1, setPuntosJugador1] = useState(0);
  const [puntosJugador2, setPuntosJugador2] = useState(0);
  const [rondasCompletadas, setRondasCompletadas] = useState(0); 
  const [isGameFinished, setIsGameFinished] = useState(false); 
  const handleGoToMenu = () => {
    navigate('/jugar'); 
  };
  useEffect(() => {
    if (client){
      const timer = setTimeout(() => {
        fetchPregunta()
        console.log("Este es el de turno")
      }, 500); 
    
      return () => clearTimeout(timer);
    }
  }, [turno, client]);
  

  useEffect(() => {
    if (lobbyMessages.length > 0) {
      try {
        const latestMessage = JSON.parse(lobbyMessages[lobbyMessages.length - 1]);
        setCategoria(latestMessage.categoria);
        console.log(latestMessage.categoria)
        if (latestMessage.pregunta && latestMessage.turnoActivo) {
          console.log(latestMessage);
          spinRuleta(latestMessage.categoria);
          setPreguntaData(latestMessage.pregunta);
        }
      } catch (error) {
        console.error("Error al procesar el mensaje del WebSocket:", error);
      }
    }
  }, [lobbyMessages]);

  const fetchPregunta = () => {
    try {
      if (client && jugador1 === username ) {
        client.send(`/app/pregunta/${lobbyId}`, {}, JSON.stringify({
          turno: turno,
          jugadores: [jugador1, jugador2]
        }));
      }
    } catch (error) {
      console.error("Error al enviar solicitud de pregunta:", error);
    }
  };

  const handleCategorySelect = () => {
    setPassToQuestion(true);
  };
  
  const handlePuntosTemporales = (puntosTemporales) => {
    if (turno === jugador1) {
      setPuntosJugador1((prev) => prev + puntosTemporales);
    } else {
      setPuntosJugador2((prev) => prev + puntosTemporales);
    }
  };
  useEffect(() => {
    if (rondasCompletadas >= 4) {  
     
      const ganador = puntosJugador1 > puntosJugador2 ? jugador1 : jugador2;
      console.log(`El juego ha terminado. El ganador es ${ganador}`);
      console.log(`Puntos ${jugador1}: ${puntosJugador1}, Puntos ${jugador2}: ${puntosJugador2}`);
      setIsGameFinished(true);
  
     
      try {
        if (client && jugador1 === username) {
          client.send(`/app/finalizarPartida/${lobbyId}`, {}, JSON.stringify({
            puntajeJugadores: [puntosJugador1, puntosJugador2],
          }));
        }
        
      if (client) {
        try {
          client.disconnect(() => {
            console.log("WebSocket desconectado.");
          });
        } catch (disconnectError) {
          console.error("Error al desconectar el WebSocket:", disconnectError);
        }
      }
      
      

      setTimeout(() => {
      setTurno(jugador1);
      setPreguntaData(null);
      setCategoria(null);
      setPassToQuestion(false);
      setPedirPregunta(false);
      setPuntosJugador1(0);
      setPuntosJugador2(0);
      setRondasCompletadas(0);
    }, 20000);

      } catch (error) {
        console.error("Error al enviar puntajes finales:", error);
      }
    }
  }, [rondasCompletadas]);

  const handleAnswer = (isCorrect) => {
   
    setRondasCompletadas((prev) => prev + 1);

      setTurno((prevTurno) => (prevTurno === jugador1 ? jugador2 : jugador1)); 
    
    setPreguntaData(null);
    setPassToQuestion(false); 
  };
  
  
  const spinRuleta = (categoria) => {
    if (ruletaSpinFuncRef.current) {
      ruletaSpinFuncRef.current(categoria); 
    }
  };

  return (
    <MasterPage>
      <div className="jugar-page">
        {!passToQuestion && !isGameOver && !isGameFinished && (
          <>
            <div className="player-card">
              <img src={iconoPerfil} alt="Player 1" className="player-image" />
              <h2>{jugador1}</h2>
              <h3>{puntosJugador1}</h3>
            </div>
            <div className="ruleta-container">
              <Ruleta
                onSelectCategory={handleCategorySelect}
                spinWheel={(spinFunc) => (ruletaSpinFuncRef.current = spinFunc)} 
              />
            </div>
            <div className="player-card">
              <img src={iconoPerfil} alt="Player 2" className="player-image" />
              <h2>{jugador2}</h2>
              <h3>{puntosJugador2}</h3>
            </div>
          </>
        )}
        {passToQuestion && (
          <PaginaPregunta
            preguntaData={preguntaData}
            onAnswer={handleAnswer}
            puntos={turno === jugador1 ? puntosJugador1 : puntosJugador2}
            desabilitado={turno !== username}
            lobbyId={lobbyId}
            onPuntosTemporales={handlePuntosTemporales} 
            turno={turno}
          />
        )}
       
        {isGameFinished && (
          <div className="modal">
            <div className="modal-content">
              <h2>Juego Terminado</h2>
              <p>El ganador es: {puntosJugador1 > puntosJugador2 ? jugador1 : jugador2}</p>
            <p>Puntos {jugador1}: {puntosJugador1}</p>
            <p>Puntos {jugador2}: {puntosJugador2}</p>
            <button className="mode-button" onClick={handleGoToMenu}>Volver Al Menu</button>
            </div>
          </div>
        )}
      </div>
    </MasterPage>
  );
};

export default PaginaRuletaMultiplayer;
