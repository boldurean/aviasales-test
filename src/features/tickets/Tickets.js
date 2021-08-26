import { useTranslation } from 'react-i18next';
import { formatCurrency, formatTime, formatDurration } from '../../services/utils.js';
import './Tickets.scss';

const Ticket = ({ price, carrier, segments }) => {
  const { t } = useTranslation();

  return (
    <div className="ticket">
      <div className="ticket__header">
        <p className="price">{formatCurrency(price)} P</p>
        <img src={`http://pics.avs.io/99/36/${carrier}.png`} alt="carrier logo"/>
      </div>
      <div className="ticket__segments">
        {segments.map(({ origin, destination, date, stops, duration }, i) => {
          const count = stops.length;
          const stopsAmount = count === 0 ? 'ПРЯМОЙ' : t('tickets.stops.counter.key', { count });
          return (
            <div key={i} className="segment">
              <div className="route">
                <p className="head">{`${origin} - ${destination}`}</p>
                <p className="info">{formatDurration(new Date(date), duration)}</p>
              </div>
              <div className="duration">
                <p className="head">В ПУТИ</p>
                <p className="info">{formatTime(duration)}</p>
              </div>
              <div className="stops">
                <p className="head">{stopsAmount}</p>
                <p className="info">{stops.map((city, i) => {
                  return (i !== stopsAmount - 1) ? <span key={city}>{city}, </span> : <span key={city}>{city}</span>;
                })}</p>
              </div>
            </div>
          );

        })}
      </div>
    </div>
  );
}

const Tickets = ({ sortedTicekts, showCount }) => {


  if (!sortedTicekts) {
    return (
      <div className="tickets__container">
        <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </div>
    );
  }

  return (
    <div className="tickets">
      {
        sortedTicekts
          .slice(0, showCount)
          .map(({ id, price, carrier, segments }) => <Ticket key={id} price={price} carrier={carrier} segments={segments} /> )
      }
    </div>
  )

}

export default Tickets;
