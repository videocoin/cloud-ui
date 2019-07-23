import React from 'react';
import { eq, lowerCase, map, uniqueId } from 'lodash/fp';
import cn from 'classnames';
import PipelinesStore from 'stores/pipelines';
import { observer } from 'mobx-react-lite';
import { Input, Typography } from 'ui-kit';
import Player from 'components/Player';
import ClipboardPostfix from 'components/ClipboardPostfix';
import { INGEST_STATUS } from 'const';
import css from './index.module.scss';

const Livestream = () => {
  const { stream, pipelineState, isStreamLoading } = PipelinesStore;

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

  const isStreamActive =
    eq(status, 'JOB_STATUS_READY') || eq(status, 'INPUT_STATUS_ACTIVE');

  const isIngestActive = eq(status, 'INPUT_STATUS_ACTIVE');

  //
  // const renderLog = (message: string) => (
  //   <code key={uniqueId('log_')}>{message}</code>
  // );

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
            <li>
              <Typography type="smallBodyAlt">3:45</Typography>&nbsp;
              <Typography type="smallBody">VID/MIN</Typography>
            </li>
            <li>
              <Typography type="smallBodyAlt">0</Typography>&nbsp;
              <Typography type="smallBody">Total VID Spent</Typography>
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
                {lowerCase(status)}
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
        {/* <div className={css.log}>{map(renderLog, protocol)}</div> */}
      </section>
    </div>
  );
};

export default observer(Livestream);
