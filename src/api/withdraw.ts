import api from 'api/index';
import { AxiosPromise } from 'axios';

export function withdrawStart(data: {
  amount: string | number;
  address: string;
}): AxiosPromise<{ transferId: string }> {
  return api.post('/withdraw/start', data);
}

export function withdraw(data: {
  transferId: string;
  pin: string;
}): AxiosPromise<void> {
  return api.post('/withdraw', data);
}
