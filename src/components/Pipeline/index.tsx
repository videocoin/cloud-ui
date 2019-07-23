import React from 'react';
import { Button, Icon, Typography } from 'ui-kit/src';
import { observer } from 'mobx-react-lite';
import { readableProfile } from 'const';
import PipelinesStore from 'stores/pipelines';
import StreamsTable from 'components/Pipeline/StreamsTable';
import { eq } from 'lodash/fp';
import css from './index.module.scss';

const Pipeline = () => {
  const { pipeline, pipelineState } = PipelinesStore;

  if (eq('loading', pipelineState) || !pipeline) {
    return <Typography>Loading...</Typography>;
  }

  if (!pipeline) return null;

  const { profileId } = pipeline;

  return (
    <div>
      <section className={css.section}>
        <Typography type="subtitle" className={css.head}>
          Pipeline details
        </Typography>
        <div className={css.details}>
          <div className={css.detail}>
            <div className={css.detailHead}>
              <Icon name="awaitingInput" width={32} height={32} />
              <div>
                <Typography theme="white" type="subtitleAlt">
                  Input
                </Typography>
                <Typography theme="white" type="smallBody">
                  RTMP
                </Typography>
              </div>
            </div>
          </div>
          <div className={css.detail}>
            <div className={css.detailHead}>
              <Icon name="streaming" width={32} height={32} />
              <div>
                <Typography theme="white" type="subtitleAlt">
                  Output
                </Typography>
                <Typography theme="white" type="smallBody">
                  HLS
                </Typography>
              </div>
            </div>
            <div className={css.detailBody}>
              <Typography type="caption">
                {readableProfile[profileId]}
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <section className={css.section}>
        <div className={css.streamsHead}>
          <Typography type="subtitle" className={css.head}>
            Streams using pipeline
          </Typography>
          <Button size="sm" onClick={pipeline.createStream}>
            New stream
          </Button>
        </div>
        <div className={css.streamsTable}>
          <StreamsTable />
        </div>
      </section>
    </div>
  );
};

export default observer(Pipeline);
