import React, { ReactNode } from 'react';
import { Typography } from 'ui-kit';
import css from './index.module.scss';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className={css.section}>
    <Typography className={css.header} type="subtitle">
      {title}
    </Typography>
    {children}
  </div>
);

export default Section;
