import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, TopBar, Typography, WarnTooltip } from 'ui-kit';
import { toast } from 'react-toastify';
import { getOr } from 'lodash/fp';
import BackLink from 'components/BackLink';
import Stream from 'components/Stream';
import { observer } from 'mobx-react-lite';
import StreamStore from 'stores/stream';
import UserStore from 'stores/user';
import { MIN_VID, STREAM_STATUS, defaultServerError } from 'const';
import { history } from 'index';
import css from './index.module.scss';

const streamRequestTimeout = 5000;
const StreamControl = observer(() => {
  const [isLoading, setLoading] = useState(false);
  const { stream } = StreamStore;
  const { hasBalance } = UserStore;

  if (!stream) return null;
  const { status, runStream, completeStream } = stream;

  const handleStart = async () => {
    setLoading(true);
    try {
      await runStream();
    } catch (err) {
      toast.error(getOr(defaultServerError, 'response.data.message', err));
      setLoading(false);
      throw err;
    }
  };

  switch (status) {
    case STREAM_STATUS.NEW:
    case STREAM_STATUS.PREPARING:
    case STREAM_STATUS.NONE:
      return (
        <div data-tip data-for="start">
          <Button
            onClick={handleStart}
            loading={isLoading}
            disabled={!hasBalance}
          >
            Start stream
          </Button>
          {!hasBalance && (
            <WarnTooltip
              text={`Minimum balance of ${MIN_VID} VID required to start a stream`}
              id="start"
            />
          )}
        </div>
      );
    case STREAM_STATUS.FAILED:
    case STREAM_STATUS.COMPLETED:
      return null;
    case STREAM_STATUS.PREPARED:
    case STREAM_STATUS.PENDING:
    case STREAM_STATUS.PROCESSING:
      return (
        <Button theme="perfect-white" onClick={completeStream}>
          Cancel stream
        </Button>
      );
    case STREAM_STATUS.READY:
      return (
        <Button theme="violet-sky" onClick={completeStream}>
          Stop stream
        </Button>
      );
    default:
      return (
        <Button onClick={runStream} loading={isLoading}>
          Start stream
        </Button>
      );
  }
});

const StreamPage: FC<RouteComponentProps & { streamId?: string }> = ({
  streamId,
}) => {
  const { isStreamLoading, fetchStream, clearStream, stream } = StreamStore;
  const interval = useRef(null);

  const fetchData = useCallback(async () => {
    if (!isStreamLoading) {
      try {
        await fetchStream(streamId);
      } catch (e) {
        if (e.response.status === 404) {
          history.navigate('/not-found');
        }
      }
      interval.current = setInterval(async () => {
        fetchStream(streamId, true);
      }, streamRequestTimeout);
    }
  }, [fetchStream, isStreamLoading, streamId]);

  useEffect(() => {
    fetchData();

    return () => {
      clearStream();
      clearInterval(interval.current);
    };
  }, [clearStream, fetchData]);

  return (
    <>
      <div className="topBar">
        <TopBar>
          <BackLink />
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Stream</Typography>
          </div>
          <div className={css.btns}>
            <StreamControl />
          </div>
        </TopBar>
      </div>
      <div className="content">{stream && <Stream />}</div>
    </>
  );
};

export default observer(StreamPage);
