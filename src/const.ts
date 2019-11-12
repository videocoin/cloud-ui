/* eslint-disable @typescript-eslint/camelcase */
import { IStatus } from 'stores/models/stream';

export const BASE_URL = process.env.REACT_APP_VC_API_URL;
export const WS_URL = process.env.REACT_APP_VC_WS_URL;
export const LOG_URL = process.env.REACT_APP_VC_TXLOG_API_URL;

export const defaultServerError =
  "Oops. Something went wrong! Sorry. We've let our engineers know.";

export const LiveStreamProfiles = [
  {
    label: 'SD Profile  (2Mbps - 640px Width - 60fps)',
    value: 1,
  },
  {
    label: 'HD Profile  (3Mbps - 1280px Width - 60fps)',
    value: 2,
  },
  {
    label: 'Full HD Profile  (4Mbps - 1920px Width - 60fps)',
    value: 3,
  },
];

export const readableProfile: { [key: string]: string } = {
  profile_id_sd: 'SD Profile  (2Mbps - 640px Width - 60fps)',
  profile_id_hd: 'HD Profile  (3Mbps - 1280px Width - 60fps)',
  profile_id_fhd: 'Full HD Profile  (4Mbps - 1920px Width - 60fps)',
};

export const balanceRequestTimeout = 30000;

export const statusTable: { [key: string]: string } = {
  IDLE: 'Idle',
  PENDING_REQUEST: 'Pending',
  PENDING_APPROVE: 'Pending',
  PENDING_CREATE: 'Pending',
  PENDING_JOB: 'Awaiting Input',
  RUNNING: 'Running',
  FAILED: 'Failed',
  COMPLETED: 'Failed',
};

export const OUTPUT_STATUS: { [key in IStatus]: string } = {
  STREAM_STATUS_NONE: '',
  STREAM_STATUS_NEW: '',
  STREAM_STATUS_PREPARING: '',
  STREAM_STATUS_PREPARED: 'Awaiting Input',
  STREAM_STATUS_PENDING: 'Preparing Stream',
  STREAM_STATUS_PROCESSING: 'Preparing Stream',
  STREAM_STATUS_READY: 'Streaming',
  STREAM_STATUS_COMPLETED: '',
  STREAM_STATUS_CANCELLED: '',
  STREAM_STATUS_FAILED: 'Stream Failed',
};

export const INGEST_STATUS: { [key in IStatus]: string } = {
  STREAM_STATUS_NONE: 'Not Started',
  STREAM_STATUS_NEW: 'Not Started',
  STREAM_STATUS_PREPARING: 'Preparing',
  STREAM_STATUS_PREPARED: 'Awaiting Input',
  STREAM_STATUS_PENDING: 'Receiving',
  STREAM_STATUS_PROCESSING: 'Receiving',
  STREAM_STATUS_READY: 'Receiving',
  STREAM_STATUS_COMPLETED: '',
  STREAM_STATUS_CANCELLED: '',
  STREAM_STATUS_FAILED: 'Stream Failed',
};

export const PROTOCOL_OFFSET = 10;
export const ACTIONS_OFFSET = 15;
export const protocolRequestTimeout = 3000;
export const MIN_VID = 10;
export const SUPPORT_EMAIL = 'support@videocoin.io';
export const TRANSACTIONS_OFFSET = 20;
