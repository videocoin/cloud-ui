export const BASE_URL = process.env.REACT_APP_VC_API_URL;

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
