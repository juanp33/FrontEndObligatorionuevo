import { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';

const useWebSocket = (lobbyId,conectado) => {
  const [client, setClient] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [lobbyMessages, setLobbyMessages] = useState([]);
  
  useEffect(() => {
    
      const stompClient = Stomp.client('ws://localhost:8080/game'); 
console.log(stompClient)
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
       
    }
    
    
  }, []);

  return { client, chatMessages, lobbyMessages };
};

export default useWebSocket;