import React from 'react';
import { Typography, Button } from 'ui-kit';
import UserStore from 'stores/user';
import ModalStore from 'stores/modal';
import { Link } from '@reach/router';
import { modalType } from 'components/ModalManager';
import css from './index.module.scss';
import Section from './Section';

const Account = () => {
  const {
    user: { name, email },
  } = UserStore;
  const { openModal } = ModalStore;
  const handleResetPassword = () => openModal(modalType.RESET_PASSWORD_AUTH);

  return (
    <div className={css.wrap}>
      <Section title="General">
        <div className={css.field}>
          <Typography type="smallBody">Full Name</Typography>
          <Typography type="title">{name}</Typography>
        </div>
        <div className={css.field}>
          <Typography type="smallBody">Email</Typography>
          <Typography type="bodyAlt">{email}</Typography>
        </div>
      </Section>
      <Section title="Security">
        <div className={css.field}>
          <Typography type="smallBody">Password</Typography>
          <Typography type="bodyAlt">**************</Typography>
          <Button theme="minimal-sunkissed" onClick={handleResetPassword}>
            Reset
          </Button>
        </div>
      </Section>
      <Section title="Legal">
        <div className={css.field}>
          <Typography type="smallBody">Documents</Typography>
          <div className={css.terms}>
            <Link className="link link_violet" to="terms">
              Terms and conditions
            </Link>
            <br />
            <Link className="link link_violet" to="privacy">
              Privacy policy
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Account;
