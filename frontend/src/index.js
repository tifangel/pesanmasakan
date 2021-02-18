import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SampleComponent from './components/SampleComponent';
import WarungList from './components/warung-list/WarungList';

ReactDOM.render(
  <React.StrictMode>
    <WarungList />
  </React.StrictMode>,
  document.getElementById('root')
);

