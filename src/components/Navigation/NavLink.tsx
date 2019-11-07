import React from 'react';
import cn from 'classnames';
import { Link, LinkGetProps } from '@reach/router';
import { IconName, Typography, Icon } from 'ui-kit';
import css from './index.module.scss';

export interface NavItemProps {
  children?: never;
  icon: IconName;
  active?: boolean;
  to?: string;
  label?: string;
}

const buildClasses: any = ({ isPartiallyCurrent }: LinkGetProps) => ({
  className: cn(css.link, isPartiallyCurrent && css.active),
});

const NavLink = ({ icon, label, to, ...props }: NavItemProps) => (
  <Link to={to} getProps={buildClasses} {...props}>
    <Icon name={icon} width={28} height={28} />
    <Typography type="body">{label}</Typography>
  </Link>
);

export default NavLink;
