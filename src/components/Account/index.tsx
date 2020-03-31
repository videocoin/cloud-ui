import React, { FormEvent } from 'react';
import { Typography, Button } from 'ui-kit';
import { map } from 'lodash/fp';
import UserStore from 'stores/user';
import ModalStore from 'stores/modal';
import { Link } from '@reach/router';
import { modalType } from 'components/ModalManager';
import { observer } from 'mobx-react-lite';
import TokensStore, { IToken } from 'stores/tokens';
import { AxiosResponse } from 'axios';
import css from './index.module.scss';
import Section from './Section';
import { Switch } from '../../ui-kit/src/Switch';

const Account = () => {
  const {
    user: { name, email },
    isPublisher,
    isWorker,
    setPublisherRole,
    setWorkerRole,
  } = UserStore;
  const { openModal } = ModalStore;
  const { items, addToken, isCreating, isDeleting } = TokensStore;
  const handleResetPassword = () => openModal(modalType.RESET_PASSWORD_AUTH);

  const handlePublisherChange = (e: FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    setPublisherRole(checked);
    localStorage.setItem('isPublisher', `${+checked}`);
  };
  const handleWorkerChange = (e: FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    setWorkerRole(checked);
    localStorage.setItem('isWorker', `${+checked}`);
  };
  const handleRevoke = (token: IToken) => () => {
    openModal(modalType.REVOKE_TOKEN_MODAL, {
      onConfirm: token.remove,
      isDeleting,
    });
  };

  const renderToken = (token: IToken) => (
    <div className={css.token}>
      <Typography type="body">{token.name}</Typography>
      <Button theme="minimal-sunkissed" onClick={handleRevoke(token)}>
        Revoke
      </Button>
    </div>
  );

  const handleAddToken = async (val: string) => {
    const res: AxiosResponse = await addToken(val);

    openModal(modalType.ACCESS_TOKEN_MODAL, { token: res.data.token });
  };

  const createToken = () => {
    openModal(modalType.NEW_TOKEN_MODAL, {
      onConfirm: handleAddToken,
      isCreating,
    });
  };

  return (
    <div className={css.wrap}>
      <Section title="General">
        <div className={css.field}>
          <Typography type="smallBody">Full Name</Typography>
          <Typography type="title">{name}</Typography>
        </div>
        <div className={css.field}>
          <Typography type="smallBodyThin">Email</Typography>
          <Typography type="body">{email}</Typography>
        </div>
      </Section>
      <Section title="Security">
        <div className={css.field}>
          <Typography type="smallBodyThin">Password</Typography>
          <Typography type="body">**************</Typography>
          <Button theme="minimal-sunkissed" onClick={handleResetPassword}>
            Reset
          </Button>
        </div>
      </Section>
      <Section title="Features">
        <div className={css.field}>
          <Typography type="smallBodyThin">Publisher</Typography>
          <Switch checked={isPublisher} onChange={handlePublisherChange}>
            <Typography type="tiny">
              Enables features for publishers to transcode livestreams and
              video.
            </Typography>
          </Switch>
        </div>
        <div className={css.field}>
          <Typography type="smallBodyThin">Worker</Typography>
          <Switch checked={isWorker} onChange={handleWorkerChange}>
            <Typography type="tiny">
              Enables features workers to provide compute power to the network.
            </Typography>
          </Switch>
        </div>
      </Section>
      <Section
        title="API"
        right={() => (
          <div className={css.newToken}>
            <Button theme="violet-sky" size="sm" onClick={createToken}>
              {items.length ? 'New token' : 'Create Token'}
            </Button>
          </div>
        )}
      >
        <div className={css.field}>
          <Typography type="smallBody">API Tokens</Typography>
          <div className={css.tokens}>
            {!items.length && (
              <Typography type="smallBody">None Yet</Typography>
            )}
            {map(renderToken)(items as [])}
          </div>
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

export default observer(Account);
