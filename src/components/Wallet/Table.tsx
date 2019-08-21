import React from 'react';
import { map, uniqueId } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { Icon, Typography } from 'ui-kit';
import UserStore from 'stores/user';
import { IWalletAction } from 'stores/models/wallet';
import css from './table.module.scss';

const Row = observer(({ action }: { action: IWalletAction }) => (
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
        {action.from}
      </Typography>
    </td>
    <td className={css.value}>
      <Typography tagName="span" type="bodyAlt" theme="white">
        {action.value}
      </Typography>
      <Typography className={css.vid} tagName="span" type="caption">
        VID
      </Typography>
    </td>
  </tr>
));

const Table = () => {
  const { actions } = UserStore;
  const renderRow = (action: IWalletAction) => (
    <Row action={action} key={uniqueId('action_')} />
  );

  return (
    <table className={css.table}>
      <tbody>{map(renderRow)(actions)}</tbody>
    </table>
  );
};

export default observer(Table);
