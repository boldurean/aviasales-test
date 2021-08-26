import orderBy from 'lodash/orderBy.js';
import './sortingButtons.scss';
import { useEffect, useState } from 'react';

const Button = ({ text, toggle, active }) => {
  return <button onClick={toggle} data-active={active} >{text}</button>
}


const buttons = [
  {type: 'price', text: "Самый дешевый"},
  {type: 'duration', text: "Самый быстрый"},
  {type: 'optimal', text: "Самый оптимальный"},
];

const SortingButtons = ({ filteredTickets, setSortedTickets }) => {
  const [currentActive, setCurrentActive] = useState('optimal');

  const handleSortGenerator = (type) => {
    switch (type) {
      case 'price':
        return () => {
          const sorted = orderBy(filteredTickets, 'price');
          setSortedTickets(sorted);
          setCurrentActive(type);
        }
      case 'duration':
        return () => {
          const sorted = orderBy(filteredTickets, (ticket) => {
            return ticket.segments.reduce((acc, s) => acc + s.duration, 0)
          }, ['asc']);
          setSortedTickets(sorted);
          setCurrentActive(type);
        };
      default:
        return () => {
          const sorted = orderBy(filteredTickets, (ticket) => {
            return ticket.price + ticket.segments.reduce((acc, s) => acc + s.duration, 0)
          }, ['asc']);
          setSortedTickets(sorted);
          setCurrentActive(type);
        };
    }
  }

  useEffect(() => {
    const initialSort = () => {
      const sorted = orderBy(filteredTickets, (ticket) => {
        return ticket.price + ticket.segments.reduce((acc, s) => acc + s.duration, 0)
      }, ['asc']);
      setSortedTickets(sorted);
      };
    initialSort();
  },  [filteredTickets, setSortedTickets]);



  return (
    <div className="sorting-buttons-wrapper">
      {buttons.map(({ type, text }) => <Button key={type} text={text} toggle={handleSortGenerator(type)} active={currentActive === type} />)}
    </div>
  );
}

export default SortingButtons;
