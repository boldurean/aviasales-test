import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import 'normalize.css';
import './App.scss';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
