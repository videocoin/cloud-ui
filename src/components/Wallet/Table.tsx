import React from 'react';
import { map, uniqueId, lowerCase, capitalize } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { Icon, IconName, Pagination, Typography } from 'ui-kit';
import UserStore from 'stores/user';
import { IWalletAction } from 'stores/models/wallet';
import css from './table.module.scss';

const icon: { [key in string]: IconName } = {
  DEPOSIT: 'deposit',
  ACCOUNT_FUNDED: 'deposit',
  STREAM_REFUNDED: 'withdrawal',
  STREAM_CREATED: 'payment',
};

const Row = observer(({ action }: { action: IWalletAction }) => (
  <tr>
    <td>{icon[action.type] && <Icon name={icon[action.type]} />}</td>
    <td>
      <Typography type="body">{capitalize(lowerCase(action.type))}</Typography>
    </td>
    <td className={css.hash}>
      <Typography type="caption">From</Typography>
      <Typography type="caption" theme="white" className={css.from}>
        {action.from}
      </Typography>
    </td>
    <td className={css.value}>
      <Typography tagName="span" type="body" theme="white">
        {action.value}
      </Typography>
      <Typography className={css.vid} tagName="span" type="caption">
        VID
      </Typography>
    </td>
  </tr>
));

const Table = () => {
  const { actions, fetchActions, actionsMeta } = UserStore;
  const { hasMore } = actionsMeta;
  const handlePageChange = (val: number) => {
    fetchActions(val);
  };
  const renderRow = (action: IWalletAction) => (
    <Row action={action} key={uniqueId('action_')} />
  );

  return (
    <div className={css.root}>
      <div className={css.header}>
        <Typography type="subtitle">Transactions</Typography>
      </div>
      <table className={css.table}>
        <tbody>{map(renderRow)(actions)}</tbody>
      </table>
      <div className={css.pagination}>
        <Pagination onChange={handlePageChange} max={!hasMore} />
      </div>
    </div>
  );
};

export default observer(Table);
