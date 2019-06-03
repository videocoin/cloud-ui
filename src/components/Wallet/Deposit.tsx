import React from 'react';
import { Button, Input, Typography } from 'ui-kit';
import QRCode from 'qrcode.react';
import UserStore from 'stores/user';
import ClipboardPostfix from 'components/ClipboardPostfix';
import css from './Deposit.module.scss';

const Deposit = () => {
  const { address } = UserStore;

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
              postfix={() => <ClipboardPostfix text={address} />}
            />
          </div>
        </div>
        <QRCode
          bgColor="#351661"
          fgColor="#dad0e8"
          level="M"
          size={136}
          value={address}
        />
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
