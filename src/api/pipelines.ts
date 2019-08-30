import { AxiosPromise } from 'axios';
import { TPipeline } from 'stores/types';
import api from '.';

export function getPipelines() {
  return api('/pipelines');
}

export function getPipeline(id: string) {
  return api(`/pipelines/${id}`);
}

export function addPipeline(data: {
  name: string;
  profileId: string;
}): AxiosPromise<TPipeline> {
  return api.post('/pipelines', data);
}

export function deletePipeline(id: string) {
  return api.delete(`/pipelines/${id}`);
}
