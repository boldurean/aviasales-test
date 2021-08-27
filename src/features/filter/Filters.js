import React, { useEffect, useState } from 'react';
import './Filters.style.scss';

const ListItem = ({ name, text, handleToggle, checked }) => {
  return (
    <li className='filters__item'>
      <label className='filters__item__container'>
        {text}
        <input name={name} type="checkbox" onChange={handleToggle} checked={checked}/>
        <span className="checkmark"/>
      </label>
    </li>
  );
}


const filtersData = {
  all: {
    maxStops: 4,
    text: 'Все',
    isChecked: true,
  },
  without: {
    maxStops: 0,
    text: 'Без пересадок',
    isChecked: false,
  },
  one: {
    maxStops: 1,
    text: '1 пересадка',
    isChecked: false,
  },
  two: {
    maxStops: 2,
    text: '2 пересадки',
    isChecked: false,
  },
  three: {
    maxStops: 3,
    text: '3 пересадки',
    isChecked: false
  },
};

const Filters = ({ setFilteredTickets, initialTickets }) => {
  const [filters, setFilters] = useState(filtersData);

  const handleUpdateFilters = (name) => () => {
    const newFilters = {...filters};
    const names = Object.keys(filters).filter(n => n !== 'all');

    switch (name) {
      case 'all':
        const { isChecked } = newFilters[name];
        if (isChecked) {
          newFilters[name].isChecked = !isChecked
          names.forEach((n) => newFilters[n].isChecked = true);
        } else {
        newFilters[name].isChecked = !isChecked
        names.forEach(n => newFilters[n].isChecked = false);
        }
        break;
      default:
        newFilters[name].isChecked = !newFilters[name].isChecked
        const active = Object.values(newFilters).filter((f) => f.isChecked);
        active.length === 0 ? newFilters.all.isChecked = true : newFilters.all.isChecked = false;
    }
    setFilters(newFilters);
  }

  useEffect(() => {
    if (!initialTickets) return;
    const active = Object.values(filters)
      .filter((f) => f.isChecked)
      .map((f) => f.maxStops);
    const maxStops = Math.max(...active)

    const newTicketsList = initialTickets.filter((ticket) => {
      const stops = ticket.segments.reduce((acc, direction) => acc + direction.stops.length, 0);
      return stops <= maxStops;
    })
    setFilteredTickets(newTicketsList);
  }, [initialTickets, filters, setFilteredTickets])

  return (
    <div className="filters__container">
      <p className="filters__title">Количество пересадок</p>
      <form className="filters__form">
        <ul className="filters__list">
          {Object.entries(filtersData).map(([name, { maxStops, text,  isChecked }]) => {
            return <ListItem key={maxStops} name={name} text={text} handleToggle={handleUpdateFilters(name)} checked={isChecked} />
          })
          }
        </ul>
      </form>
    </div>
  );
};

export default Filters;
