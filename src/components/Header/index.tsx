import React from 'react';
import { Logo } from 'ui-kit';
import css from './index.module.scss';

const Header = () => (
  <div className={css.header}>
    <Logo type="colorWhite" width={171} />
  </div>
);

export default Header;
