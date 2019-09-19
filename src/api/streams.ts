import api from 'api/index';
import { AxiosPromise } from 'axios';

export function getStreams() {
  return api(`/streams`);
}

export function getStream(id: string) {
  return api(`/streams/${id}`);
}

export function addStream(data: {
  name: string;
  profileId: string;
}): AxiosPromise<any> {
  return api.post('/streams', data);
}

export function deleteStream(id: string) {
  return api.delete(`/streams/${id}`);
}

export function runStream(id: string) {
  return api.post(`/streams/${id}/run`);
}

export function cancelStream(id: string) {
  return api.post(`/streams/${id}/cancel`);
}

export function completeStream(id: string) {
  return api.post(`/streams/${id}/cancel`);
}

export function getShared(accessCode: string) {
  return api(`/streams/code/${accessCode}`);
}

export function getProtocol(
  id: string,
  params: { offset: number; limit: number },
) {
  return api(`https://txlog.dev.videocoin.network/api/v1/stream/${id}`, {
    params,
  });
}
