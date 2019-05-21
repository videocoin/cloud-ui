import { snakeCase, mapKeys } from 'lodash/fp';
import api from '.';
import { RestoreForm, SignInForm, SignUpForm } from '@types';

export function signUp(data: SignUpForm) {
  const mappedData = mapKeys(snakeCase)(data);

  return api.post('/users', mappedData);
}

export function signIn(data: SignInForm) {
  return api.post('/auth', data);
}

export function getUser() {
  return api('/user');
}

export function resetPassword(data: { email: string }) {
  return api.post('/recovery/start', data);
}

export function recoverPassword(data: RestoreForm) {
  const mappedData = mapKeys(snakeCase)(data);

  return api.post('/recover', mappedData);
}
