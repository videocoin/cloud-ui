import React from 'react';
import { Icon, IconName, Typography } from 'ui-kit';
import css from './styles.module.scss';

export interface WorkerSetupGuideCard {
  icon: IconName;
  title: string;
}

const WorkerSetupGuideCard = ({ icon, title }: WorkerSetupGuideCard) => (
  <div className={css.card}>
    <div className={css.cardIcon}>
      <Icon name={icon} />
    </div>
    <Typography className={css.cardDesc} type="body">
      {title} Setup Guide
    </Typography>
  </div>
);

export default WorkerSetupGuideCard;
