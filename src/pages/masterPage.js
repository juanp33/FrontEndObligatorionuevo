import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/masterPage.css';
import textToSpeechManager from '../utils/TextToSpeechManager';

const MasterPage = ({ children }) => {
  const textToSpeech = localStorage.getItem('textToSpeech')
  useEffect(() => {
    if(textToSpeech){
     
      narrarPagina(); 
    }
    
  }, []); 
  const narrarPagina = () => {
    const elements = document.querySelectorAll('p,  h2, h3, h4, h5, h6, button');
    elements.forEach((el) => {
      textToSpeechManager.speak(el.textContent);
    });
  };

  return (
    <div className="masterpage">
      <div className="header">
        <Link to="/jugar" className="header-link">
          <h1>preguntI.Ados</h1>
        </Link>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default MasterPage;