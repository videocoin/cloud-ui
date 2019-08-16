import api from '.';
import { RestoreForm, SignInForm, SignUpForm } from '@types';

export function signUp(data: SignUpForm) {
  return api.post('/users', data);
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
  return api.post('/recover', data);
}

export function getActions(
  address: string,
  params: { limit: number; offset: number },
) {
  return api(`https://txlog.dev.videocoin.network/api/v1/actions/${address}`, {
    params,
  });
}
