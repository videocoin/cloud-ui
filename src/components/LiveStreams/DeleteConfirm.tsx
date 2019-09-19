import React from 'react';
import pluralize from 'pluralize';
import { some, propEq } from 'lodash/fp';
import { ActionBar, Button, Typography } from 'ui-kit';
import Modal from 'components/Modal';
import StreamsStore from 'stores/streams';
import { observer } from 'mobx-react-lite';

const DeleteConfirm = ({ closeModal }: { closeModal: () => void }) => {
  const { isDeleting, checked, deleteStreams } = StreamsStore;

  const hasRunning = some(propEq('status', 'INPUT_STATUS_ACTIVE'), checked);
  const onConfirm = async () => {
    await deleteStreams();
    closeModal();
  };

  return (
    <Modal>
      <div className="modalInner">
        <Typography type="bodyAlt">
          Delete {pluralize('Livestream', checked.size, true)}?
        </Typography>
        <Typography type="smallBody">
          {hasRunning
            ? 'One of the selected livestreams is running and will be ended immediately upon deletion.'
            : 'These livestreams will be permanently deleted.'}
        </Typography>
        <div className="modalActions">
          <ActionBar>
            <Button theme="minimal" onClick={closeModal}>
              Cancel
            </Button>
            <Button loading={isDeleting} onClick={onConfirm}>
              Delete
            </Button>
          </ActionBar>
        </div>
      </div>
    </Modal>
  );
};

export default observer(DeleteConfirm);
