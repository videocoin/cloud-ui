import React from 'react';
import StreamStore from 'stores/stream';
import { Input, Typography } from 'ui-kit';
import { MIN_BALANCE } from 'const';
import ClipboardPostfix from 'components/ClipboardPostfix';
import billingStore from 'stores/billing';

const RTMPInput = () => {
  const { stream } = StreamStore;
  const { hasBalance } = billingStore;

  const { isFailed, isOffline, isPreparing, rtmpUrl } = stream;
  const renderInput = () => {
    if (isFailed) {
      return null;
    }
    if (!hasBalance) {
      return (
        <Typography>
          {`Minimum balance of $${MIN_BALANCE} required to start a stream`}
        </Typography>
      );
    }
    if (isOffline) {
      return (
        <Typography>
          Start the stream to generate an RTMP input and get an output
        </Typography>
      );
    }
    if (isPreparing) {
      return <Typography>Generating an input endpoint</Typography>;
    }

    return (
      <Input
        value={rtmpUrl}
        label="Ingest URL"
        readOnly
        postfix={() => <ClipboardPostfix text={rtmpUrl} />}
      />
    );
  };

  return <>{renderInput()}</>;
};

export default RTMPInput;
