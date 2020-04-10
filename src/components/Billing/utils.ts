import formatDate from 'helpers/formatDate';
import { memoize } from 'lodash/fp';
import * as humanDuration from 'human-duration';
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
