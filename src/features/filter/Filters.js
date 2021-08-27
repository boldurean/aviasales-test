import React, { useEffect, useState } from 'react';
import './Filters.style.scss';
import { useData } from '../../services/DataProvider.js';

const ListItem = ({ type, text, handleToggle, checked, disabled }) => {
  return (
    <li className='filters__item'>
      <label className='filters__item__container'>
        {text}
        <input name={type} type="checkbox" onChange={handleToggle} checked={checked} disabled={disabled}/>
        <span className="checkmark"/>
      </label>
    </li>
  );
}

const Filters = React.memo(
  ({ setFilteredTickets, initialTickets }) => {

    const [filters, setFilters] = useState([
      { type: 'all', maxStops: Infinity, text: 'Все', isChecked: true },
      { type: 'none', maxStops: 0, text: 'Без пересадок', isChecked: false },
      { type: 'one', maxStops: 1, text: '1 пересадка', isChecked: false },
      { type: 'two', maxStops: 2, text: '2 пересадки', isChecked: false },
      { type: 'three', maxStops: 3, text: '3 пересадки', isChecked: false},
    ]);
    const { isNetworkError } = useData();

    const disabled = isNetworkError;

    const handleUpdateFilters = (type) => () => {

      const newFilters = [...filters];

      const defaultFilter = newFilters.find((f) => f.type === 'all')
      const rangeFilters = newFilters.filter(n => n.type !== 'all');
      const current = newFilters.find((n) => n.type === type);

      switch (type) {
        case 'all':
          if (current.isChecked) {
            current.isChecked = !current.isChecked
            rangeFilters.forEach((f) => f.isChecked = true);
            break;
          }
          current.isChecked = !current.isChecked
          rangeFilters.forEach(n => n.isChecked = false);
          break;
        default:
          current.isChecked = !current.isChecked
          const activeFilters = newFilters.filter((f) => f.isChecked);
          activeFilters.length === 0 ? defaultFilter.isChecked = true : defaultFilter.isChecked = false;
      }
      setFilters(newFilters);
    }

    useEffect(() => {
      if (!initialTickets) {
        setFilteredTickets(null)
        return
      };

      const currentMaxStops = filters
        .filter((f) => f.isChecked)
        .map((f) => f.maxStops);

      const maxStop = Math.max(...currentMaxStops)

      const newTicketsList = initialTickets.filter((ticket) => {
        const stops = ticket.segments.reduce((acc, direction) => acc + direction.stops.length, 0);
        return stops <= maxStop;
      })
      setFilteredTickets(newTicketsList);
    }, [filters, initialTickets, setFilteredTickets])

    return (
      <div className="filters__container">
        <p className="filters__title">Количество пересадок</p>
        <form className="filters__form">
          <ul className="filters__list">
            {filters.map(({ type, maxStops, text,  isChecked }) => {
              return (
                <ListItem
                  key={type}
                  name={type}
                  text={text}
                  handleToggle={handleUpdateFilters(type)}
                  checked={isChecked}
                  disabled={disabled}
                />
              );
            })
            }
          </ul>
        </form>
      </div>
    );
  }
)

export default Filters;
