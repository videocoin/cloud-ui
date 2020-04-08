import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { TopBar, Typography } from 'ui-kit';
import { RouteComponentProps } from '@reach/router';
import Balance from 'components/Billing/Balance';
import PaymentMethods from 'components/Billing/PaymentMethods';
import StreamsTable from 'components/Billing/StreamsTable';
import Chart from 'components/Billing/Chart';
import getPeriod from 'components/Billing/getPeriod';
import css from './styles.module.scss';

const BillingPage: FC<RouteComponentProps> = () => {
  return (
    <div>
      <div className="topBar">
        <div>
          <TopBar>
            <div>
              <Typography type="caption">VideoCoin Network</Typography>
              <Typography type="smallTitle">Billing</Typography>
            </div>
            <div className="mla">
              <div>
                <Typography align="right" type="subtitleCaps">
                  Current month&apos;s usage
                </Typography>
                <Typography align="right" type="smallBody">
                  {getPeriod()}
                </Typography>
              </div>
            </div>
          </TopBar>
        </div>
      </div>
      <div className="content">
        <div className={css.wrap}>
          <div className={css.left}>
            <Balance />
            <PaymentMethods />
          </div>
          <Chart />
        </div>
        <StreamsTable />
      </div>
    </div>
  );
};

export default observer(BillingPage);
