import React, { useEffect, useState, useRef } from 'react';
import MasterPage from './masterPage';
import Ruleta from './Ruleta';
import PaginaPregunta from './PaginaPregunta';
import '../styles/PaginaRuleta.css';
import iconoPerfil from '../images/iconoPerfil.png';
import { useLocation } from 'react-router-dom';
import useWebSocket from './UseWebSocket';

const PaginaRuletaMultiplayer = () => {
  const { state } = useLocation();
  
  const lobbyId = state?.lobbyId || null;
  const { client,chatMessages, lobbyMessages } = useWebSocket(lobbyId);
  const jugador1 = state?.jugador1 || null;
  const jugador2 = state?.jugador2 || null;
  const [turno, setTurno] = useState(jugador1);
  const [preguntaData, setPreguntaData] = useState(null);
  
  const [puntos, setPuntos] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const username = localStorage.getItem('username');
  const ruletaSpinFuncRef = useRef(null); // Ref para almacenar la función de giro de la ruleta
  const [categoria,setCategoria]=useState(null);
  const [passToQuestion, setpassToQuestion] = useState(false);
  const [pedirPregunta, setPedirPregunta] = useState(false);
 
  useEffect(() => {
    if (client){
      const timer = setTimeout(() => {
        fetchPregunta()
        console.log("Este es el de turno")
      }, 500); // 2000 ms = 2 segundos
    
     
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
          console.log(latestMessage.turnoActivo)
          console.log(categoria)
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
      console.log("ENTRO ACA?")
      console.log(client)
      if (client && jugador1==username ) {
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
    setpassToQuestion(true);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setPuntos((prevPuntos) => prevPuntos + 1);
    }
    
    setPreguntaData(null);
    setpassToQuestion(false);
    setTurno((prevTurno) => (prevTurno === jugador1 ? jugador2 : jugador1));
  };

  
  const spinRuleta = (categoria) => {
    if (ruletaSpinFuncRef.current) {
      ruletaSpinFuncRef.current(categoria); 
    }
  };

  return (
    <MasterPage>
      <div className="jugar-page">
        {!passToQuestion && !isGameOver && (
          <>
            <div className="player-card">
              <img src={iconoPerfil} alt="Player 1" className="player-image" />
              <h2>{jugador1}</h2>
            </div>
            <div className="ruleta-container">
              <Ruleta
                onSelectCategory={handleCategorySelect}
                
                spinWheel={(spinFunc) => (ruletaSpinFuncRef.current = spinFunc)} // Guarda la función de giro
              />
            </div>
            <div className="player-card">
              <img src={iconoPerfil} alt="Player 2" className="player-image" />
              <h2>{jugador2}</h2>
            </div>
          </>
        )}
        {passToQuestion && (
          <PaginaPregunta
            preguntaData={preguntaData}
            onAnswer={handleAnswer}
            puntos={puntos}
            desabilitado={turno !== username}
            lobbyId={lobbyId}
          />
        )}
      </div>
    </MasterPage>
  );
};

export default PaginaRuletaMultiplayer;
