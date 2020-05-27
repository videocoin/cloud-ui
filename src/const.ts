/* eslint-disable @typescript-eslint/camelcase */
import { IStatus } from 'stores/models/stream';

export const BASE_URL = process.env.REACT_APP_CLOUD_API_URL;
export const WS_URL = process.env.REACT_APP_VC_WS_URL;
export const LOG_URL = process.env.REACT_APP_TXLOG_API_URL;
export const PAYMENT_URL = process.env.REACT_APP_PAYMENTS_API_URL;

export const defaultServerError =
  "Oops. Something went wrong! Sorry. We've let our engineers know.";

export const readableProfile: { [key: string]: string } = {
  profile_id_sd: 'SD Profile  (2Mbps - 640px Width - 60fps)',
  profile_id_hd: 'HD Profile  (3Mbps - 1280px Width - 60fps)',
  profile_id_fhd: 'Full HD Profile  (4Mbps - 1920px Width - 60fps)',
};

export const balanceRequestTimeout = 30000;
export const workersRequestTimeout = 30000;

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

export enum STREAM_STATUS {
  NONE = 'STREAM_STATUS_NONE',
  NEW = 'STREAM_STATUS_NEW',
  PREPARING = 'STREAM_STATUS_PREPARING',
  PREPARED = 'STREAM_STATUS_PREPARED',
  PENDING = 'STREAM_STATUS_PENDING',
  PROCESSING = 'STREAM_STATUS_PROCESSING',
  READY = 'STREAM_STATUS_READY',
  COMPLETED = 'STREAM_STATUS_COMPLETED',
  CANCELLED = 'STREAM_STATUS_CANCELLED',
  DELETED = 'STREAM_STATUS_DELETED',
  FAILED = 'STREAM_STATUS_FAILED',
}

export enum INPUT_STATUS {
  NONE = 'INPUT_STATUS_NONE',
  PENDING = 'INPUT_STATUS_PENDING',
  ACTIVE = 'INPUT_STATUS_ACTIVE',
  ERROR = 'INPUT_STATUS_ERROR',
}

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
  STREAM_STATUS_DELETED: '',
  STREAM_STATUS_FAILED: 'Stream Failed',
};

export const INGEST_STATUS: { [key in STREAM_STATUS]: string } = {
  STREAM_STATUS_NONE: 'Not Started',
  STREAM_STATUS_NEW: 'Not Started',
  STREAM_STATUS_PREPARING: 'Preparing',
  STREAM_STATUS_PREPARED: 'Awaiting Input',
  STREAM_STATUS_PENDING: 'Receiving',
  STREAM_STATUS_PROCESSING: 'Receiving',
  STREAM_STATUS_READY: 'Receiving',
  STREAM_STATUS_COMPLETED: '',
  STREAM_STATUS_CANCELLED: '',
  STREAM_STATUS_DELETED: '',
  STREAM_STATUS_FAILED: 'Stream Failed',
};

export const PROTOCOL_OFFSET = 10;
export const ACTIONS_OFFSET = 15;
export const protocolRequestTimeout = 3000;
export const MIN_BALANCE = 10;
export const SUPPORT_EMAIL = 'support@videocoin.io';
export const TRANSACTIONS_OFFSET = 20;

export enum STATE {
  loading = 'loading',
  loaded = 'loaded',
  pending = 'pending',
  error = 'error',
  deleting = 'deleting',
  creating = 'creating',
}

export enum STREAM_INPUT_TYPE {
  RTMP = 'INPUT_TYPE_RTMP',
  WEBRTC = 'INPUT_TYPE_WEBRTC',
  FILE = 'INPUT_TYPE_FILE',
  RTSP = 'INPUT_TYPE_RTSP',
  HLS = 'INPUT_TYPE_HLS',
}

export enum STREAM_OUTPUT_TYPE {
  HLS = 'OUTPUT_TYPE_HLS',
}

export const START_PAGE = 1;

export enum ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

export enum USER_ROLE {
  REGULAR = 'USER_ROLE_REGULAR',
  MINER = 'USER_ROLE_MINER',
  SUPER = 'USER_ROLE_SUPER',
}
export enum UI_ROLE {
  BOTH = 'USER_ROLE_UI_BOTH',
  PUBLISHER = 'USER_ROLE_UI_PUBLISHER',
  MINER = 'USER_ROLE_UI_MINER',
}

export enum STORAGE_KEY {
  AUTH_KEY = 'token',
  GUIDE_HIDDEN = 'guideHidden',
}
