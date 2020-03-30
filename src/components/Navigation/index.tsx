import React from 'react';
import { map } from 'lodash/fp';
import { IconName, Navigation as BaseNavigation } from 'ui-kit';
import UserStore from 'stores/user';
import NavLink from './NavLink';
import css from './index.module.scss';
import { USER_ROLE } from '../../const';

const navIcons: Record<string, IconName> = {
  streams: 'pipelines',
  workers: 'workers',
  account: 'account',
  wallet: 'videoCoinWallet',
};

const navLinks: Record<USER_ROLE, string[]> = {
  [USER_ROLE.REGULAR]: ['streams', '', 'billing', 'account'],
  [USER_ROLE.MINER]: ['workers', '', 'billing', 'account'],
  [USER_ROLE.SUPER]: ['streams', 'workers', '', 'billing', 'account'],
};

const navLabels: Record<string, string> = {
  streams: 'Streams',
  workers: 'Workers',
  wallet: 'Wallet',
  account: 'Account',
};

const Navigation = () => {
  const { isActive, user } = UserStore;
  const renderLink = (link: string) => {
    const path = `/dashboard/${link}`;

    if (!link) {
      return <div key="divider" className={css.bottom} />;
    }

    return (
      <NavLink
        key={link}
        icon={navIcons[link]}
        label={navLabels[link]}
        to={path}
      />
    );
  };

  return (
    <BaseNavigation>
      {isActive && <>{map(renderLink)(navLinks[user.role])}</>}
    </BaseNavigation>
  );
};

export default Navigation;
