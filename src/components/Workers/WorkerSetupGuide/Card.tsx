import React from 'react';
import { Icon, IconName, Typography } from 'ui-kit';
import css from './styles.module.scss';

export interface WorkerSetupGuideCard {
  icon: IconName;
  title: string;
  link: string;
}

const WorkerSetupGuideCard = ({ icon, title, link }: WorkerSetupGuideCard) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className={css.card}>
    <div className={css.cardIcon}>
      <Icon name={icon} />
    </div>
    <Typography className={css.cardDesc} type="body">
      {title} Setup Guide
    </Typography>
  </a>
);

export default WorkerSetupGuideCard;
