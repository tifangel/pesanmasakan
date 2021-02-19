import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WarungList from './components/WarungList/WarungList';
import InfoTambahan from './components/InfoTambahan';

ReactDOM.render(
  <React.StrictMode>
    <InfoTambahan />
    <App />    
  </React.StrictMode>,
  document.getElementById('root')
);

