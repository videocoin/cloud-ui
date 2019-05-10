import React from 'react';
import { Logo } from 'videocoin-ui-kit';
import css from './index.module.scss';

const Header = () => {
  return (
    <div className={css.header}>
      <Logo type="colorWhite" width={171} />
    </div>
  );
};

Header.defaultProps = {};

export default Header;
