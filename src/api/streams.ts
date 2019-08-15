import api from 'api/index';

export function getStream(id: string) {
  return api(`/streams/${id}`);
}

export function createStream(pipelineId: string) {
  return api.post('/streams', { pipelineId });
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
  return api(`http://txlog.dev.videocoin.network:8080/api/v1/stream/${id}`, {
    params,
  });
}
