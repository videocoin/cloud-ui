import React from 'react';
import { observer } from 'mobx-react-lite';
import { map } from 'lodash/fp';
import { IconName, Navigation as BaseNavigation } from 'ui-kit';
import UserStore from 'stores/user';
import NavLink from './NavLink';
import css from './index.module.scss';

const navIcons: Record<string, IconName> = {
  streams: 'pipelines',
  workers: 'workers',
  account: 'account',
  billing: 'billing',
};

const navLabels: Record<string, string> = {
  streams: 'Streams',
  workers: 'Workers',
  billing: 'Billing',
  account: 'Account',
};

const Navigation = () => {
  const { isActive, isWorker, isPublisher } = UserStore;
  const navLinks = (): string[] => {
    if (isWorker && isPublisher) {
      return ['streams', 'workers', '', 'billing', 'account'];
    }
    if (isPublisher) {
      return ['streams', '', 'account'];
    }

    return ['workers', '', 'billing', 'account'];
  };
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
      {isActive && <>{map(renderLink)(navLinks())}</>}
    </BaseNavigation>
  );
};

export default observer(Navigation);
