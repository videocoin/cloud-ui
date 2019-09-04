import { AxiosPromise } from 'axios';
import { IToken } from 'stores/tokens';
import api from './index';

export function getTokens() {
  return api('/tokens');
}

export function createToken(name: string): AxiosPromise<IToken> {
  return api.post('/tokens', { name });
}

export function removeToken(id: string) {
  return api.delete(`/tokens/${id}`);
}
