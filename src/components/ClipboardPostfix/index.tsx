import { CopyToClipboard } from 'react-copy-to-clipboard';
import css from 'components/Wallet/Deposit.module.scss';
import { FieldAction } from 'ui-kit/src';
import React from 'react';
import { toast } from 'react-toastify';

const ClipboardPostfix = ({ text }: { text: string }) => {
  const handleCopy = () => {
    toast.success('Address has been copied to your clipboard');
  };

  return (
    <CopyToClipboard className={css.copy} text={text} onCopy={handleCopy}>
      <span>
        <FieldAction color="violet" icon="copy" />
      </span>
    </CopyToClipboard>
  );
};

export default ClipboardPostfix;
