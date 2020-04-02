import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import { RouteComponentProps } from '@reach/router';
import Balance from 'components/Billing/Balance';
import PaymentMethods from 'components/Billing/PaymentMethods';
import css from './styles.module.scss';

const BillingPage: FC<RouteComponentProps> = () => {
  return (
    <div>
      <div className="topBar">
        <div>
          <TopBar>
            <BackLink />
            <div>
              <Typography type="caption">VideoCoin Network</Typography>
              <Typography type="smallTitle">Billing</Typography>
            </div>
            <div className="mla">
              <div>
                <Typography align="right" type="subtitleCaps">
                  Current Billing Cycle
                </Typography>
                <Typography align="right" type="smallBody">
                  Mar 1 - Mar 31, 2020
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
        </div>
      </div>
    </div>
  );
};

export default observer(BillingPage);
