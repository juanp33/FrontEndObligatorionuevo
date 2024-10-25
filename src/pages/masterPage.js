import React from 'react';
import '../styles/masterPage.css';

const MasterPage = ({ children }) => {
  return (
    <div className="masterpage">
      <div className="header">
        <h1>preguntI.Ados</h1>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default MasterPage;