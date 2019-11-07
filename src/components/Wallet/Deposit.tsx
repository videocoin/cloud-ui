import React, { useEffect } from 'react';
import css from 'components/Wallet/Deposit.module.scss';
import { Button, Input, Typography } from 'ui-kit';
import QRCode from 'qrcode.react';
import UserStore from 'stores/user';
import ClipboardPostfix from 'components/ClipboardPostfix';
import ModalStore from 'stores/modal';
import { modalType } from 'components/ModalManager';

const Deposit = () => {
  const { address } = UserStore;
  const { openModal } = ModalStore;

  useEffect(() => {
    openModal(modalType.DEPOSIT_MODAL);
  }, [openModal]);

  return (
    <div className={css.root}>
      <div className={css.body}>
        <div className={css.left}>
          <Typography type="body" theme="white">
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
          <Typography>
            Minimum 20 VID is needed to start a stream and you can hold up to 50
            VID in your account. VideoCoin Fuji Release limits the number of VID
            you can deposit to keep network load under control.&nbsp;
            <a
              rel="noopener noreferrer"
              href="https://medium.com/videocoin/introducing-the-videocoin-network-dcab0bf34f22"
              target="_blank"
            >
              <b>Learn More</b>
            </a>
          </Typography>
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
