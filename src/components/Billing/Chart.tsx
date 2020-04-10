import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer } from 'recharts';
import css from './chart.module.scss';
import './chart.scss';
import billingStore, { IChart } from 'stores/billing';
import { toJS } from 'mobx';
import { map } from 'lodash/fp';
import { tickFormatter } from 'components/Billing/utils';
import ChartTooltip from 'components/Billing/ChartTooltip';

const Chart = () => {
  const [active, setActive] = useState(null);
  const { charts } = billingStore;
  const onMouseLeave = () => setActive(null);
  const plainChart = toJS(charts);
  const renderVodBar = (entry: IChart) => (
    <Cell
      cursor="pointer"
      opacity={active ? (entry.name === active.name ? 1 : 0.24) : 1}
      fill="#7234C8"
      key={`cell-${entry.name}`}
    />
  );
  const renderLiveBar = (entry: any) => (
    <Cell
      cursor="pointer"
      opacity={active ? (entry.name === active.name ? 1 : 0.24) : 1}
      fill="#F53568"
      key={`cell-${entry.name}`}
    />
  );
  return (
    <div className={css.chart}>
      <ChartTooltip item={active} />
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={plainChart}
          onMouseLeave={onMouseLeave}
          style={{ cursor: 'pointer' }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            interval={0}
            tickFormatter={tickFormatter}
            stroke="#B099D2"
          />
          <Bar
            dataKey="vod"
            stackId="a"
            fill="#7234C8"
            onMouseEnter={setActive}
          >
            {map(renderVodBar)(plainChart)}
          </Bar>
          <Bar
            dataKey="live"
            stackId="a"
            fill="#F53568"
            onMouseEnter={setActive}
          >
            {map(renderLiveBar)(plainChart)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default observer(Chart);
