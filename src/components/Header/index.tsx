import React from 'react';
import { Button, Logo, Typography } from 'ui-kit';
import css from './index.module.scss';
import { map } from 'lodash/fp';
import { Link } from '@reach/router';

interface LinkProps {
  label: string;
  path: string;
}

const links: LinkProps[] = [
  {
    label: 'The Network',
    path: 'https://videocoin.network',
  },
  {
    label: 'Pricing',
    path: 'https://videocoin.network/pricing',
  },
  {
    label: 'Developers',
    path: 'https://videocoin.network/developers',
  },
  {
    label: 'Workers',
    path: 'https://videocoin.network/workers',
  },
  {
    label: 'Stakers',
    path: 'https://videocoin.network/stakers',
  },
  {
    label: 'Blog',
    path: 'https://videocoin.network/blog',
  },
];

const Header = ({ isSignin }: { isSignin?: boolean }) => {
  const renderLink = ({ label, path }: LinkProps) => (
    <a href={path} target="_blank" rel="noopener noreferrer" key={label}>
      {label}
    </a>
  );
  const handleClick = () => {
    gtag('event', 'conversion', {
      send_to: 'AW-766963740/vD8-CLi05tUBEJzg2-0C',
    });
  };
  return (
    <div className={css.header}>
      <Logo type="colorWhite" width={171} />
      <div className={css.navbar}>{map(renderLink)(links)}</div>
      {isSignin ? (
        <Link to="/sign-up" onClick={handleClick}>
          <Button>Create Account</Button>
        </Link>
      ) : (
        <Link to="/sign-in">
          <Typography type="smallBodyThin">Login</Typography>
        </Link>
      )}
    </div>
  );
};

export default Header;
