import React from 'react';
import { DataProvider } from './services/DataProvider.js';
import App from './App.js'
import I18nProvider from './services/i18nProvider.js';
import 'normalize.css';
import './App.scss';


const Init = () => {

  return  (
    <DataProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </DataProvider>
  );
}

export default Init;
