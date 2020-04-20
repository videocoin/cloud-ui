import React from 'react';
import { observer } from 'mobx-react-lite';
import StreamsStore from 'stores/streams';
import { Icon, Typography, Spinner } from 'ui-kit';
import ControlBar from 'components/UI/ControlBar';
import { modalType } from 'components/ModalManager';
import ModalStore from 'stores/modal';

const StreamsControl = () => {
  const { isDeleting, checked } = StreamsStore;
  const { openModal } = ModalStore;
  const handleOpen = () => openModal(modalType.STREAMS_DELETE_CONFIRM);

  return (
    <ControlBar isOpen={Boolean(checked.size)}>
      <Typography type="caption">{checked.size} Selected</Typography>
      <button type="button" onClick={handleOpen}>
        {isDeleting ? (
          <Spinner type="inline" size="sm" />
        ) : (
          <Icon name="trash" width={24} height={24} />
        )}
      </button>
    </ControlBar>
  );
};

export default observer(StreamsControl);
