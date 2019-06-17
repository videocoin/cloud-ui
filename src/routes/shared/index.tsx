import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Navigation, TopBar, Typography } from 'ui-kit';
import Player from 'components/Player';
import { getShared } from 'api/pipelines';
import { getOr } from 'lodash/fp';
import { INGEST_STATUS } from 'const';
import { JobProfile } from 'stores/types';
import css from './index.module.scss';

interface Props {
  accessCode?: string;
}

const Pending: FC<RouteComponentProps & Props> = ({ accessCode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pipeline, setPipeline] = useState(null);

  const fetchPipeline = async () => {
    try {
      const res = await getShared(accessCode);

      setPipeline(res.data);
      setIsLoaded(true);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchPipeline();
  }, [fetchPipeline]);

  const jobProfile = getOr({}, 'jobProfile')(pipeline);
  const { transcodeOutputUrl, ingestStatus } = jobProfile as JobProfile;

  return (
    <div className={css.shared}>
      <div className={css.nav}>
        <Navigation>{null}</Navigation>
      </div>
      <div className={css.body}>
        <div>
          <div>
            <div className="topBar">
              <TopBar>
                <div>
                  <Typography type="caption">Powered by</Typography>
                  <Typography type="smallTitle">
                    The VideoCoin Network
                  </Typography>
                </div>
              </TopBar>
            </div>
            <div className="content">
              {isLoaded ? (
                <Player
                  src={transcodeOutputUrl}
                  format="MONO_FLAT"
                  status={INGEST_STATUS[ingestStatus]}
                />
              ) : (
                <Typography>Loading ...</Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;
