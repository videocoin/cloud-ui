import React from 'react';
import { Typography } from 'ui-kit';
import css from './index.module.scss';

const SubtitleDivider = ({ title }: { title: string }) => {
  return (
    <div className={css.subttlDivider}>
      <Typography type="subtitleCaps">{title}</Typography>
    </div>
  );
};

export default SubtitleDivider;
