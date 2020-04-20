import React from 'react';
import { observer } from 'mobx-react-lite';
import WorkersStore from 'stores/workers';
import { Icon, Typography, Spinner } from 'ui-kit';
import ControlBar from 'components/UI/ControlBar';

const WorkersControl = () => {
  const { isDeleting, checked, deleteWorkers } = WorkersStore;

  return (
    <ControlBar isOpen={Boolean(checked.length)}>
      <Typography type="caption">{checked.length} Selected</Typography>
      <button type="button" onClick={deleteWorkers}>
        {isDeleting ? (
          <Spinner type="inline" size="sm" />
        ) : (
          <Icon name="trash" width={24} height={24} />
        )}
      </button>
    </ControlBar>
  );
};

export default observer(WorkersControl);
