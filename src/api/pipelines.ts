import { mapKeys, snakeCase } from 'lodash/fp';
import api from '.';

export function getPipelines() {
  return api('/pipelines');
}

export function getPipeline(id: string) {
  return api(`/pipelines/${id}`);
}

export function addPipeline(data: { name: string; profileId: string }) {
  const mappedData = mapKeys(snakeCase)(data);

  return api.post('/pipelines', mappedData);
}
