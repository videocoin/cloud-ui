import { startOfMonth, endOfMonth, format } from 'date-fns';

const getPeriod = (): string => {
  const today = new Date();
  const startDate = format(startOfMonth(today), 'MMM dd');
  const endDate = format(endOfMonth(today), 'MMM dd, yyyy');

  return `${startDate} - ${endDate}`;
};

export default getPeriod;
