import React, { useEffect } from 'react';
import { eq } from 'lodash/fp';
import cn from 'classnames';
import PipelinesStore from 'stores/pipelines';
import { observer } from 'mobx-react-lite';
import { FieldAction, Input, Typography } from 'ui-kit';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Player from 'components/Livesream/Player';
import css from './index.module.scss';

const Livestream = ({ streamId }: { streamId: string }) => {
  const {
    fetchPipeline,
    pipeline,
    pipelineState,
    clearPipeline,
  } = PipelinesStore;

  useEffect(() => {
    fetchPipeline(streamId);

    return () => {
      clearPipeline();
    };
  }, [clearPipeline, fetchPipeline, streamId]);
  if (eq('loading', pipelineState) || !pipeline) {
    return <Typography>Loading...</Typography>;
  }
  const { name, jobProfile } = pipeline;
  const { ingestInputUrl, transcodeOutputUrl } = jobProfile;

  return (
    <div>
      <div className={css.top}>
        <Player
          src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
          format="MONO_FLAT"
          status="offline"
        />
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
              <div className={cn(css.mark, css.active)} />
              <div className={css.endpointTitle}>Ingest</div>
              <Typography type="smallBodyAlt" theme="primary">
                Receiving
              </Typography>
            </div>
            <Input
              value={ingestInputUrl}
              label="Ingest URL"
              postfix={() => (
                <CopyToClipboard text="">
                  <span className={css.copy}>
                    <FieldAction color="violet" icon="copy" />
                  </span>
                </CopyToClipboard>
              )}
            />
          </div>
          <div>
            <div className={css.endpointStatus}>
              <div className={css.mark} />
              <div className={css.endpointTitle}>Output</div>
              <Typography type="smallBodyAlt" theme="primary">
                Not Streaming
              </Typography>
            </div>
            <Input
              value={transcodeOutputUrl}
              label="Output URL"
              postfix={() => (
                <CopyToClipboard text="">
                  <span className={css.copy}>
                    <FieldAction color="violet" icon="copy" />
                  </span>
                </CopyToClipboard>
              )}
            />
          </div>
        </div>
      </section>
      <section className={css.section}>
        <Typography type="subtitle" className={css.head}>
          Protocol events
        </Typography>
        <div className={css.log} />
      </section>
    </div>
  );
};

export default observer(Livestream);
