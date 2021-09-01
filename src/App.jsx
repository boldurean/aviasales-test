import axios from 'axios';
import i18next from 'i18next';
import uniqueId from 'lodash/uniqueId.js';
import noop from 'lodash/noop.js';
import React, { useEffect, useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import {
  Filters, LoadingButton, SortingButtons, Tickets,
} from './features';
import logo from './img/Logo.svg';
import resources from './locale';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [applyFilters, setApplyFilters] = useState(noop);
  const [applySorting, setApplySorting] = useState(noop);
  const [showCount, setShowCount] = useState(5);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [i18n, setI18n] = useState();

  useEffect(() => {
    const initData = async () => {
      const res = await axios.get('https://front-test.beta.aviasales.ru/search');
      const { data } = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${res.data.searchId}`);
      const ticketsWithId = data.tickets.map((t) => ({ id: uniqueId(), ...t }));
      const i18instance = i18next.createInstance();
      await i18instance.use(initReactI18next).init({
        resources,
        lng: 'ru',
      });
      setTickets(ticketsWithId);
      setI18n(i18instance);
    };
    initData().catch((err) => {
      setIsNetworkError(true);
      console.log(err);
    });
    return () => setIsNetworkError(true);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <>
        <header>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </header>
        <main className="main">
          <Filters setApplyFilters={setApplyFilters} isNetworkError={isNetworkError} />
          <div className="tickets__container">
            <SortingButtons setApplySorting={setApplySorting} isNetworkError={isNetworkError} />
            <Tickets
              applyFilters={applyFilters}
              applySorting={applySorting}
              tickets={tickets}
              showCount={showCount}
            />
            <LoadingButton
              showCount={showCount}
              setShowCount={setShowCount}
              isNetworkError={isNetworkError}
            />
          </div>
        </main>
      </>
    </I18nextProvider>
  );
};

export default App;
