import React, { useEffect } from 'react';
import { eq, lowerCase } from 'lodash/fp';
import cn from 'classnames';
import PipelinesStore from 'stores/pipelines';
import { observer } from 'mobx-react-lite';
import { Input, Typography } from 'ui-kit';
import Player from 'components/Player';
import ClipboardPostfix from 'components/ClipboardPostfix';
import { INGEST_STATUS } from 'const';
import StreamStore from 'stores/stream';
import css from './index.module.scss';
import ProtocolTable from './ProtocolTable';

const Livestream = () => {
  const { pipelineState } = PipelinesStore;
  const { stream, fetchProtocol, isStreamLoading } = StreamStore;

  useEffect(() => {
    if (stream) {
      fetchProtocol(stream.streamId);
    }
  }, [fetchProtocol, stream]);

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
  const isIngestActive = eq(inputStatus, 'INPUT_STATUS_ACTIVE');
  const outputStatus = status.split('_').pop();

  return (
    <div>
      <div className={css.top}>
        <div className={css.player}>
          <Player
            src={transcodeOutputUrl}
            format="MONO_FLAT"
            status={INGEST_STATUS[status] || 'None'}
          />
        </div>
        <div className={css.desc}>
          <Typography type="smallTitle">{streamId}</Typography>
          <ul className={css.spec}>
            <li>
              <Typography type="smallBodyAlt">0:00</Typography>&nbsp;
              <Typography type="smallBody">Minutes</Typography>
            </li>
          </ul>
        </div>
      </div>
      <section className={css.section}>
        <Typography type="subtitle" className={css.head}>
          Endpoints
        </Typography>
        <div className={css.endpoints}>
          <div>
            <div className={css.endpointStatus}>
              <div className={cn(css.mark, isIngestActive && css.active)} />
              <div className={css.endpointTitle}>Ingest</div>
              <Typography type="smallBodyAlt" theme="primary">
                {INGEST_STATUS[inputStatus]}
              </Typography>
            </div>
            <Input
              value={ingestInputUrl}
              label="Ingest URL"
              readOnly
              postfix={() => <ClipboardPostfix text={ingestInputUrl} />}
            />
          </div>
          <div>
            <div className={css.endpointStatus}>
              <div className={cn(css.mark, isStreamActive && css.active)} />
              <div className={css.endpointTitle}>Output</div>
              <Typography type="smallBodyAlt" theme="primary">
                {lowerCase(outputStatus)}
              </Typography>
            </div>
            <Input
              value={transcodeOutputUrl}
              label="Output URL"
              readOnly
              postfix={() => <ClipboardPostfix text={transcodeOutputUrl} />}
            />
          </div>
        </div>
      </section>
      <section className={css.section}>
        <Typography type="subtitle" className={css.head}>
          Protocol events
        </Typography>
        <ProtocolTable />
        {/* <div className={css.log}>{map(renderLog, protocol)}</div> */}
      </section>
    </div>
  );
};

export default observer(Livestream);
