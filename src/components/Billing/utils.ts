import formatDate from 'helpers/formatDate';
import { memoize } from 'lodash/fp';
import * as humanDuration from 'human-duration';
import { enUS } from 'date-fns/locale';
import { endOfMonth, format, startOfMonth } from 'date-fns';

export const tickFormatter = formatDate('dd');

export const formatDuration = (duration: number) =>
  humanDuration.fmt(duration * 1000).toString();

export const getPeriod = memoize((): string => {
  const today = new Date();
  const startDate = format(startOfMonth(today), 'MMM dd');
  const endDate = format(endOfMonth(today), 'MMM dd, yyyy');

  return `${startDate} - ${endDate}`;
});

export const splitUTCDate = (date: string) => date.substring(0, 10).split('-');

export const formatUTCDate = (date: string) => {
  const [year, month, day] = splitUTCDate(date);
  return `${month}/${day}/${year}`;
};

export const formatChartDate = (date: string) => {
  if (!date) return;
  const [year, month, day] = splitUTCDate(date);
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(enUS.localize.month(i, { width: 'abbreviated' }));
  }
  return `${day} ${months[+month - 1]}, ${year}`;
};
