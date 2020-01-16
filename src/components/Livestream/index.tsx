import React, { useEffect, useRef, useState, useCallback } from 'react';
import { compose, map, filter, get, propEq, eq } from 'lodash/fp';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Select, Input, Typography, Option } from 'ui-kit';
import Player from 'components/Player';
import ClipboardPostfix from 'components/ClipboardPostfix';
import { INGEST_STATUS, MIN_VID, OUTPUT_STATUS, STREAM_STATUS } from 'const';
import StreamStore from 'stores/stream';
import { toast } from 'react-toastify';
import UserStore from 'stores/user';
import { history } from 'index';
import { modalType } from 'components/ModalManager';
import ModalStore from 'stores/modal';
import css from './index.module.scss';
import ProtocolTable from './ProtocolTable';

const Livestream = ({
  setVideo: onSetVideo,
  setAudio: onSetAudio,
}: {
  setVideo: (val: string) => void;
  setAudio: (val: string) => void;
}) => {
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  // const [src, setSrc] = useState();
  const [selectedVideo, setVideo] = useState<Option>(null);
  const [selectedAudio, setAudio] = useState<Option>(null);
  const prevStatus = useRef();
  const localStream = useRef<MediaStream>();
  const unblock = useRef<any>();
  const videoNode = useRef<HTMLVideoElement>();
  const { openModal } = ModalStore;
  const { stream, isStreamLoading } = StreamStore;
  const { hasBalance } = UserStore;
  const currentStatus = get('status')(stream);

  const gotDevices = useCallback(
    (deviceInfos: MediaDeviceInfo[]) => {
      const audio = compose(
        map((device: MediaDeviceInfo) => {
          const { label, deviceId } = device.toJSON();

          return {
            label: label || 'audio',
            value: deviceId,
          };
        }),
        filter({ kind: 'audioinput' }),
      )(deviceInfos);
      const video = compose(
        map((device: MediaDeviceInfo) => {
          const { label, deviceId } = device.toJSON();

          return {
            label: label || 'camera',
            value: deviceId,
          };
        }),
        filter({ kind: 'videoinput' }),
      )(deviceInfos);

      setAudioDevices(audio);
      setVideoDevices(video);
      setVideo(video[0]);
      setAudio(audio[0]);
      onSetAudio(audio[0].value);
      onSetVideo(video[0].value);
    },
    [onSetAudio, onSetVideo],
  );

  const initWebRTC = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: { width: 1280, height: 720 } })
      .then(mediaStream => {
        localStream.current = mediaStream;
        navigator.mediaDevices.enumerateDevices().then(gotDevices);
        if (videoNode.current) {
          videoNode.current.srcObject = mediaStream;
          videoNode.current.onloadedmetadata = () => {
            videoNode.current.play();
          };
        }
      });
  }, [gotDevices]);

  const showAlertOnUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = '';
  };
  const handleLeave = useCallback(() => {
    openModal(modalType.CONFIRM_MODAL, {
      confirmText: 'Yes',
      title: 'Stop stream?',
      onConfirm: () => {
        if (localStream.current) {
          localStream.current.getTracks().forEach(track => track.stop());
        }
        stream.completeStream();
        setTimeout(() => {
          unblock.current();
        }, 100);
      },
    });
  }, [openModal, stream]);

  useEffect(() => {
    if (stream.isWebRTC) {
      initWebRTC();
    }
    if (stream.isWebRTC && stream.isProcessing) {
      unblock.current = history.block(() => {
        handleLeave();
      });
      window.addEventListener('beforeunload', showAlertOnUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', showAlertOnUnload);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      propEq('status', STREAM_STATUS.STREAM_STATUS_FAILED)(stream) &&
      prevStatus.current
    ) {
      toast.success('Stream Failed To Start.');
    }
    prevStatus.current = currentStatus;
    // eslint-disable-next-line
  }, [currentStatus]);

  if (!stream || isStreamLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!stream) return null;

  const { name, status, inputStatus, outputUrl, rtmpUrl, isWebRTC } = stream;

  const isStreamActive = eq(status, STREAM_STATUS.STREAM_STATUS_READY);
  const isStreamFailed = eq(status, STREAM_STATUS.STREAM_STATUS_FAILED);
  const isStreamPrepared = eq(status, STREAM_STATUS.STREAM_STATUS_PREPARED);
  const isStreamReady = eq(status, STREAM_STATUS.STREAM_STATUS_READY);
  const isStreamPending =
    eq(status, STREAM_STATUS.STREAM_STATUS_PENDING) ||
    eq(status, STREAM_STATUS.STREAM_STATUS_PROCESSING);
  const isIngestActive = eq(inputStatus, 'INPUT_STATUS_ACTIVE');
  const isStreamOffline = eq(status, STREAM_STATUS.STREAM_STATUS_NEW);
  const isStreamPreparing = eq(status, STREAM_STATUS.STREAM_STATUS_PREPARING);
  const isStreamCompleted = eq(status, STREAM_STATUS.STREAM_STATUS_COMPLETED);

  const handleChangeVideo = (v: any) => {
    setVideo(v);
    onSetVideo(v.value);
  };
  const handleChangeAudio = (v: any) => {
    setAudio(v);
    onSetAudio(v.value);
  };

  const renderInput = () => {
    if (isStreamFailed) {
      return null;
    }
    if (!hasBalance) {
      return (
        <Typography>
          {`Minimum balance of ${MIN_VID} VID required to start a stream`}
        </Typography>
      );
    }
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
        value={rtmpUrl}
        label="Ingest URL"
        readOnly
        postfix={() => <ClipboardPostfix text={rtmpUrl} />}
      />
    );
  };

  const renderOutput = () => {
    if (isStreamReady) {
      return (
        <Input
          value={outputUrl}
          label="Output URL"
          readOnly
          postfix={() => <ClipboardPostfix text={outputUrl} />}
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
          {isWebRTC ? (
            <video muted ref={videoNode} />
          ) : (
            <Player src={outputUrl} status={status} inputStatus={inputStatus} />
          )}
        </div>
        <div className={css.desc}>
          <Typography>Stream Name</Typography>
          <Typography type="smallTitle">{name}</Typography>
        </div>
      </div>
      {!isStreamCompleted && (
        <section className={css.section}>
          <Typography type="subtitle" className={css.head}>
            {isStreamOffline || isStreamPreparing ? 'Get started' : 'Endpoints'}
          </Typography>

          <div className={css.endpoints}>
            {isWebRTC ? (
              <div className={css.rtcInputs}>
                <div className={css.endpointStatus}>
                  <div
                    className={cn(css.mark, {
                      [css.active]: isIngestActive,
                      [css.pending]: isStreamPrepared,
                    })}
                  />
                  <div className={css.endpointTitle}>Stream Input</div>
                  <Typography type="smallBody" theme="sunkissed">
                    {INGEST_STATUS[status]}
                  </Typography>
                </div>
                <Select
                  placeholder="Select Video Input"
                  value={selectedVideo}
                  onChange={handleChangeVideo}
                  options={videoDevices}
                  isDisabled={!isStreamOffline}
                />
                <Select
                  placeholder="Select Audio Input"
                  value={selectedAudio}
                  onChange={handleChangeAudio}
                  options={audioDevices}
                  isDisabled={!isStreamOffline}
                />
              </div>
            ) : (
              <div>
                <div className={css.endpointStatus}>
                  <div
                    className={cn(css.mark, {
                      [css.active]: isIngestActive,
                      [css.pending]: isStreamPrepared,
                    })}
                  />
                  <div className={css.endpointTitle}>Stream Input</div>
                  <Typography type="smallBody" theme="sunkissed">
                    {INGEST_STATUS[status]}
                  </Typography>
                </div>
                {renderInput()}
              </div>
            )}
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
                  <Typography type="smallBody" theme="sunkissed">
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
