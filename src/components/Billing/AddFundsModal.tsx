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
import { ActionBar, Button, Icon, Typography } from 'ui-kit';
import { loadStripe } from '@stripe/stripe-js';
import modalStore from 'stores/modal';
import { IMaskInput } from 'react-imask';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { initPayment } from 'api/billing';
import { toast } from 'react-toastify';
import billingStore from 'stores/billing';
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
const ErrorMessage = ({ children }: { children: ReactNode }) => (
  <div className={css.errorMessage}>
    <Icon name="incomplete" width={15} height={15} />
    {children}
  </div>
);
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amountInput = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState('20');
  const [customAmount, setCustomAmount] = useState('');
  const [isValid, setValid] = useState(false);
  const [error, setError] = useState(null);
  const { closeModal } = modalStore;
  const { fetchBillingProfile } = billingStore;
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
  const handleChangeCustomAmount = (value: string, el: any) => {
    setCustomAmount(+el.unmaskedValue > 100 ? '100' : value);
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
            <IMaskInput
              inputRef={(el: HTMLInputElement) => (amountInput.current = el)}
              className={css.amountInput}
              value={customAmount}
              mask="$00[0]"
              autofix
              overwrite
              max={100}
              placeholder="Other"
              onAccept={handleChangeCustomAmount}
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

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await initPayment({
        amount: amount === 'other' ? +customAmount : +amount,
      });
      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        `${res.data.clientSecret}`,
        {
          payment_method: {
            card,
          },
        },
      );

      if (error) {
        toast.error(error.message);
      }
      if (paymentIntent.status === 'succeeded') {
        setTimeout(async () => {
          await fetchBillingProfile();
          closeModal();
        }, 3000);
      } else {
        toast.error('Something went wrong');
      }
    } catch (e) {
      setLoading(false);
    }
  };
  const cardChange = (e: any) => {
    setError(e.error);
    setValid(e.complete);
  };
  return (
    <>
      <div className={css.amountList}>{map(renderAmount)(amounts)}</div>
      <div className={css.stripeCard}>
        <CardElement options={CARD_OPTIONS} onChange={cardChange} />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </div>
      <div className="modalActions">
        <ActionBar>
          <Button theme="minimal" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={onSubmit} disabled={!isValid} loading={isLoading}>
            Add {amount === 'other' ? customAmount || 0 : `$${amount}`}
          </Button>
        </ActionBar>
      </div>
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
