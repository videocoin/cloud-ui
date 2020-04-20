import React from 'react';
import { Button, Typography } from 'ui-kit';
import { Link } from '@reach/router';
import { observer } from 'mobx-react-lite';
import css from './index.module.scss';
import billingStore from 'stores/billing';

const Header = () => {
  const { billing } = billingStore;

  return (
    <>
      <div>
        <Typography type="caption">VideoCoin Network</Typography>
        <Typography type="smallTitle">Streams</Typography>
      </div>
      <div className={css.btns}>
        <Link className={!billing.balance ? css.disabled : ''} to="new">
          <Button disabled={!billing.balance}>New stream</Button>
        </Link>
      </div>
    </>
  );
};

export default observer(Header);
