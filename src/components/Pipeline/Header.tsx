import React from 'react';
import { Button, Typography } from 'ui-kit';
import PipelinesStore from 'stores/pipelines';
import { observer } from 'mobx-react-lite';
import { modalType } from 'components/ModalManager';
import ModalStore from 'stores/modal';
import css from './index.module.scss';

const PipelineHeader = () => {
  const { openModal } = ModalStore;
  const { pipeline } = PipelinesStore;

  const handleOpen = () => openModal(modalType.STREAMS_DELETE_CONFIRM);

  return (
    <>
      <div>
        <Typography type="caption">VideoCoin Network</Typography>
        <Typography type="smallTitle">Pipelines</Typography>
      </div>
      <div className={css.btns}>
        {Boolean(pipeline && pipeline.checked.length) && (
          <Button theme="minimal" onClick={handleOpen}>
            Delete
          </Button>
        )}
      </div>
    </>
  );
};

export default observer(PipelineHeader);
