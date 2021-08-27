import orderBy from 'lodash/orderBy.js';
import './sortingButtons.scss';
import React, { useCallback, useEffect, useState } from 'react';

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

    const handleSortGenerator = useCallback(
      (type) => {

        switch (type) {
          case 'price':
            const byPrice = orderBy(filteredTickets, 'price');
            setTickets(byPrice);
            setCurrentActive(type);
            break;
          case 'duration':
            const byDuration = orderBy(filteredTickets, (ticket) => {
              return ticket.segments.reduce((acc, s) => acc + s.duration, 0)
            }, ['asc']);
            setTickets(byDuration);
            setCurrentActive(type);
            break;
          default:
            const byDefault = orderBy(filteredTickets, (ticket) => {
              return ticket.price + ticket.segments.reduce((acc, s) => acc + s.duration, 0)
            }, ['asc']);
            setTickets(byDefault);
            setCurrentActive(type);
        }
      }, [filteredTickets, setTickets]
    );

    useEffect(() => {
      handleSortGenerator(currentActive);
    },[currentActive, handleSortGenerator])

    console.log('render sorting buttons')
    return (
      <div className="sorting-buttons-wrapper">
        {buttons.map(({ type, text }) =>
          <Button
            key={type}
            text={text}
            toggle={() => handleSortGenerator(type)}
            active={currentActive === type}
            disabled={!filteredTickets.length}
          />)}
      </div>
    );
  }
)

export default SortingButtons;
