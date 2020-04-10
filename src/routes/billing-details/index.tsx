import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, TopBar, Typography } from 'ui-kit';
import { RouteComponentProps } from '@reach/router';
import billingStore from 'stores/billing';
import usePolling from 'hooks/usePolling';
import BackLink from 'components/BackLink';
import PrepaidCard from 'components/Billing/PrepaidCard';
import TransactionsTable from 'components/Billing/TransactionsTable';
import { modalType } from 'components/ModalManager';
import modalStore from 'stores/modal';

const BillingDetailsPage: FC<RouteComponentProps> = () => {
  const { fetchTransactions } = billingStore;
  const { openModal } = modalStore;

  const handleAddFunds = () => {
    openModal(modalType.ADD_FUNDS);
  };
  const handleWithdraw = () => {
    openModal(modalType.WITHDRAW);
  };
  usePolling(fetchTransactions);

  return (
    <div>
      <div className="topBar">
        <div>
          <TopBar>
            <BackLink to="/dashboard/billing" />
            <div>
              <Typography type="caption">VideoCoin Network</Typography>
              <Typography type="smallTitle">Billing</Typography>
            </div>
            <div className="mla">
              <div>
                <Button theme="minimal" onClick={handleWithdraw}>
                  Withdraw Funds
                </Button>
                <Button theme="sunkissed" onClick={handleAddFunds}>
                  Add Funds
                </Button>
              </div>
            </div>
          </TopBar>
        </div>
      </div>
      <div className="content">
        <PrepaidCard />
        <TransactionsTable />
      </div>
    </div>
  );
};

export default observer(BillingDetailsPage);
