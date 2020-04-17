import React from 'react';
import { observer } from 'mobx-react-lite';
import billingStore, { IChart } from 'stores/billing';
import {
  formatChartDate,
  formatDuration,
  getPeriod,
} from 'components/Billing/utils';
import css from 'components/Billing/chart.module.scss';
import { Typography } from 'ui-kit';

const ChartTooltip = ({ item }: { item: IChart }) => {
  const { totalVod, totalLive } = billingStore;
  const data = item ? formatChartDate(item?.name) : getPeriod();
  const vodDuration = item
    ? formatDuration(item.vod)
    : formatDuration(totalVod);
  const liveDuration = item
    ? formatDuration(item.live)
    : formatDuration(totalLive);
  return (
    <div className={css.tooltip}>
      <Typography type="caption">{data}</Typography>
      <div className={css.tooltipRow}>
        <div className={css.tooltipItem}>
          <span />
          <Typography type="body">Video Encoding - {vodDuration}</Typography>
        </div>
        <div className={css.tooltipItem}>
          <span className={css.red} />
          <Typography type="body">Livestreaming - {liveDuration}</Typography>
        </div>
      </div>
    </div>
  );
};

export default observer(ChartTooltip);
