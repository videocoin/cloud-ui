import api from 'api/index';

export function initPayment(data: { amount: number }) {
  return api.post('/billing/pay', data);
}
export function getProfile() {
  return api('/billing/profile');
}

export function getCharges() {
  return api('/billing/charges');
}

export function getTransactions() {
  return api('/billing/transactions');
}

export function getCharts() {
  return api('/billing/charts/charges');
}
