/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer } from 'recharts';
import { Typography } from 'ui-kit/src/Typography';
import css from './chart.module.scss';
import './chart.scss';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const CustomTooltip = ({ item }: { item: any }) => (
  <div className={css.tooltip}>
    <Typography type="caption">Mar 5, 2020</Typography>
    <div className={css.tooltipRow}>
      <div className={css.tooltipItem}>
        <span />
        <Typography type="body">Video Encoding - 32:23</Typography>
        <Typography type="bodyThin">mins</Typography>
      </div>
      <div className={css.tooltipItem}>
        <span className={css.red} />
        <Typography type="body">Livestreaming - 1:23</Typography>
        <Typography type="bodyThin">hrs</Typography>
      </div>
    </div>
  </div>
);

const Chart = () => {
  const [active, setActive] = useState(null);
  const onClick = (item: any) => {
    setActive(item);
  };

  return (
    <div className={css.chart}>
      <CustomTooltip item={active} />
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={14}
          barCategoryGap={10}
        >
          <XAxis
            dataKey="name"
            scale="point"
            axisLine={false}
            tickLine={false}
            stroke="#B099D2"
            padding={{ left: 10, right: 10 }}
          />
          <Bar dataKey="pv" stackId="a" fill="#7234C8" onClick={onClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === active?.name ? '#7234C8' : '#7234C8'}
                key={`cell-${index}`}
                style={{
                  marginBottom: 2,
                }}
              />
            ))}
          </Bar>
          <Bar dataKey="uv" stackId="a" fill="#F53568" onClick={onClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === active?.name ? '#F53568' : '#F53568'}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
