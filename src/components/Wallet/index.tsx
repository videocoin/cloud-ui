import React, { ReactNode, useState } from 'react';
import { SingleSelector } from 'ui-kit';
import css from './index.module.scss';
import WalletTab from './Wallet';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';

const ACTIVE_TAB: { [tab: string]: ReactNode } = {
  wallet: <WalletTab />,
  deposit: <Deposit />,
  withdrawal: <Withdrawal />,
};

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('wallet');
  const handleSetTab = (tab: string) => () => setActiveTab(tab);

  return (
    <div className={css.root}>
      <div className={css.sidebar}>
        <SingleSelector
          selected={activeTab === 'wallet'}
          label="Wallet"
          onClick={handleSetTab('wallet')}
        />
        <SingleSelector
          selected={activeTab === 'deposit'}
          label="Make Deposit"
          onClick={handleSetTab('deposit')}
        />
        <SingleSelector
          selected={activeTab === 'withdrawal'}
          label="Make Withdrawal"
          onClick={handleSetTab('withdrawal')}
        />
      </div>
      <div className={css.body}>{ACTIVE_TAB[activeTab]}</div>
    </div>
  );
};

Wallet.defaultProps = {};

export default Wallet;
