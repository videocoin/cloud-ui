import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';
import { Select, Option } from 'ui-kit';
import { compose, map, filter } from 'lodash/fp';
import { history } from 'index';
import ModalStore from 'stores/modal';
import StreamStore from 'stores/stream';
import { observer } from 'mobx-react-lite';
import { modalType } from 'components/ModalManager';
import { startWebRTC } from 'api/streams';
import css from './index.module.scss';

const WebRTCInput = ({
  videoNode,
}: {
  videoNode: MutableRefObject<HTMLVideoElement>;
}) => {
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideo, setVideo] = useState<Option>(null);
  const [selectedAudio, setAudio] = useState<Option>(null);
  const localStream = useRef<MediaStream>();
  const unblock = useRef<any>();
  const { stream } = StreamStore;
  const { openModal } = ModalStore;

  const showAlertOnUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = '';
  };
  const gotDevices = useCallback((deviceInfos: MediaDeviceInfo[]) => {
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
  }, []);

  const initWebRTC = useCallback(() => {
    const pc = new RTCPeerConnection();

    if (!selectedVideo) return;
    const constraints = {
      audio: {
        deviceId: { exact: selectedAudio?.value as string },
      },
      video: {
        deviceId: { exact: selectedVideo?.value as string },
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream: any) => {
        mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
          pc.addTrack(track);
        });

        pc.createOffer().then(offer => {
          pc.setLocalDescription(offer);
          startWebRTC({ streamId: stream.id, sdp: offer.sdp }).then(
            (resp: any) => {
              const answer = new RTCSessionDescription({
                type: 'answer',
                sdp: resp.data.sdp,
              });

              pc.setRemoteDescription(answer);
            },
          );
        });
      });
  }, [selectedAudio, selectedVideo, stream.id]);

  useEffect(() => {
    if (stream?.isWebRTC && stream?.isPrepared) {
      initWebRTC();
    }
    // eslint-disable-next-line
  }, [initWebRTC, stream?.isWebRTC, stream?.isPrepared]);

  const initMediaDevices = useCallback(() => {
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
  }, [gotDevices, videoNode]);

  useEffect(() => {
    initMediaDevices();
  }, [initMediaDevices]);
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
  if (!stream) return null;

  const { isOffline } = stream;

  return (
    <div className={css.rtcInputs}>
      <Select
        placeholder="Select Video Input"
        value={selectedVideo}
        onChange={setVideo}
        options={videoDevices}
        isDisabled={!isOffline}
      />
      <Select
        placeholder="Select Audio Input"
        value={selectedAudio}
        onChange={setAudio}
        options={audioDevices}
        isDisabled={!isOffline}
      />
    </div>
  );
};

export default observer(WebRTCInput);
