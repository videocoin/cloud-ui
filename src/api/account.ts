import api from '.';

export function fetchAccount(id: string) {
  return api(`/accounts/${id}`);
}
