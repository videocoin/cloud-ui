/* eslint-disable @typescript-eslint/camelcase */

import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { eq, map } from 'lodash/fp';
import Modal from 'components/Modal';
import { Button, Typography } from 'ui-kit';
import { Formik, Field, Form } from 'formik';
import { loadStripe } from '@stripe/stripe-js';
import modalStore from 'stores/modal';
import userStore from 'stores/user';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { initPayment } from 'api/billing';
import { toast } from 'react-toastify';
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
  const amountInput = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState('20');
  const [customAmount, setCustomAmount] = useState('');
  const { closeModal } = modalStore;
  const { fetchBillingProfile } = userStore;
  const isChecked = eq(amount);

  useEffect(() => {
    if (amount === 'other') {
      amountInput.current.focus();
    }
  }, [amount]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomAmount('');
    setAmount(e.currentTarget.value);
  };
  const handleChangeCustomAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setCustomAmount(+value > 100 ? '100' : value);
  };
  const renderAmount = (value: string): ReactNode => {
    const isCustom = value === 'other';

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
          {isCustom && amount === 'other' ? (
            <input
              ref={amountInput}
              className={css.amountInput}
              value={customAmount}
              type="number"
              placeholder="Other"
              min={0}
              max={100}
              onChange={handleChangeCustomAmount}
            />
          ) : (
            <Typography type="subtitle" theme="white">
              {value === 'other' ? value : `$${value}`}
            </Typography>
          )}
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
    try {
      const res = await initPayment({
        amount: amount === 'other' ? +customAmount : +amount,
      });
      const { cardComplete, ...billingDetails } = values;
      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        `${res.data.clientSecret}`,
        {
          payment_method: {
            card,
            billing_details: billingDetails,
          },
        },
      );

      if (error) {
        toast.error(error.message);
      }
      if (paymentIntent.status === 'succeeded') {
        closeModal();
        setTimeout(() => {
          fetchBillingProfile();
        }, 3000);
      } else {
        toast.error('Something went wrong');
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
                Add ${amount === 'other' ? customAmount || 0 : amount}
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
