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
          <NavLink icon="pipelines" label="Streams" to="streams" />
          <div className={css.bottom}>
            <NavLink icon="videoCoinWallet" label="Wallet" to="wallet" />
            <NavLink icon="account" label="Account" to="account" />
          </div>
        </>
      )}
    </BaseNavigation>
  );
};

export default Navigation;
