import React from 'react';
import { Icon, Typography } from 'ui-kit';
import { observer } from 'mobx-react-lite';
import StreamsStore from 'stores/streams';
import icon from './assets/started.svg';
import css from './GettingStarted.module.scss';
import billingStore from 'stores/billing';

const GettingStarted = () => {
  const { billing } = billingStore;
  const { streams, isLoaded } = StreamsStore;

  if (streams.length > 2 || !isLoaded) {
    return null;
  }

  return (
    <div className={css.root}>
      <div className={css.icon}>
        <img src={icon} alt="" />
      </div>
      <div className={css.desc}>
        <Typography type="display3">Getting Started</Typography>
        <Typography>
          VideoCoin lets you quickly get a stream up and running using our
          distributed network
        </Typography>
        <ul className={css.steps}>
          <li className={Number(billing.balance) > 0 ? css.cross : ''}>
            <Icon
              color={billing.balance ? '#5f4681' : '#fd9369'}
              name="videoCoinWallet"
              height={24}
              width={24}
            />
            <Typography type="caption">
              Step 1 - Fund your VideoCoin Wallet
            </Typography>
          </li>
          <li className={streams.length > 0 ? css.cross : ''}>
            <Icon
              color={streams.length > 0 ? '#5f4681' : '#fd9369'}
              name="livestreamManager"
              height={24}
              width={24}
            />
            <Typography type="caption">
              Step 2 - Create and run your first stream
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default observer(GettingStarted);
