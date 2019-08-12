import React from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, Typography } from 'ui-kit/src';
import css from './table.module.scss';

const Row = observer(() => (
  <tr>
    <td>
      <Icon name="deposit" />
    </td>
    <td>
      <Typography type="bodyAlt">Deposit</Typography>
    </td>
    <td>
      <Typography type="caption">From</Typography>
      <Typography type="caption" theme="white">
        10RHNJFCAVFS9FRLOFXG0OLNXDDDTJE
      </Typography>
    </td>
    <td>
      <Typography tagName="span" type="bodyAlt" theme="white">
        592.10
      </Typography>
      <Typography className={css.vid} tagName="span" type="caption">
        VID
      </Typography>
    </td>
  </tr>
));

const Table = () => {
  return (
    <table className={css.table}>
      <tbody>
        <Row />
      </tbody>
    </table>
  );
};

export default Table;
