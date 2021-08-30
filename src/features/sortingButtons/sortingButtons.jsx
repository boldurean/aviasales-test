import './sortingButtons.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useData } from '../../services/DataProvider.jsx';

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

const SortingButtons = ({ setApplySorting }) => {
  const [currentActive, setCurrentActive] = useState('average');

  const { isNetworkError } = useData();

  const handleSortGenerator = useCallback((type) => {
    // The following case clauses are wrapped into blocks using brackets (es6)
    // The reason is that the lexical declaration is visible in the entire switch block
    // but it only gets initialized when it is assigned, which will only happen if the
    // case where it is defined is reached.
    switch (type) {
      case 'price': {
        const applySorting = (firstEl, secondEl) => {
          if (firstEl.price < secondEl.price) {
            return -1;
          }
          if (firstEl.price > secondEl.price) {
            return 1;
          }
          return 0;
        };
        setApplySorting(() => applySorting);
        setCurrentActive(type);
        break;
      }
      case 'duration': {
        const applySorting = (firstEl, secondEl) => {
          const firstElStops = firstEl.segments.reduce((acc, s) => acc + s.duration, 0);
          const secondElStops = secondEl.segments.reduce((acc, s) => acc + s.duration, 0);

          if (firstElStops < secondElStops) {
            return -1;
          }
          if (firstElStops > secondElStops) {
            return 1;
          }
          return 0;
        };

        setApplySorting(() => applySorting);
        setCurrentActive(type);
        break;
      }
      case 'average': {
        const applySorting = (firstEl, secondEl) => {
          const firstElStops = firstEl.price + firstEl.segments
            .reduce((acc, s) => acc + s.duration, 0);
          const secondElStops = secondEl.price + secondEl.segments
            .reduce((acc, s) => acc + s.duration, 0);

          if (firstElStops < secondElStops) {
            return -1;
          }
          if (firstElStops > secondElStops) {
            return 1;
          }
          return 0;
        };

        setApplySorting(() => applySorting);
        setCurrentActive(type);
        break;
      }
      default:
        throw new Error(`Unknown case type ${type}`);
    }
  }, [setApplySorting]);

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
          disabled={isNetworkError}
        />
      ))}
    </div>
  );
};

export default React.memo(SortingButtons);
