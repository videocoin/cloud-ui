import React, { FormEvent } from 'react';
import { Button, Switch, Typography } from 'ui-kit';
import { map } from 'lodash/fp';
import UserStore from 'stores/user';
import ModalStore from 'stores/modal';
import { modalType } from 'components/ModalManager';
import { observer } from 'mobx-react-lite';
import TokensStore, { IToken } from 'stores/tokens';
import { AxiosResponse } from 'axios';
import css from './index.module.scss';
import Section from './Section';
import { UI_ROLE } from 'const';

const Account = () => {
  const {
    user: { name, email },
    isPublisher,
    isWorker,
    isBoth,
    updateRole,
  } = UserStore;
  const { openModal } = ModalStore;
  const { items, addToken, isCreating, isDeleting } = TokensStore;
  const handleResetPassword = () => openModal(modalType.RESET_PASSWORD_AUTH);
  const handlePublisherChange = (e: FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    if (checked) {
      openModal(modalType.PUBLISHER_AGREEMENTS, {
        onConfirm: () => successPublisherChange(true),
      });
    } else {
      successPublisherChange(false);
    }
  };
  const handleWorkerChange = (e: FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    if (checked) {
      openModal(modalType.WORKER_AGREEMENTS, {
        onConfirm: () => successWorkerChange(true),
      });
    } else {
      successWorkerChange(false);
    }
  };
  const successPublisherChange = (checked: boolean) => {
    if (!checked) {
      if (isPublisher) {
        openModal(modalType.WORKER_AGREEMENTS, {
          onConfirm: () => {
            updateRole(UI_ROLE.MINER);
          },
        });
        return;
      }
      updateRole(UI_ROLE.MINER);
      return;
    }

    updateRole(isWorker ? UI_ROLE.BOTH : UI_ROLE.PUBLISHER);
  };
  const successWorkerChange = (checked: boolean) => {
    if (!checked) {
      if (isWorker) {
        openModal(modalType.PUBLISHER_AGREEMENTS, {
          onConfirm: () => {
            updateRole(UI_ROLE.PUBLISHER);
          },
        });
        return;
      }
      updateRole(UI_ROLE.PUBLISHER);
      return;
    }
    updateRole(isPublisher ? UI_ROLE.BOTH : UI_ROLE.MINER);
  };
  const handleRevoke = (token: IToken) => () => {
    openModal(modalType.REVOKE_TOKEN_MODAL, {
      onConfirm: token.remove,
      isDeleting,
    });
  };

  const renderToken = (token: IToken) => (
    <div className={css.token} key={token.name}>
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
          <Switch
            checked={isPublisher || isBoth}
            onChange={handlePublisherChange}
          >
            <Typography type="tiny">
              Enables features for publishers to transcode livestreams and
              video.
            </Typography>
          </Switch>
        </div>
        <div className={css.field}>
          <Typography type="smallBodyThin">Worker</Typography>
          <Switch checked={isWorker || isBoth} onChange={handleWorkerChange}>
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
            <a
              href="https://storage.googleapis.com/videocoin-network-policies/VideoCoinNetworkTermsofService.html"
              target="_blank"
              rel="noopener noreferrer"
              className="link link_violet"
            >
              Terms of Use
            </a>
            <br />
            <a
              href="https://storage.googleapis.com/videocoin-network-policies/VideoCoinNetworkPrivacyPolicy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="link link_violet"
            >
              Privacy policy
            </a>
            <br />
            <a
              href="https://storage.googleapis.com/videocoin-network-policies/VideoCoinNetworkWebsiteTermsofUse.html"
              target="_blank"
              rel="noopener noreferrer"
              className="link link_violet"
            >
              Website Terms of use
            </a>
            <br />
            <a
              href="https://storage.googleapis.com/videocoin-network-policies/VideoCoinNetworkWorkerTermsofService.html"
              target="_blank"
              rel="noopener noreferrer"
              className="link link_violet"
            >
              Worker Terms of Service
            </a>
            <br />
            <a
              href="https://storage.googleapis.com/videocoin-network-policies/VideoCoinNetworkDelegatorTermsofService.html"
              target="_blank"
              rel="noopener noreferrer"
              className="link link_violet"
            >
              Delegator Terms of Service
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default observer(Account);
