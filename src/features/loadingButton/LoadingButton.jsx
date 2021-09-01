import React from 'react';
import './LoadingButton.scss';

const LoadingButton = ({ showCount, setShowCount, isNetworkError }) => {
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
