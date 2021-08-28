import React from 'react';
import { DataProvider } from './services/DataProvider.jsx';
import I18nProvider from './services/i18nProvider.jsx';
import App from './App.jsx';
import 'normalize.css';
import './App.scss';

const Init = () => (
  <DataProvider>
    <I18nProvider>
      <App />
    </I18nProvider>
  </DataProvider>
);

export default Init;
