import api from 'api/index';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { LOG_URL } from 'const';

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
  return api.post(`/streams/${id}/stop`);
}

export function getShared(accessCode: string) {
  return api(`/streams/code/${accessCode}`);
}

export function getProtocol(
  id: string,
  params: { offset: number; limit: number },
) {
  return api(`${LOG_URL}/stream/${id}`, {
    params,
  });
}

export function getProfiles() {
  return api('/profiles');
}

export function startWebRTC(data: { streamId: string; sdp: any }) {
  return api.post('/ms/streams/webrtc', data);
}

export function uploadFile(
  streamId: string,
  data: FormData,
  config: AxiosRequestConfig,
) {
  return api.post(`/upload/local/${streamId}`, data, config);
}

export function uploadUrl(streamId: string, url: string) {
  return api.post(`/upload/url/${streamId}`, { url });
}

export function getUploadProgress(streamId: string) {
  return api(`/upload/url/${streamId}`);
}
