import React, { useEffect, useRef, useState } from 'react';
import { get, eq } from 'lodash/fp';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Input, Spinner, Typography } from 'ui-kit';
import Player from 'components/Player';
import ClipboardPostfix from 'components/ClipboardPostfix';
import { OUTPUT_STATUS, STREAM_INPUT_TYPE, INGEST_STATUS } from 'const';
import StreamStore from 'stores/stream';
import { toast } from 'react-toastify';
import css from './index.module.scss';
import ProtocolTable from './ProtocolTable';
import WebRTCInput from './WebRTCInput';
import RTMPInput from './RTMPInput';
import FileInput from './FileInput';
import PaymentsTable from './PaymentsTable';

const Stream = () => {
  const prevStatus = useRef();
  const videoNode = useRef<HTMLVideoElement>();
  const { stream, isStreamLoading } = StreamStore;
  const currentStatus = get('status')(stream);
  const isStreamFailed = stream.isFailed;
  const [tab, setTab] = useState('payments');

  useEffect(() => {
    if (isStreamFailed && prevStatus.current) {
      toast.success('Stream Failed To Start.');
    }
    prevStatus.current = currentStatus;
  }, [currentStatus, isStreamFailed]);

  if (!stream || isStreamLoading) {
    return <Spinner />;
  }

  if (!stream) return null;

  const switchTab = (tab: string) => () => setTab(tab);

  const {
    name,
    isOffline,
    isReady,
    isPending,
    isProcessing,
    isPreparing,
    isPrepared,
    isCompleted,
    status,
    outputUrl,
  } = stream;

  const isWaitingOutput = isPending || isProcessing;
  const hideOutput = isCompleted && !outputUrl;
  const renderOutput = () => {
    if (isReady || isCompleted) {
      return (
        <Input
          value={outputUrl}
          label="Output URL"
          readOnly
          postfix={() => <ClipboardPostfix text={outputUrl} />}
        />
      );
    }
    if (isWaitingOutput) {
      return <Typography>Generating an output URL</Typography>;
    }

    if (isPrepared) {
      switch (stream.inputType) {
        case STREAM_INPUT_TYPE.RTMP:
          return (
            <Typography>
              Start streaming to the RTMP Input to generate the HLS output
            </Typography>
          );
        case STREAM_INPUT_TYPE.FILE:
          return (
            <Typography>Upload the file to generate the HLS output</Typography>
          );
        default:
          return null;
      }
    }

    return null;
  };

  const streamInput = () => {
    switch (stream.inputType) {
      case STREAM_INPUT_TYPE.RTMP:
        return <RTMPInput />;
      case STREAM_INPUT_TYPE.WEBRTC:
        return <WebRTCInput videoNode={videoNode} />;
      case STREAM_INPUT_TYPE.FILE:
        return <FileInput />;
      default:
        return null;
    }
  };
  const isPaymentsTab = eq('payments', tab);
  const isInputReady = isPending || isProcessing || isReady;
  return (
    <div>
      <div className={css.top}>
        <div className={css.player}>
          <Player ref={videoNode} />
        </div>
        <div className={css.desc}>
          <Typography>Stream Name</Typography>
          <Typography type="smallTitle">{name}</Typography>
        </div>
      </div>

      <section className={css.section}>
        <Typography type="subtitle" className={css.head}>
          {isOffline || isPreparing ? 'Get started' : 'Endpoints'}
        </Typography>

        <div className={css.endpoints}>
          {!isCompleted && (
            <div>
              <div className={css.endpointStatus}>
                <div
                  className={cn(css.mark, {
                    [css.active]: isInputReady,
                    [css.pending]: isPreparing || isPrepared,
                  })}
                />
                <div className={css.endpointTitle}>Stream Input</div>
                <Typography type="smallBody" theme="sunkissed">
                  {INGEST_STATUS[status]}
                </Typography>
              </div>
              {streamInput()}
            </div>
          )}

          {!hideOutput && (
            <div>
              <div className={css.endpointStatus}>
                <div
                  className={cn(css.mark, {
                    [css.failed]: isStreamFailed,
                    [css.active]: isReady,
                    [css.pending]: isWaitingOutput,
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

      <section className={css.section}>
        <div className={css.nav}>
          <button
            onClick={switchTab('payments')}
            type="button"
            className={isPaymentsTab ? css.active : ''}
          >
            <Typography type="subtitle">Payments</Typography>
          </button>
          <button
            onClick={switchTab('transactions')}
            type="button"
            className={!isPaymentsTab ? css.active : ''}
          >
            <Typography type="subtitle">Protocol Transactions</Typography>
          </button>
        </div>
        {isPaymentsTab ? <PaymentsTable /> : <ProtocolTable />}
      </section>
    </div>
  );
};

export default observer(Stream);
