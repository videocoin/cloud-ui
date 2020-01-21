import React, { useEffect, useRef } from 'react';
import { get } from 'lodash/fp';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Input, Typography } from 'ui-kit';
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

const Livestream = () => {
  const prevStatus = useRef();
  const videoNode = useRef<HTMLVideoElement>();
  const { stream, isStreamLoading } = StreamStore;
  const currentStatus = get('status')(stream);
  const isStreamFailed = stream.isFailed;

  useEffect(() => {
    if (isStreamFailed && prevStatus.current) {
      toast.success('Stream Failed To Start.');
    }
    prevStatus.current = currentStatus;
  }, [currentStatus, isStreamFailed]);

  if (!stream || isStreamLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!stream) return null;

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
    isWebRTC,
    isInputActive,
  } = stream;

  const isWaitingOutput = isPending || isProcessing;

  const renderOutput = () => {
    if (isReady) {
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

  return (
    <div>
      <div className={css.top}>
        <div className={css.player}>
          {isWebRTC && !isCompleted ? (
            <video muted ref={videoNode} />
          ) : (
            <Player />
          )}
        </div>
        <div className={css.desc}>
          <Typography>Stream Name</Typography>
          <Typography type="smallTitle">{name}</Typography>
        </div>
      </div>
      {!isCompleted && (
        <section className={css.section}>
          <Typography type="subtitle" className={css.head}>
            {isOffline || isPreparing ? 'Get started' : 'Endpoints'}
          </Typography>

          <div className={css.endpoints}>
            <div>
              <div className={css.endpointStatus}>
                <div
                  className={cn(css.mark, {
                    [css.active]: isInputActive,
                    [css.pending]: isPrepared,
                  })}
                />
                <div className={css.endpointTitle}>Stream Input</div>
                <Typography type="smallBody" theme="sunkissed">
                  {INGEST_STATUS[status]}
                </Typography>
              </div>
              {streamInput()}
            </div>

            {!isOffline && !isPreparing && (
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
