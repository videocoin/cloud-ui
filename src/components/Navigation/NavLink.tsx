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

const buildClasses: any = ({ isCurrent }: LinkGetProps) => ({
  className: cn(css.link, isCurrent && css.active),
});

const NavLink = ({ icon, label, ...props }: NavItemProps) => (
  <Link getProps={buildClasses} {...props}>
    <Icon name={icon} width={28} height={28} />
    <Typography type="bodyAlt">{label}</Typography>
  </Link>
);

export default NavLink;
