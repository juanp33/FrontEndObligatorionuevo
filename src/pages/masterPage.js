import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/masterPage.css';

const MasterPage = ({ children }) => {
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