import React from 'react';
import { Button, Typography } from 'ui-kit';
import { Link } from '@reach/router';
import { observer } from 'mobx-react-lite';
import { modalType } from 'components/ModalManager';
import ModalStore from 'stores/modal';
import StreamsStore from 'stores/streams';
import css from './index.module.scss';
import billingStore from 'stores/billing';

const Header = () => {
  const { billing } = billingStore;
  const { openModal } = ModalStore;
  const { checked } = StreamsStore;

  const handleOpen = () => openModal(modalType.STREAMS_DELETE_CONFIRM);

  return (
    <>
      <div>
        <Typography type="caption">VideoCoin Network</Typography>
        <Typography type="smallTitle">Streams</Typography>
      </div>
      <div className={css.btns}>
        {Boolean(checked.size) && (
          <Button theme="minimal" onClick={handleOpen}>
            Delete
          </Button>
        )}
        <Link className={!billing.balance ? css.disabled : ''} to="new">
          <Button disabled={!billing.balance}>New stream</Button>
        </Link>
      </div>
    </>
  );
};

export default observer(Header);
