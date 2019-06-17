import api from '.';

export function getPipelines() {
  return api('/pipelines');
}

export function getPipeline(id: string) {
  return api(`/pipelines/${id}`);
}

export function addPipeline(data: { name: string; profileId: string }) {
  return api.post('/pipelines', data);
}

export function deletePipeline(id: string) {
  return api.delete(`/pipelines/${id}`);
}

export function runPipeline(id: string) {
  return api.post(`/pipelines/${id}/run`);
}

export function cancelPipeline(id: string) {
  return api.post(`/pipelines/${id}/cancel`);
}

export function completePipeline(id: string) {
  return api.post(`/pipelines/${id}/complete`);
}

export function getShared(accessCode: string) {
  return api(`/pipelines/code/${accessCode}`);
}
