import React, { ReactNode, useState } from 'react';
import { eq } from 'lodash/fp';
import { SingleSelector } from 'ui-kit';
import css from './index.module.scss';
import WalletTab from './Wallet';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
// import Table from './Table';

const TABS = {
  wallet: 'wallet',
  deposit: 'deposit',
  withdrawal: 'withdrawal',
};

const ACTIVE_TAB: { [tab: string]: ReactNode } = {
  wallet: <WalletTab />,
  deposit: <Deposit />,
  withdrawal: <Withdrawal />,
};

const Wallet = () => {
  const [activeTab, setActiveTab] = useState(TABS.wallet);
  const handleSetTab = (tab: string) => () => setActiveTab(tab);
  const isSelected = eq(activeTab);

  return (
    <div>
      <div className={css.root}>
        <div className={css.sidebar}>
          <SingleSelector
            selected={isSelected(TABS.wallet)}
            label="Wallet"
            onClick={handleSetTab(TABS.wallet)}
          />
          <SingleSelector
            selected={isSelected(TABS.deposit)}
            label="Make Deposit"
            onClick={handleSetTab(TABS.deposit)}
          />
          <SingleSelector
            selected={isSelected(TABS.withdrawal)}
            label="Make Withdrawal"
            onClick={handleSetTab(TABS.withdrawal)}
          />
        </div>
        <div className={css.body}>{ACTIVE_TAB[activeTab]}</div>
      </div>
      {/* <Table /> */}
    </div>
  );
};

export default Wallet;
