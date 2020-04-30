import React, { useEffect, useState } from 'react';
import { eq, map, orderBy } from 'lodash/fp';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Spinner, Typography } from 'ui-kit';
import WorkersStore, { IWorker } from 'stores/workers';
import { ORDER } from 'const';
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
  const [order, setOrder] = useState<ORDER>(ORDER.ASC);
  const [data, setData] = useState(registeredWorkers);

  useEffect(() => {
    setData(orderBy<IWorker>(sortBy, order)(registeredWorkers as IWorker[]));
  }, [sortBy, order, registeredWorkers]);

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
          <tbody>{renderTable(data)}</tbody>
        </table>
      )}
    </>
  );
};

export default observer(RegisteredWorkersList);
