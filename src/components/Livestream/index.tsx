import React from 'react';
import { eq, map, uniqueId } from 'lodash/fp';
import cn from 'classnames';
import PipelinesStore from 'stores/pipelines';
import { observer } from 'mobx-react-lite';
import { Input, Typography } from 'ui-kit';
import Player from 'components/Player';
import ClipboardPostfix from 'components/ClipboardPostfix';
import { INGEST_STATUS } from 'const';
import css from './index.module.scss';

const Livestream = () => {
  const { pipeline, pipelineState, isLoading } = PipelinesStore;

  if (eq('loading', pipelineState) || !pipeline || isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const { name, jobProfile, protocol } = pipeline;

  if (!jobProfile) {
    return null;
  }
  const {
    ingestInputUrl,
    transcodeOutputUrl,
    ingestStatus,
    status: jobStatus,
  } = jobProfile;

  const isIngestActive = eq(INGEST_STATUS[ingestStatus], 'Receiving');
  const isJobActive = eq(jobStatus, 'ready');

  const renderLog = (message: string) => (
    <code key={uniqueId('log_')}>{message}</code>
  );

  return (
    <div>
      <div className={css.top}>
        <div className={css.player}>
          <Player
            src={transcodeOutputUrl}
            format="MONO_FLAT"
            status={INGEST_STATUS[ingestStatus]}
          />
        </div>
        <div className={css.desc}>
          <Typography type="title">{name}</Typography>
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
                {INGEST_STATUS[ingestStatus]}
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
              <div className={cn(css.mark, isJobActive && css.active)} />
              <div className={css.endpointTitle}>Output</div>
              <Typography type="smallBodyAlt" theme="primary">
                {jobStatus}
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
        <div className={css.log}>{map(renderLog, protocol)}</div>
      </section>
    </div>
  );
};

export default observer(Livestream);
