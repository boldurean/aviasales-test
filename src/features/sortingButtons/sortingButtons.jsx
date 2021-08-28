import orderBy from 'lodash/orderBy.js';
import './sortingButtons.scss';
import React, { useCallback, useEffect, useState } from 'react';

const Button = ({
  text, toggle, active, disabled,
}) => (
  <button type="button" onClick={toggle} data-active={active} disabled={disabled}>
    {text}
  </button>
);

const buttons = [
  { type: 'price', text: 'Самый дешевый' },
  { type: 'duration', text: 'Самый быстрый' },
  { type: 'average', text: 'Оптимальный' },
];

const SortingButtons = ({ filteredTickets, setTickets }) => {
  const [currentActive, setCurrentActive] = useState('average');

  const handleSortGenerator = useCallback((type) => {
    // The following case clauses are wrapped into blocks using brackets (es6)
    // The reason is that the lexical declaration is visible in the entire switch block
    // but it only gets initialized when it is assigned, which will only happen if the
    // case where it is defined is reached.
    switch (type) {
      case 'price': {
        const byPrice = orderBy(filteredTickets, 'price');
        setTickets(byPrice);
        setCurrentActive(type);
        break;
      }
      case 'duration': {
        const byDuration = orderBy(filteredTickets, (ticket) => ticket.segments.reduce((acc, s) => acc + s.duration, 0), ['asc']);
        setTickets(byDuration);
        setCurrentActive(type);
        break;
      }
      case 'average': {
        const byAverage = orderBy(filteredTickets, (ticket) => ticket.price + ticket.segments.reduce((acc, s) => acc + s.duration, 0), ['asc']);
        setTickets(byAverage);
        setCurrentActive(type);
        break;
      }
      default:
        throw new Error(`Unknown case type ${type}`);
    }
  }, [filteredTickets, setTickets]);

  useEffect(() => {
    handleSortGenerator(currentActive);
  }, [currentActive, handleSortGenerator]);

  return (
    <div className="sorting-buttons-wrapper">
      {buttons.map(({ type, text }) => (
        <Button
          key={type}
          text={text}
          toggle={() => handleSortGenerator(type)}
          active={currentActive === type}
          disabled={!filteredTickets.length}
        />
      ))}
    </div>
  );
};

export default React.memo(SortingButtons);
