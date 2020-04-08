import React from 'react';
import SubtitleDivider from 'components/UI/SubtitleDivider';
import { Radio, Typography } from 'ui-kit';
import modalStore from 'stores/modal';
import userStore from 'stores/user';
import { modalType } from 'components/ModalManager';
import css from './styles.module.scss';

const PaymentItem = ({ onChange }: { onChange: () => void }) => {
  const { openModal } = modalStore;
  const { balance } = userStore;
  const handleAddFunds = () => {
    openModal(modalType.ADD_FUNDS);
  };

  return (
    <div className={css.paymentItem}>
      <Radio defaultSelected="prepaid" name="methods" onChange={onChange}>
        <Radio.RadioBtn value="prepaid">
          <div className={css.paymentItemTop}>
            <Typography type="body">Prepaid Credits</Typography>
            <Typography type="smallBody">${balance}</Typography>
            <Typography type="smallBodyThin">left</Typography>
          </div>
          <div className={css.paymentItemBottom}>
            <button type="button" onClick={handleAddFunds}>
              Add Funds
            </button>
            <button type="button">Details</button>
          </div>
        </Radio.RadioBtn>
      </Radio>
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div>
      <SubtitleDivider title="Payment methods" />
      <PaymentItem onChange={() => false} />
    </div>
  );
};

export default PaymentMethods;
