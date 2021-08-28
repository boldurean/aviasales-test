import uniqueId from 'lodash/uniqueId.js';
import React, { useEffect, useState } from 'react';
import { useData } from './services/DataProvider.jsx';
import {
  Filters, LoadingButton, SortingButtons, Tickets,
} from './features';
import logo from './img/Logo.svg';

const App = () => {
  const [initialTickets, setInitialTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [showCount, setShowCount] = useState(5);
  const { flightData, isNetworkError } = useData();

  useEffect(() => {
    if (!flightData) return;
    const allTickets = flightData.tickets;
    const ticketsWithId = allTickets.map((t) => ({ id: uniqueId(), ...t }));
    setInitialTickets(ticketsWithId);
  }, [flightData, isNetworkError]);

  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <main className="main">
        <Filters initialTickets={initialTickets} setFilteredTickets={setFilteredTickets} />
        <div className="tickets__container">
          <SortingButtons filteredTickets={filteredTickets} setTickets={setTickets} />
          <Tickets tickets={tickets} showCount={showCount} />
          <LoadingButton showCount={showCount} setShowCount={setShowCount} />
        </div>
      </main>
    </>
  );
};

export default App;
