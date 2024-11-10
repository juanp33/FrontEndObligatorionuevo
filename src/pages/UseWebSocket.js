import { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';

const useWebSocket = (lobbyId) => {
  const [client, setClient] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [lobbyMessages, setLobbyMessages] = useState([]);

  useEffect(() => {
    // Configura el cliente STOMP
    const stompClient = Stomp.client('ws://localhost:8080/game'); // Asegúrate de usar la URL correcta

    stompClient.connect({}, () => {
      console.log('Conectado al servidor WebSocket');

     
      stompClient.subscribe(`/topic/lobbies/${lobbyId}`, (message) => {
        setLobbyMessages((prevMessages) => [...prevMessages, message.body]);
      });

      
      stompClient.subscribe('/topic/chat', (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message.body]);
      });

    
      setClient(stompClient);
    }, (error) => {
      console.error('Error en la conexión WebSocket:', error);
    });

    
    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log('Desconectado del servidor WebSocket');
        });
      }
    };
  }, [lobbyId]);

  return { client, chatMessages, lobbyMessages };
};

export default useWebSocket;