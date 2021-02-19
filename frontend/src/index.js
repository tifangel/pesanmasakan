import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WarungList from './components/warung-list/WarungList';
import InfoTambahan from './components/InfoTambahan';
import InfoPage from './pages/infopage'

ReactDOM.render(
  <React.StrictMode>
    <InfoTambahan />
    <App />
    <WarungList/>
    <InfoPage/>
    
  </React.StrictMode>,
  document.getElementById('root')
);

