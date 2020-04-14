import { flow, types, Instance } from 'mobx-state-tree';
import { lt, sumBy } from 'lodash/fp';
import * as billingApi from 'api/billing';
import Billing from './models/billing';
import { MIN_BALANCE } from 'const';

const Charge = types.model({
  streamId: types.string,
  streamName: types.string,
  streamIsLive: types.boolean,
  streamProfileId: types.string,
  streamProfileName: types.string,
  createdAt: types.string,
  duration: types.number,
  cost: types.number,
  totalCost: types.number,
});

const Transaction = types.model({
  id: types.string,
  type: types.string,
  status: types.string,
  createdAt: types.string,
  amount: types.number,
});

const Chart = types.model({
  name: types.string,
  live: types.number,
  vod: types.number,
});

const Store = types
  .model('BillingStore', {
    billing: Billing,
    charges: types.array(Charge),
    transactions: types.array(Transaction),
    charts: types.array(Chart),
  })
  .actions((self) => ({
    fetchBillingProfile: flow(function* fetchBillingProfile() {
      const res = yield billingApi.getProfile();
      self.billing = res.data;
    }),
    fetchCharges: flow(function* fetchCharges() {
      const res = yield billingApi.getCharges();
      self.charges = res.data.items;
    }),
    fetchTransactions: flow(function* fetchTransactions() {
      const res = yield billingApi.getTransactions();
      self.transactions = res.data.items;
    }),
    fetchCharts: flow(function* fetchTransactions() {
      const res = yield billingApi.getCharts();
      self.charts = res.data.items;
    }),
  }))
  .views((self) => ({
    get totalPaid() {
      return sumBy('totalCost')(self.charges);
    },
    get totalVod() {
      return sumBy('vod')(self.charts);
    },
    get totalLive() {
      return sumBy('live')(self.charts);
    },
    get hasBalance() {
      return lt(MIN_BALANCE)(self.billing.balance);
    },
  }));

const billingStore = Store.create({
  billing: {
    balance: 0,
  },
});

export type ICharge = Instance<typeof Charge>;
export type ITransaction = Instance<typeof Transaction>;
export type IChart = Instance<typeof Chart>;
export default billingStore;
