/* eslint-disable @typescript-eslint/camelcase */
export const BASE_URL = process.env.REACT_APP_VC_API_URL;
export const WS_URL = process.env.REACT_APP_VC_WS_URL;

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

export const INGEST_STATUS: { [key: string]: string } = {
  INPUT_STATUS_NONE: 'None',
  INPUT_STATUS_PENDING: 'Inactive',
  INPUT_STATUS_ACTIVE: 'Receiving',
  INPUT_STATUS_ERROR: 'Error',
};

export const PROTOCOL_OFFSET = 10;
export const protocolRequestTimeout = 3000;
