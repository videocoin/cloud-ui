import React, { FormEvent, useEffect, useState } from 'react';
import cn from 'classnames';
import { eq } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import WorkersStore from 'stores/workers';
import { Typography, Spinner, Input } from 'ui-kit';
import formatBytes from 'helpers/formatBytes';
import css from './styles.module.scss';

const Worker = () => {
  const [name, setName] = useState('');
  const { worker, isLoading, updateWorker } = WorkersStore;

  useEffect(() => {
    if (worker) {
      setName(worker.name);
    }
  }, [worker]);
  if (!worker || isLoading) return <Spinner />;
  const { id, status, systemInfo } = worker;
  const isNew = eq('NEW', status);
  const handleChangeName = (e: FormEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateWorker({ name });
  };

  return (
    <div className={css.root}>
      <div className={cn(css.status, css[status])}>
        <div />
        <Typography type="body">{status.toLowerCase()}</Typography>
      </div>
      <div className={css.spec}>
        <div>
          <Typography>Last Ping</Typography>
          <Typography type="body">Nov. 6th, 2019, 7:43pm</Typography>
        </div>
        <div>
          <Typography>Client ID</Typography>
          <Typography type="body">{id}</Typography>
        </div>
      </div>
      <form id="workerForm" className={css.name} onSubmit={handleSave}>
        <Input value={name} onChange={handleChangeName} label="Worker Name" />
      </form>
      <div className={css.info}>
        <div className={css.head}>
          <Typography type="subtitleCaps">System information</Typography>
        </div>
        <div className={css.config}>
          <Typography type="body">System Config</Typography>
          {isNew ? (
            <Typography>(Setup Required)</Typography>
          ) : (
            <>
              <div className={css.configItem}>
                <Typography type="body">
                  {(systemInfo.cpuFreq / 1000).toFixed(1)} ghz
                </Typography>
              </div>
              <div className={css.configItem}>
                <Typography type="body">{systemInfo.cpuCores} Cores</Typography>
              </div>
              <div className={css.configItem}>
                <Typography type="body">
                  {formatBytes(systemInfo.memTotal)}gb RAM
                </Typography>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Worker);
