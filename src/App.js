import uniqueId from 'lodash/uniqueId.js';
import { useData } from './services/DataProvider.js';
import React, { useEffect, useState } from 'react';
import Filters from './features/filter/Filters.js';
import LoadingButton from './features/loadingButton/LoadingButton.js';
import Tickets from './features/tickets/Tickets.js'
import SortingButtons from './features/sortingButtons/sortingButtons.js';
import logo from './img/Logo.svg';


const App = () => {
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [initialTickets, setInitialTickets] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [showCount, setShowCount] = useState(5);
  const { flightData } = useData();

  useEffect(() => {
    if (!flightData) {
      setInitialTickets(null);
      return;
    }
    const { tickets } = flightData;
    const ticketsWithId = tickets.map((t) => ({ id: uniqueId(), ...t }))
    setInitialTickets(ticketsWithId);
  }, [flightData])


  return (
      <>
        <header>
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
        </header>
        <main className="main">
          <Filters initialTickets={initialTickets} setFilteredTickets={setFilteredTickets} />
          <div className="tickets__container">
            <SortingButtons filteredTickets={filteredTickets} setSortedTickets={setSortedTickets} showCount={showCount} />
            <Tickets sortedTicekts={sortedTickets} showCount={showCount}/>
            <LoadingButton showCount={showCount} setShowCount={setShowCount}/>
          </div>
        </main>
      </>
  );
}

export default App;
