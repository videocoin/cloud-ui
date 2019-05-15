import React from 'react';
import { Button, FieldAction, Input, Typography } from 'ui-kit/src';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import UserStore from 'stores/user';
import { toast } from 'react-toastify';
import css from './Deposit.module.scss';

const Deposit = () => {
  const { account } = UserStore;
  const { address } = account;
  const handleCopy = () => {
    toast.success('Copied');
  };
  return (
    <div className={css.root}>
      <div className={css.body}>
        <div className={css.left}>
          <Typography type="bodyAlt" theme="white">
            Send VideoCoin to this address to fund your account
          </Typography>
          <div className={css.address}>
            <Input
              value={address}
              readOnly
              label="VideoCoin Address"
              postfix={() => (
                <CopyToClipboard text={address} onCopy={handleCopy}>
                  <span className={css.copy}>
                    <FieldAction color="violet" icon="copy" />
                  </span>
                </CopyToClipboard>
              )}
            />
          </div>
        </div>
        <div className={css.qr}>
          <img src="http://placehold.it/136x136" alt="" />
        </div>
      </div>
      <div className={css.footer}>
        <Typography type="caption">
          Only send VideoCoin (VID) to this address.
          <br />
          Sending any cryptocurrency other than VideoCoin will be lost forever.
        </Typography>
        <Button>Done</Button>
      </div>
    </div>
  );
};
export default Deposit;
