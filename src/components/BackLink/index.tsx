import React from 'react';
import { Link } from '@reach/router';
import { Icon } from 'ui-kit/src';
import css from './index.module.scss';

const BackLink = ({ to = '../' }: { to?: string }) => {
  return (
    <Link className={css.btn} to={to}>
      <Icon name="placeholderSm" width={24} height={24} />
    </Link>
  );
};

export default BackLink;
