import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Navigation, TopBar, Typography } from 'ui-kit';
import Player from 'components/Player';
import { getShared } from 'api/streams';
import css from './index.module.scss';

interface Props {
  accessCode?: string;
}

const Pending: FC<RouteComponentProps & Props> = ({ accessCode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stream, setStream] = useState(null);

  const fetchStream = async () => {
    const res = await getShared(accessCode);

    setStream(res.data);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchStream();
  }, [fetchStream]);

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
                  src={stream.transcodeOutputUrl}
                  format="MONO_FLAT"
                  status={stream.status}
                  inputStatus={stream.inputStatus}
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
