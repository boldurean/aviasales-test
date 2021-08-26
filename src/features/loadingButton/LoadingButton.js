import './LoadingButton.scss';

const LoadingButton = ({ showCount, setShowCount }) => {

  const handleClick = () => {
    setShowCount(showCount + 5);
  };

  return (
    <button className='loading-btn' onClick={handleClick}>Загрузить еще 5 билетов</button>
  );
}

export default LoadingButton;
