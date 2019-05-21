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
