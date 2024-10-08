import React, { useState, FormEvent } from 'react';
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
import { convertToWEI, VIDBalance } from 'helpers/convertBalance';
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
  const nextStepHandle = (e: FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setStep(2);
    }
  };

  const addAllBalance = () => {
    setFieldValue('amount', VIDBalance(balance - 10 ** 18));
  };

  const validateAmount = (val: number) => {
    if (val <= 0) {
      return 'Can\'t be negative.';
    }
    if (val + 1 > +VIDBalance(balance)) {
      return 'Insufficient balance to cover fee';
    }
    if (val <= balance) {
      return '';
    }

    return 'You can only withdraw a maximum equal to the balance in your wallet.';
  };

  const isRightInput = (+values.amount + 1) * 10 ** 18 < balance;

  return (
    <div className={css.root}>
      <div className={css.body}>
        <div className={css.form}>
          <Typography type="body" theme="white">
            {isFirstStep
              ? ' Enter an ERC20 VideoCoin Address to withdraw tokens to'
              : ' Enter the amount of VideoCoin to withdraw'}
          </Typography>
          {!isFirstStep && (
            <Typography>
              A 1 VID fee will be applied to each withdrawal to pay Ethereum
              Mainnet GAS fees.
            </Typography>
          )}
          {isFirstStep ? (
            <form
              id="next"
              className={css.address}
              onSubmit={nextStepHandle}
              noValidate
            >
              <Field
                validate={validateAddress}
                name="address"
                label="VideoCoin Address"
                component={Input}
              />
            </form>
          ) : (
            <Form id="withdraw" className={css.address} noValidate>
              <div>
                <Field
                  validate={validateAmount}
                  name="amount"
                  type="number"
                  label="Amount of VideoCoin"
                  component={Input}
                  min={0}
                  step={0.00000001}
                />
                <button
                  type="button"
                  className={css.balanceBtn}
                  onClick={addAllBalance}
                >
                  All ({VIDBalance(balance)} VID)
                </button>
              </div>
            </Form>
          )}
        </div>
      </div>

      <div className={css.footer}>
        <Typography type="caption">
          DO NOT withdraw into an exchange address. Only use an ERC20 address
          that supports the VID token.
          <br />
          Withdrawing VideoCoin into an unsupported address will result in
          permanent loss of tokens. If you do not know how to create an ERC20
          address or if you have any other questions, contact support at
          support@videocoin.io.
        </Typography>
        {isFirstStep && (
          <Button type="submit" form="next" disabled={!values.address}>
            Next
          </Button>
        )}
        {!isFirstStep && (
          <Button
            form="withdraw"
            type="submit"
            disabled={!values.amount || !isValid || !isRightInput}
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
