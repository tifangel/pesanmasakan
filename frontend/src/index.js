import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InfoTambahan from './components/InfoTambahan';

ReactDOM.render(
  <React.StrictMode>
    <div className="carousel">
      <InfoTambahan />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

