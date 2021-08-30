import uniqueId from 'lodash/uniqueId.js';
import noop from 'lodash/noop.js';
import React, { useEffect, useState } from 'react';
import { useData } from './services/DataProvider.jsx';
import {
  Filters, LoadingButton, SortingButtons, Tickets,
} from './features';
import logo from './img/Logo.svg';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [applyFilters, setApplyFilters] = useState(noop);
  const [applySorting, setApplySorting] = useState(noop);
  const [showCount, setShowCount] = useState(5);
  const { flightData, isNetworkError } = useData();

  useEffect(() => {
    if (!flightData) return;
    const allTickets = flightData.tickets;
    const ticketsWithId = allTickets.map((t) => ({ id: uniqueId(), ...t }));
    setTickets(ticketsWithId);
  }, [flightData, isNetworkError]);

  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <main className="main">
        <Filters setApplyFilters={setApplyFilters} />
        <div className="tickets__container">
          <SortingButtons setApplySorting={setApplySorting} />
          <Tickets
            applyFilters={applyFilters}
            applySorting={applySorting}
            tickets={tickets}
            showCount={showCount}
          />
          <LoadingButton showCount={showCount} setShowCount={setShowCount} />
        </div>
      </main>
    </>
  );
};

export default App;
