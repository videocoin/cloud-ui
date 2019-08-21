import React, { useEffect } from 'react';
import { propEq, eq } from 'lodash/fp';
import cn from 'classnames';
import PipelinesStore from 'stores/pipelines';
import { observer } from 'mobx-react-lite';
import { Input, Typography } from 'ui-kit';
import Player from 'components/Player';
import ClipboardPostfix from 'components/ClipboardPostfix';
import { INGEST_STATUS, OUTPUT_STATUS } from 'const';
import StreamStore from 'stores/stream';
import { toast } from 'react-toastify';
import css from './index.module.scss';
import ProtocolTable from './ProtocolTable';

const Livestream = () => {
  const { pipelineState } = PipelinesStore;
  const { stream, isStreamLoading } = StreamStore;

  const checkStatus = stream && stream.status;

  useEffect(() => {
    if (propEq('status', 'JOB_STATUS_FAILED')(stream)) {
      toast.success('Stream Failed To Start.');
    }
  }, [checkStatus, stream]);

  if (eq('loading', pipelineState) || !stream || isStreamLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!stream) return null;

  const {
    streamId,
    status,
    inputStatus,
    transcodeOutputUrl,
    ingestInputUrl,
  } = stream;

  const isStreamActive = eq(status, 'JOB_STATUS_READY');
  const isStreamFailed = eq(status, 'JOB_STATUS_FAILED');
  const isStreamPrepared = eq(status, 'JOB_STATUS_PREPARED');
  const isStreamReady = eq(status, 'JOB_STATUS_READY');
  const isStreamPending =
    eq(status, 'JOB_STATUS_PENDING') || eq(status, 'JOB_STATUS_PROCESSING');
  const isIngestActive = eq(inputStatus, 'INPUT_STATUS_ACTIVE');
  const isStreamOffline = eq(status, 'JOB_STATUS_NEW');
  const isStreamPreparing = eq(status, 'JOB_STATUS_PREPARING');
  const isStreamCompleted = eq(status, 'JOB_STATUS_COMPLETED');

  const renderInput = () => {
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
        value={ingestInputUrl}
        label="Ingest URL"
        readOnly
        postfix={() => <ClipboardPostfix text={ingestInputUrl} />}
      />
    );
  };

  const renderOutput = () => {
    if (isStreamReady) {
      return (
        <Input
          value={transcodeOutputUrl}
          label="Output URL"
          readOnly
          postfix={() => <ClipboardPostfix text={transcodeOutputUrl} />}
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
          <Player
            src={transcodeOutputUrl}
            status={status}
            inputStatus={inputStatus}
          />
        </div>
        <div className={css.desc}>
          <Typography>Stream ID</Typography>
          <Typography type="smallTitle">{streamId}</Typography>
          <ul className={css.spec}>
            <li>
              <Typography type="smallBodyAlt">0:00</Typography>&nbsp;
              <Typography type="smallBody">Minutes</Typography>
            </li>
          </ul>
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
                <Typography type="smallBodyAlt" theme="primary">
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
                  <Typography type="smallBodyAlt" theme="primary">
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
