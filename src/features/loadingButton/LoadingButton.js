import './LoadingButton.scss';
import { useData } from '../../services/DataProvider.js';

const LoadingButton = ({ showCount, setShowCount }) => {
  const { isNetworkError } = useData();

  const handleClick = () => {
    setShowCount(showCount + 5);
  };

  return isNetworkError
    ? (
      <button className='loading-btn' onClick={() => window.location.reload()}>Обновить страницу!</button>
    )
    : (
    <button className='loading-btn' onClick={handleClick}>Загрузить еще 5 билетов</button>
  );
}

export default LoadingButton;
