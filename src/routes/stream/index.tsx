import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, TopBar, Typography, WarnTooltip } from 'ui-kit';
import { toast } from 'react-toastify';
import { eq, get, getOr } from 'lodash/fp';
import BackLink from 'components/BackLink';
import Stream from 'components/Stream';
import { observer } from 'mobx-react-lite';
import StreamStore from 'stores/stream';
import HttpStatus from 'http-status-codes';
import {
  MIN_BALANCE,
  STREAM_STATUS,
  defaultServerError,
  STREAM_INPUT_TYPE,
} from 'const';
import { history } from 'index';
import css from './index.module.scss';
import billingStore from 'stores/billing';

const streamRequestTimeout = 5000;
const StreamControl = observer(() => {
  const [isLoading, setLoading] = useState(false);
  const [isCancelling, setCancelling] = useState(false);
  const { stream, file, url } = StreamStore;
  const { hasBalance } = billingStore;

  if (!stream) return null;
  const { status, inputType, runStream, completeStream } = stream;

  const handleComplete = async () => {
    setCancelling(true);
    await completeStream();
  };

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

  const disabled = eq(STREAM_INPUT_TYPE.FILE, inputType) && !file && !url;

  switch (status) {
    case STREAM_STATUS.NEW:
    case STREAM_STATUS.PREPARING:
    case STREAM_STATUS.NONE:
      return (
        <div data-tip data-for="start">
          {disabled && (
            <WarnTooltip
              place="left"
              text="Select a file first to run stream"
              id="start"
            />
          )}
          {!hasBalance && (
            <WarnTooltip
              place="left"
              text={`Minimum balance of $${MIN_BALANCE} required to start a stream`}
              id="start"
            />
          )}
          <Button
            onClick={handleStart}
            loading={isLoading}
            disabled={!hasBalance || disabled}
          >
            Start stream
          </Button>
        </div>
      );
    case STREAM_STATUS.FAILED:
    case STREAM_STATUS.COMPLETED:
    case STREAM_STATUS.CANCELLED:
      return null;
    case STREAM_STATUS.PREPARED:
    case STREAM_STATUS.PENDING:
    case STREAM_STATUS.PROCESSING:
      return (
        <Button
          theme="perfect-white"
          loading={isCancelling}
          onClick={handleComplete}
        >
          Cancel stream
        </Button>
      );
    case STREAM_STATUS.READY:
      return (
        <Button
          theme="violet-sky"
          loading={isCancelling}
          onClick={handleComplete}
        >
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
        if (eq(HttpStatus.NOT_FOUND, get('response.status')(e))) {
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
