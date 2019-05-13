import React from 'react';
import { Navigation as BaseNavigation } from 'ui-kit';
import UserStore from 'stores/user';
import NavLink from './NavLink';

const Navigation = () => {
  const { isActive } = UserStore;
  return (
    <BaseNavigation>
      {isActive && (
        <>
          <NavLink icon="account" label="Account" to="/dashboard/account" />
        </>
      )}
    </BaseNavigation>
  );
};

export default Navigation;
