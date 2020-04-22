import React, {
  useCallback,
  useState,
  useEffect,
  FormEvent,
  ReactNode,
  useRef,
} from 'react';
import { eq } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useDropzone } from 'react-dropzone';
import { Typography, Icon, Input } from 'ui-kit';
import cn from 'classnames';
import StreamStore from 'stores/stream';
import * as API from 'api/streams';
import css from './index.module.scss';
import SwitchInputSource, { InputSource } from './SwitchInputSource';

const REQUEST_TIMEOUT = 1000;
const Progress = ({
  name,
  onRemove,
  progress,
  disabled,
}: {
  name: string;
  progress: number;
  disabled: boolean;
  onRemove: () => void;
}) => {
  if (!name) return null;
  const isUploading = Boolean(progress);

  return (
    <div className={cn(css.draggedFile, { [css.upload]: isUploading })}>
      <div className={css.draggedInner}>
        <Icon name="videoPlay" width={24} height={17} />
        <div>
          <Typography type="body" theme={isUploading ? 'white' : 'light'}>
            {name}
          </Typography>
          {isUploading && (
            <Typography theme="white" type="caption">
              {progress}%{disabled && <span>- Upload Done</span>}
            </Typography>
          )}
        </div>
      </div>
      {!disabled && !progress && (
        <button type="button" onClick={onRemove}>
          <Icon name="remove" width={15} height={15} />
        </button>
      )}
      <div
        className={cn(css.progress, { [css.finished]: disabled })}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const FileInput = () => {
  const [tab, setTab] = useState(InputSource.FILE);
  const [progress, setProgress] = useState(0);
  const timer = useRef<any>();
  const { stream, setFile, file, setUrl, url } = StreamStore;

  const {
    id,
    isInputActive,
    isInputPending,
    isPreparing,
    isPrepared,
    isProcessing,
  } = stream;
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile],
  );
  const removeFile = () => setFile(null);

  const handleChangeUrl = (e: FormEvent<HTMLInputElement>) =>
    setUrl(e.currentTarget.value);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    disabled: Boolean(file) || isInputActive,
  });

  const uploadFile = useCallback(() => {
    if (!file) return;
    const formData = new FormData();

    formData.append('file', file);

    API.uploadFile(id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress({ loaded, total }) {
        const percentCompleted = Math.round((loaded * 100) / total);

        setProgress(percentCompleted);
      },
    });
  }, [file, id]);

  const startUrlProgressPoll = useCallback(
    (timeout: number) => {
      timer.current = (setTimeout(async () => {
        try {
          const res = await API.getUploadProgress(id);

          setProgress(res.data.progress);
        } finally {
          if (!isInputActive) {
            startUrlProgressPoll(REQUEST_TIMEOUT);
          }
        }
      }, timeout) as unknown) as number;
    },
    [id, isInputActive],
  );
  const uploadUrl = useCallback(async () => {
    if (!url) return;
    await API.uploadUrl(id, url);
    startUrlProgressPoll(REQUEST_TIMEOUT);
  }, [id, startUrlProgressPoll, url]);
  const isFileTab = eq(tab, InputSource.FILE);

  useEffect(() => {
    return () => {
      setFile(null);
      setUrl('');
    };
  }, [setFile, setUrl]);

  useEffect(() => {
    if (isInputPending && isPrepared) {
      isFileTab ? uploadFile() : uploadUrl();
    }
  }, [isInputPending, isPrepared, isFileTab, uploadFile, uploadUrl]);

  const disableChangeSource = isInputActive || isPreparing || isProcessing;

  const dragActive = isDragActive || Boolean(file) || Boolean(progress);
  const tabs: { [key in string]: ReactNode } = {
    [InputSource.FILE]: (
      <div
        className={cn(css.dragZone, {
          [css.dragActive]: dragActive,
          [css.hidden]: isInputActive && isFileTab && !file,
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isInputActive || file ? (
          <Progress
            name={file?.name}
            disabled={disableChangeSource}
            progress={progress}
            onRemove={removeFile}
          />
        ) : (
          <div className={css.dragDesc}>
            <Typography type="body" theme="sunkissed">
              Browse
            </Typography>{' '}
            <Typography>or drag & drop file</Typography>
          </div>
        )}
      </div>
    ),
    [InputSource.URL]: isInputPending ? (
      <div
        className={cn(css.dragZone, {
          [css.dragActive]: dragActive,
          [css.hidden]: isInputActive && isFileTab && !file,
        })}
      >
        <Progress
          name={file?.name || url}
          disabled={disableChangeSource}
          progress={progress}
          onRemove={removeFile}
        />
      </div>
    ) : (
      <Input
        value={url}
        autoFocus
        disabled={disableChangeSource}
        onChange={handleChangeUrl}
        label="URL to Video File"
      />
    ),
  };

  return (
    <>
      <SwitchInputSource disabled={disableChangeSource} onChange={setTab} />
      {tabs[tab]}
    </>
  );
};

export default observer(FileInput);
