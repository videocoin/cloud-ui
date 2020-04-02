import React from 'react';
import { Navigation as BaseNavigation } from 'ui-kit';
import UserStore from 'stores/user';
import NavLink from './NavLink';
import css from './index.module.scss';

const Navigation = () => {
  const { isActive } = UserStore;

  return (
    <BaseNavigation>
      {isActive && (
        <>
          <NavLink icon="pipelines" label="Streams" to="/dashboard/streams" />
          <NavLink icon="workers" label="Workers" to="/dashboard/workers" />
          <div className={css.bottom}>
            <NavLink
              icon="videoCoinWallet"
              label="Billing"
              to="/dashboard/billing"
            />
            <NavLink
              icon="videoCoinWallet"
              label="Wallet"
              to="/dashboard/wallet"
            />
            <NavLink icon="account" label="Account" to="/dashboard/account" />
          </div>
        </>
      )}
    </BaseNavigation>
  );
};

export default Navigation;
