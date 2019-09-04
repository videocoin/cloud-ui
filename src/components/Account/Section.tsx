import React, { ReactNode } from 'react';
import { Typography } from 'ui-kit';
import css from './index.module.scss';

const Section = ({
  title,
  children,
  right,
}: {
  title: string;
  children: ReactNode;
  right?: () => ReactNode;
}) => (
  <div className={css.section}>
    <div className={css.header}>
      <Typography className={css.title} type="subtitle">
        {title}
      </Typography>
      {right && right()}
    </div>
    {children}
  </div>
);

export default Section;
