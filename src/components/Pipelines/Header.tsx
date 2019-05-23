import React from 'react';
import { Button, Typography } from 'ui-kit/src';
import { Link } from '@reach/router';
import PipelinesStore from 'stores/pipelines';
import { observer } from 'mobx-react-lite';
import UserStore from 'stores/user';
import { modalType } from 'components/ModalManager';
import ModalStore from 'stores/modal';
import css from './index.module.scss';

const Header = () => {
  const { balance } = UserStore;
  const { openModal } = ModalStore;
  const { checked } = PipelinesStore;

  const handleOpen = () => openModal(modalType.PIPELINES_DELETE_CONFIRM);

  return (
    <>
      <div>
        <Typography type="caption">VideoCoin Network</Typography>
        <Typography type="smallTitle">Livestream Pipelines</Typography>
      </div>
      <div className={css.btns}>
        {Boolean(checked.size) && (
          <Button theme="minimal" onClick={handleOpen}>
            Delete
          </Button>
        )}
        <Link className={!balance ? css.disabled : ''} to="new">
          <Button disabled={!balance}>New livestream</Button>
        </Link>
      </div>
    </>
  );
};

export default observer(Header);
