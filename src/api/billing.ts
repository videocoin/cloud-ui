import api from 'api/index';

export function initPayment(data: { amount: number }) {
  return api.post('/billing/pay', data);
}
