import React from 'react';
import pluralize from 'pluralize';
import { ActionBar, Button, Typography } from 'ui-kit';
import Modal from 'components/Modal';
import PipelinesStore from 'stores/pipelines';
import { TPipelineStore } from 'stores/types';
import { observer } from 'mobx-react-lite';

const DeleteConfirm = ({ closeModal }: { closeModal: () => void }) => {
  const {
    checked,
    deletePipelines,
    isDeleting,
  }: TPipelineStore = PipelinesStore;
  const onConfirm = async () => {
    await deletePipelines();
    closeModal();
  };

  return (
    <Modal>
      <div className="modalInner">
        <Typography type="bodyAlt">
          Delete {pluralize('Pipeline', checked.size, true)}?
        </Typography>
        <Typography type="smallBody">
          These pipelines will be permanently deleted.
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
