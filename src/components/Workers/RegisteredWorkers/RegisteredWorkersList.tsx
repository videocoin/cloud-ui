import React, { useEffect, useState } from 'react';
import { orderBy, eq, map } from 'lodash/fp';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Typography, Spinner } from 'ui-kit';
import WorkersStore, { IWorker } from 'stores/workers';
import RegisteredWorkerRow from './RegisteredWorkerRow';
import css from './styles.module.scss';

const fields = [
  {
    name: 'status',
    label: 'Status',
    colspan: 2,
  },
  {
    name: 'name',
    label: 'Worker Name',
  },
  {
    name: 'systemInfo.cpuFreq',
    label: 'CPU Freq.',
  },
  {
    name: 'systemInfo.cpuUsage',
    label: 'CPU Usage',
  },
  {
    name: 'systemInfo.cpuCores',
    label: '# Cores',
  },
  {
    name: 'systemInfo.memUsage',
    label: 'RAM Usage',
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
  <RegisteredWorkerRow key={worker.id} {...worker} />
));

const RegisteredWorkersList = () => {
  const { isLoading, registeredWorkers } = WorkersStore;
  const [sortBy, setSortBy] = useState('status');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [data, setData] = useState(registeredWorkers);

  useEffect(() => {
    setData(orderBy<IWorker>(sortBy, order)(registeredWorkers as IWorker[]));
  }, [sortBy, order, registeredWorkers]);

  const isASC = eq('asc', order);
  const handleSort = (field: string) => {
    if (field === sortBy) {
      setOrder(isASC ? 'desc' : 'asc');
    } else {
      setOrder('asc');
      setSortBy(field);
    }
  };

  return (
    <>
      <div className={css.title}>
        <Typography type="subtitleCaps">Registered Workers</Typography>
      </div>
      {isLoading ? (
        <Spinner type="inline" />
      ) : (
        <table className={css.table}>
          <thead>
            <tr>{renderHead(handleSort, sortBy, isASC)}</tr>
          </thead>
          <tbody>{renderTable(data as [])}</tbody>
        </table>
      )}
    </>
  );
};

export default observer(RegisteredWorkersList);
