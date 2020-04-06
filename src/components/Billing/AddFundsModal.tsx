/* eslint-disable @typescript-eslint/camelcase */

import React, { ChangeEvent, ReactNode, useState } from 'react';
import { eq, map } from 'lodash/fp';
import Modal from 'components/Modal';
import { Button, Typography } from 'ui-kit';
import { Formik, Field, Form } from 'formik';
import { loadStripe } from '@stripe/stripe-js';
import modalStore from 'stores/modal';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { initPayment } from 'api/billing';
import validationSchema from './validation';
import css from './styles.module.scss';

const amounts = ['5', '20', '50', 'other'];
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CARD_OPTIONS = {
  iconStyle: 'solid' as 'solid',
  style: {
    base: {
      iconColor: '#fff',
      color: '#fff',
      fontWeight: '500',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fff',
      },
      '::placeholder': {
        color: 'rgba(255,255,255,.48)',
      },
    },
    invalid: {
      iconColor: '#fff',
      color: '#ffc7ee',
    },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState('20');
  const { closeModal } = modalStore;
  const isChecked = eq(amount);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAmount(e.currentTarget.value);
  const renderAmount = (value: string): ReactNode => {
    return (
      <label key={value}>
        <input
          type="radio"
          name="amount"
          checked={isChecked(value)}
          value={value}
          onChange={handleChange}
        />
        <div className={css.amountItem}>
          <Typography type="subtitle" theme="white">
            {value === 'other' ? value : `$${value}`}
          </Typography>
        </div>
      </label>
    );
  };
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    cardComplete: false,
  };

  const onSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const res = await initPayment({ amount: +amount });
    const { cardComplete, ...billingDetails } = values;
    const card = elements.getElement(CardElement);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(
        `${res.data.clientSecret}`,
        {
          payment_method: {
            card,
            billing_details: billingDetails,
          },
        },
      );

      if (paymentIntent.status === 'succeeded') {
        closeModal();
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={css.amountList}>{map(renderAmount)(amounts)}</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, setFieldValue }) => {
          const cardChange = (e: any) => {
            setFieldValue('cardComplete', e.complete);
          };

          return (
            <Form noValidate>
              <div className={css.form}>
                <label className={css.formRow}>
                  <Typography
                    type="smallBody"
                    theme="white"
                    className={css.formLabel}
                  >
                    Name
                  </Typography>
                  <Field name="name" placeholder="Jane Doe" />
                </label>
                <label className={css.formRow}>
                  <Typography
                    type="smallBody"
                    theme="white"
                    className={css.formLabel}
                  >
                    Email
                  </Typography>
                  <Field name="email" placeholder="janedoe@gmail.com" />
                </label>
                <label className={css.formRow}>
                  <Typography
                    type="smallBody"
                    theme="white"
                    className={css.formLabel}
                  >
                    Phone
                  </Typography>
                  <Field name="phone" placeholder="(941) 555-0123" />
                </label>
              </div>
              <div className={css.stripeCard}>
                <CardElement options={CARD_OPTIONS} onChange={cardChange} />
              </div>

              <Button type="submit" disabled={!isValid} loading={isLoading}>
                Add ${amount}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

const AddFundsModal = () => {
  return (
    <Modal header={() => <Typography type="smallTitle">Add Funds</Typography>}>
      <div className="modalInner">
        <div className={css.selectTitle}>
          <Typography type="subtitle">Select amount</Typography>
          <Typography type="caption">(temporary limit of $100)</Typography>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </Modal>
  );
};

export default AddFundsModal;
