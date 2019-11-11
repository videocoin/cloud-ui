import React, { useEffect, useRef } from 'react';
import { get, propEq, eq } from 'lodash/fp';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Input, Typography } from 'ui-kit';
import Player from 'components/Player';
import ClipboardPostfix from 'components/ClipboardPostfix';
import { INGEST_STATUS, MIN_VID, OUTPUT_STATUS } from 'const';
import StreamStore from 'stores/stream';
import { toast } from 'react-toastify';
import UserStore from 'stores/user';
import css from './index.module.scss';
import ProtocolTable from './ProtocolTable';

const Livestream = () => {
  const prevStatus = useRef();
  const { stream, isStreamLoading } = StreamStore;
  const { hasBalance } = UserStore;
  const currentStatus = get('status')(stream);

  useEffect(() => {
    if (
      propEq('status', 'STREAM_STATUS_FAILED')(stream) &&
      prevStatus.current
    ) {
      toast.success('Stream Failed To Start.');
    }
    prevStatus.current = currentStatus;
    // eslint-disable-next-line
  }, [currentStatus]);

  if (!stream || isStreamLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!stream) return null;

  const { name, status, inputStatus, outputUrl, rtmpUrl } = stream;

  const isStreamActive = eq(status, 'STREAM_STATUS_READY');
  const isStreamFailed = eq(status, 'STREAM_STATUS_FAILED');
  const isStreamPrepared = eq(status, 'STREAM_STATUS_PREPARED');
  const isStreamReady = eq(status, 'STREAM_STATUS_READY');
  const isStreamPending =
    eq(status, 'STREAM_STATUS_PENDING') ||
    eq(status, 'STREAM_STATUS_PROCESSING');
  const isIngestActive = eq(inputStatus, 'INPUT_STATUS_ACTIVE');
  const isStreamOffline = eq(status, 'STREAM_STATUS_NEW');
  const isStreamPreparing = eq(status, 'STREAM_STATUS_PREPARING');
  const isStreamCompleted = eq(status, 'STREAM_STATUS_COMPLETED');

  const renderInput = () => {
    if (isStreamFailed) {
      return null;
    }
    if (!hasBalance) {
      return (
        <Typography>
          {`Minimum balance of ${MIN_VID} VID required to start a stream`}
        </Typography>
      );
    }
    if (isStreamOffline) {
      return (
        <Typography>
          Start the stream to generate an RTMP input and get an output
        </Typography>
      );
    }
    if (isStreamPreparing) {
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

  const renderOutput = () => {
    if (isStreamReady) {
      return (
        <Input
          value={outputUrl}
          label="Output URL"
          readOnly
          postfix={() => <ClipboardPostfix text={outputUrl} />}
        />
      );
    }
    if (isStreamPending) {
      return <Typography>Generating an output URL</Typography>;
    }

    if (isStreamPrepared) {
      return (
        <Typography>
          Start streaming to the RTMP Input to generate the HLS output
        </Typography>
      );
    }

    return null;
  };

  return (
    <div>
      <div className={css.top}>
        <div className={css.player}>
          <Player src={outputUrl} status={status} inputStatus={inputStatus} />
        </div>
        <div className={css.desc}>
          <Typography>Stream Name</Typography>
          <Typography type="smallTitle">{name}</Typography>
        </div>
      </div>
      {!isStreamCompleted && (
        <section className={css.section}>
          <Typography type="subtitle" className={css.head}>
            {isStreamOffline || isStreamPreparing ? 'Get started' : 'Endpoints'}
          </Typography>
          <div className={css.endpoints}>
            <div>
              <div className={css.endpointStatus}>
                <div
                  className={cn(css.mark, {
                    [css.active]: isIngestActive,
                    [css.pending]: isStreamPrepared,
                  })}
                />
                <div className={css.endpointTitle}>Stream Input</div>
                <Typography type="smallBody" theme="sunkissed">
                  {INGEST_STATUS[status]}
                </Typography>
              </div>
              {renderInput()}
            </div>
            {!isStreamOffline && !isStreamPreparing && (
              <div>
                <div className={css.endpointStatus}>
                  <div
                    className={cn(css.mark, {
                      [css.failed]: isStreamFailed,
                      [css.active]: isStreamActive,
                      [css.pending]: isStreamPending,
                    })}
                  />
                  <div className={css.endpointTitle}>Stream Output</div>
                  <Typography type="smallBody" theme="sunkissed">
                    {OUTPUT_STATUS[status]}
                  </Typography>
                </div>
                {renderOutput()}
              </div>
            )}
          </div>
        </section>
      )}
      <section className={css.section}>
        <Typography type="subtitle" className={css.head}>
          Protocol events
        </Typography>
        <ProtocolTable />
      </section>
    </div>
  );
};

export default observer(Livestream);
