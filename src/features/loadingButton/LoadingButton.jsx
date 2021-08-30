import React from 'react';
import './LoadingButton.scss';
import { useData } from '../../services/DataProvider.jsx';

const LoadingButton = ({ showCount, setShowCount }) => {
  const { isNetworkError } = useData();

  const handleClick = () => {
    setShowCount(showCount + 5);
  };

  return isNetworkError
    ? (
      <button type="button" className="loading-btn" onClick={() => window.location.reload()}>Обновить страницу!</button>
    )
    : (
      <button type="button" className="loading-btn" onClick={handleClick}>Загрузить еще 5 билетов</button>
    );
};

export default React.memo(LoadingButton);
