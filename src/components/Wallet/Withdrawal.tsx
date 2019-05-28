import React, { useState } from 'react';
import { Button, Typography } from 'ui-kit';
import { Field, Form, withFormik } from 'formik';
import { eq } from 'lodash/fp';
import Input from 'components/Input';
import ModalStore from 'stores/modal';
import { modalType } from 'components/ModalManager';
import css from './Deposit.module.scss';

interface WithdrawalForm {
  address: string;
  amount: number;
}

const Withdrawal = () => {
  const [step, setStep] = useState(1);
  const isFirstStep = eq(1, step);
  const nextStepHandle = () => {
    setStep(2);
  };

  return (
    <div className={css.root}>
      <div className={css.body}>
        <Form id="withdraw" className={css.form}>
          <Typography type="bodyAlt" theme="white">
            {isFirstStep
              ? ' Enter a ERC20 VideoCoin address to withdraw VideoCoin to'
              : ' Enter the amount of VideoCoin to withdraw'}
          </Typography>
          {isFirstStep ? (
            <div className={css.address}>
              <Field
                name="address"
                label="VideoCoin Address"
                component={Input}
              />
            </div>
          ) : (
            <div className={css.address}>
              <div>
                <Field
                  name="amount"
                  type="number"
                  label="Amount of VideoCoin"
                  component={Input}
                />
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
        {isFirstStep && <Button onClick={nextStepHandle}>Next</Button>}
        {!isFirstStep && (
          <Button type="submit" form="withdraw">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default withFormik<{}, WithdrawalForm>({
  mapPropsToValues: () => ({
    address: '',
    amount: 0,
  }),
  handleSubmit: values => {
    const { openModal } = ModalStore;

    openModal(modalType.WITHDRAW_CONFIRM, { ...values });
  },
})(Withdrawal);
