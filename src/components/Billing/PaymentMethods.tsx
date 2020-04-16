import React from 'react';
import SubtitleDivider from 'components/UI/SubtitleDivider';
import { observer } from 'mobx-react-lite';
import { Link } from '@reach/router';
import { Radio, Typography } from 'ui-kit';
import modalStore from 'stores/modal';
import { modalType } from 'components/ModalManager';
import billingStore from 'stores/billing';
import truncateBalance from 'helpers/truncateBalance';
import css from './styles.module.scss';

const PaymentItem = observer(({ onChange }: { onChange: () => void }) => {
  const { openModal } = modalStore;
  const { billing } = billingStore;

  const handleAddFunds = () => {
    openModal(modalType.ADD_FUNDS);
  };

  return (
    <div className={css.paymentItem}>
      <Radio defaultSelected="prepaid" name="methods" onChange={onChange}>
        <Radio.RadioBtn value="prepaid">
          <div className={css.paymentItemTop}>
            <Typography type="body">Prepaid Credits</Typography>
            <Typography type="smallBody">
              ${truncateBalance(billing.balance)}
            </Typography>
            <Typography type="smallBodyThin">left</Typography>
          </div>
          <div className={css.paymentItemBottom}>
            <button type="button" onClick={handleAddFunds}>
              Add Funds
            </button>
            <Link to="/dashboard/billing-details">
              <button type="button">Details</button>
            </Link>
          </div>
        </Radio.RadioBtn>
      </Radio>
    </div>
  );
});

const PaymentMethods = () => {
  return (
    <>
      <SubtitleDivider title="Payment methods" />
      <PaymentItem onChange={() => false} />
    </>
  );
};

export default observer(PaymentMethods);
