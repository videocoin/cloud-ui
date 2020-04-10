import { format, parseISO } from 'date-fns/fp';
import { compose } from 'lodash/fp';

const formatDate = (formatStr: string) => compose(format(formatStr), parseISO);

export default formatDate;
