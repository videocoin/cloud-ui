import React, { useState } from 'react';
import { Button, Typography } from 'ui-kit';
import web3 from 'web3';
import { Field, Form, FormikProps, withFormik } from 'formik';
import { eq } from 'lodash/fp';
import Input from 'components/Input';
import ModalStore from 'stores/modal';
import { modalType } from 'components/ModalManager';
import { observer } from 'mobx-react-lite';
import UserStore from 'stores/user';
import { withdrawStart } from 'api/withdraw';
import { convertToWEI } from 'helpers/convertBalance';
import css from './Deposit.module.scss';

interface WithdrawalForm {
  address: string;
  amount: number | string;
}

const validateAddress = (value: string) => {
  try {
    web3.utils.toChecksumAddress(value);

    return '';
  } catch (e) {
    return 'The entered address is not a valid ERC20 address. Double check the entered address.';
  }
};

const Withdrawal = ({
  values,
  setFieldValue,
  isValid,
}: FormikProps<WithdrawalForm>) => {
  const { balance } = UserStore;
  const [step, setStep] = useState(1);
  const isFirstStep = eq(1, step);
  const nextStepHandle = () => {
    if (isValid) {
      setStep(2);
    }
  };

  const addAllBalance = () => {
    setFieldValue('amount', balance);
  };

  const validateAmount = (val: number) => {
    if (val <= 0) {
      return 'Can\'t be negative.';
    }
    if (val <= balance) {
      return '';
    }

    return 'You can only withdraw a maximum equal to the balance in your wallet.';
  };

  return (
    <div className={css.root}>
      <div className={css.body}>
        <Form id="withdraw" className={css.form}>
          <Typography type="body" theme="white">
            {isFirstStep
              ? ' Enter a ERC20 VideoCoin address to withdraw VideoCoin to'
              : ' Enter the amount of VideoCoin to withdraw'}
          </Typography>
          {!isFirstStep && (
            <Typography>
              A 1 VID fee will be applied to each withdrawal to pay Ethereum
              Mainnet GAS fees.
            </Typography>
          )}
          {isFirstStep ? (
            <div className={css.address}>
              <Field
                validate={validateAddress}
                name="address"
                label="VideoCoin Address"
                component={Input}
              />
            </div>
          ) : (
            <div className={css.address}>
              <div>
                <Field
                  validate={validateAmount}
                  name="amount"
                  type="number"
                  label="Amount of VideoCoin"
                  component={Input}
                  min={0}
                />
                <button
                  type="button"
                  className={css.balanceBtn}
                  onClick={addAllBalance}
                >
                  All ({balance} VID)
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>

      <div className={css.footer}>
        <Typography type="caption">
          Only send VideoCoin (VID) to VideoCoin Addresses.
          <br />
          Sending VideoCoin to a non VideoCoin Address could result in permanent
          loss.
        </Typography>
        {isFirstStep && (
          <Button onClick={nextStepHandle} disabled={!values.address}>
            Next
          </Button>
        )}
        {!isFirstStep && (
          <Button
            form="withdraw"
            type="submit"
            disabled={!values.amount || !isValid}
          >
            Withdraw
          </Button>
        )}
      </div>
    </div>
  );
};

export default withFormik<{}, WithdrawalForm>({
  mapPropsToValues: () => ({
    address: '',
    amount: '',
  }),
  handleSubmit: async ({ amount, address }) => {
    const { openModal, closeModal } = ModalStore;
    const { user, fetchUser } = UserStore;

    const res = await withdrawStart({ amount: convertToWEI(amount), address });

    openModal(modalType.CONFIRM_WITHDRAW_MODAL, {
      amount,
      onConfirm: () => {
        closeModal();
        openModal(modalType.WITHDRAW_SUCCESS_MODAL);
        fetchUser();
      },
      transferId: res.data.transferId,
      email: user.email,
    });
  },
})(observer(Withdrawal));
