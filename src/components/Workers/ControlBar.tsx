import React from 'react';
import { observer } from 'mobx-react-lite';
import WorkersStore from 'stores/workers';
import { Icon, Typography, Spinner } from 'ui-kit';
import css from './styles.module.scss';

const ControlBar = () => {
  const { isDeleting, checked, deleteWorkers } = WorkersStore;

  return (
    <div className={css.controlBar}>
      <Typography type="caption">{checked.length} Selected</Typography>
      <button type="button" onClick={deleteWorkers}>
        {isDeleting ? (
          <Spinner type="inline" size="sm" />
        ) : (
          <Icon name="trash" width={24} height={24} />
        )}
      </button>
    </div>
  );
};

export default observer(ControlBar);
