import React, { ReactNode, useState } from 'react';
import { eq } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { SingleSelector } from 'ui-kit';
import TransactionsTable from 'components/Wallet/TransactionsTable';
import EventsTable from 'components/Wallet/EventsTable';
import css from './index.module.scss';
import WalletTab from './Wallet';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';

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
  const [tableTab, setTableTab] = useState('transactions');
  const handleSetTab = (tab: string) => () => setActiveTab(tab);
  const handleSetTableTab = (tab: string) => () => setTableTab(tab);
  const isSelected = eq(activeTab);
  const isSelectedTable = eq(tableTab);

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
      <div className={css.tabNav}>
        <button
          type="button"
          className={isSelectedTable('transactions') ? css.tabActive : ''}
          onClick={handleSetTableTab('transactions')}
        >
          Transactions
        </button>
        <button
          type="button"
          className={isSelectedTable('events') ? css.tabActive : ''}
          onClick={handleSetTableTab('events')}
        >
          Events
        </button>
      </div>
      {tableTab === 'events' && <EventsTable />}
      {tableTab === 'transactions' && <TransactionsTable />}
    </div>
  );
};

export default observer(Wallet);
