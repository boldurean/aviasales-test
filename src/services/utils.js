import { format, add } from 'date-fns';

export const formatTime = (mins) => {
  const [dayFormat, hourFormat, minuteFormat] = ['д ', 'ч ', 'м '];
  const minsPerHour = 60;
  const minsPerDay = 24 * minsPerHour;

  const days = Math.floor(mins / minsPerDay);
  const hours = Math.floor((mins % minsPerDay) / minsPerHour);
  const minutes = mins % minsPerHour;

  const formattedDays = days ? `${days}${dayFormat}` : '';
  const formattedHours = hours ? `${hours}${hourFormat}` : '';
  const formattedMinutes = minutes ? `${minutes}${minuteFormat}` : '';

  return `${formattedDays}${formattedHours}${formattedMinutes}`;
};

export const formatDurration = (date, duration) => {
  const departureTime = format(date, 'HH:mm');
  const arrivalDate = add(date, { minutes: duration })
  const arrivalTime = format(arrivalDate, 'HH:mm');

  return `${departureTime} - ${arrivalTime}`;
}

export const formatCurrency = (amount) => new Intl
  .NumberFormat('ru-RU', { currency: 'RUB' }).format(amount);


