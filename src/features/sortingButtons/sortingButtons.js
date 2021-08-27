import orderBy from 'lodash/orderBy.js';
import './sortingButtons.scss';
import React, { useEffect, useState } from 'react';

const Button = ({ text, toggle, active, disabled }) => {
  return <button onClick={toggle} data-active={active} disabled={disabled} >{text}</button>
}


const buttons = [
  {type: 'price', text: "Самый дешевый"},
  {type: 'duration', text: "Самый быстрый"},
  {type: 'optimal', text: "Оптимальный"},
];

const SortingButtons = React.memo(
  ({ filteredTickets, setTickets }) => {
    const [currentActive, setCurrentActive] = useState('optimal');

    const handleSortGenerator = (type) => {
      switch (type) {
        case 'price':
          return () => {
            const sorted = orderBy(filteredTickets, 'price');
            setTickets(sorted);
            setCurrentActive(type);
          }
        case 'duration':
          return () => {
            const sorted = orderBy(filteredTickets, (ticket) => {
              return ticket.segments.reduce((acc, s) => acc + s.duration, 0)
            }, ['asc']);
            setTickets(sorted);
            setCurrentActive(type);
          };
        default:
          return () => {
            const sorted = orderBy(filteredTickets, (ticket) => {
              return ticket.price + ticket.segments.reduce((acc, s) => acc + s.duration, 0)
            }, ['asc']);
            setTickets(sorted);
            setCurrentActive(type);
          };
      }
    };

    useEffect(() => {
      const initialSort = () => {
        const sorted = orderBy(filteredTickets, (ticket) => {
          return ticket.price + ticket.segments.reduce((acc, s) => acc + s.duration, 0)
        }, ['asc']);
        setTickets(sorted);
      };
      initialSort();
    }, [filteredTickets, setTickets])


    return (
      <div className="sorting-buttons-wrapper">
        {buttons.map(({ type, text }) =>
          <Button
            key={type}
            text={text}
            toggle={handleSortGenerator(type)}
            active={currentActive === type}
            disabled={!filteredTickets.length}
          />)}
      </div>
    );
  }
)

export default SortingButtons;
