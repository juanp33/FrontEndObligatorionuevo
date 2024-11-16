import { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';

const useMultiplayer = (lobbyId, username) => {
  const [esMiTurno, setEsMiTurno] = useState(false);
  const [preguntaData, setPreguntaData] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [rondas, setRondas] = useState(0); // Estado para contar las rondas

  useEffect(() => {
    const client = Stomp.client('ws://localhost:8080/game');
    client.connect({}, () => {
     
      client.subscribe(`/topic/lobby/${lobbyId}`, (message) => {
        const data = JSON.parse(message.body);

        if (data.tipo === 'TURNO') {
          setEsMiTurno(data.jugador === username);
        } else if (data.tipo === 'PREGUNTA') {
          setPreguntaData(data.pregunta);
        }
      });

      setStompClient(client);
    });

    return () => {
      if (client) client.disconnect();
    };
  }, [lobbyId, username]);

 

  const incrementarRondas = () => {
    setRondas((prevRondas) => prevRondas + 1);
  };

  return { esMiTurno, preguntaData, setPreguntaData, rondas, incrementarRondas };
};

export default useMultiplayer;
