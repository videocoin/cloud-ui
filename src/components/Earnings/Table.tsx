import React, { useEffect, useState } from 'react';
import workersStore, { IWorker } from 'stores/workers';
import { observer } from 'mobx-react-lite';
import { Typography } from 'ui-kit';
import css from './styles.module.scss';
import { ORDER } from 'const';
import { eq, map, orderBy } from 'lodash/fp';
import TableRow from './TableRow';
import cn from 'classnames';
import usePolling from 'hooks/usePolling';
import { toJS } from 'mobx';

const fields = [
  {
    name: 'status',
    label: 'Status',
  },
  {
    name: 'name',
    label: 'Worker Name',
  },
  {
    name: 'rewards',
    label: 'Earnings',
  },
];

const renderHead = (
  onClick: (field: string) => void,
  sortBy: string,
  isASC: boolean,
) =>
  map(({ name, label, colspan = 1 }) => {
    const handleSort = () => onClick(name);
    const isActive = eq(name, sortBy);

    return (
      <th key={name} colSpan={colspan} onClick={handleSort}>
        <Typography
          className={cn(css.th, { [css.active]: isActive })}
          type="smallBody"
        >
          {isActive && <div className={cn(css.arrow, { [css.asc]: isASC })} />}
          {label}
        </Typography>
      </th>
    );
  })(fields);

const renderTable = map((worker: IWorker) => (
  <TableRow key={worker.id} {...worker} />
));

const Table = () => {
  const { workers, fetchWorkers } = workersStore;
  const [sortBy, setSortBy] = useState('status');
  const [order, setOrder] = useState<ORDER>(ORDER.ASC);
  const [data, setData] = useState<IWorker[]>([]);

  usePolling(fetchWorkers);

  useEffect(() => {
    setData(orderBy<IWorker>(sortBy, order)(toJS(workers) as IWorker[]));
  }, [sortBy, order, workers, workers.length]);

  const isASC = eq(ORDER.ASC, order);
  const handleSort = (field: string) => {
    if (eq(field, sortBy)) {
      setOrder(isASC ? ORDER.DESC : ORDER.ASC);
    } else {
      setOrder(ORDER.ASC);
      setSortBy(field);
    }
  };

  return (
    <div>
      <div className={css.title}>
        <Typography type="subtitleCaps">Your Workers</Typography>
      </div>
      {data.length ? (
        <table className={css.table}>
          <thead>
            <tr>{renderHead(handleSort, sortBy, isASC)}</tr>
          </thead>
          <tbody>{renderTable(data)}</tbody>
        </table>
      ) : (
        <div className={css.empty}>
          <Typography type="title">Setup Workers First</Typography>
        </div>
      )}
    </div>
  );
};

export default observer(Table);
