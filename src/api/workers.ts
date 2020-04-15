import api from './index';
import { PAYMENT_URL } from 'const';

export function fetchWorkers() {
  return api('/miners');
}

export function fetchWorker(id: string) {
  return api(`/miners/${id}`);
}

export function deleteWorker(id: string) {
  return api.delete(`/miners/${id}`);
}

export function createWorker() {
  return api.post('/miners');
}

export function updateWorker(id: string, data: { name: string }) {
  return api.put(`/miners/${id}`, data);
}

export function fetchPayments(id: string) {
  return api(
    `https://cors-anywhere.herokuapp.com/${PAYMENT_URL}/transactions?receiver=${id}`,
  );
}
