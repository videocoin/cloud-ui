import { types, flow, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { eq, propEq, getOr, get, map, lt } from 'lodash/fp';
import * as API from 'api/user';
import * as billingApi from 'api/billing';
import { removeTokenHeader, setTokenHeader } from 'api';
import {
  IWalletAction,
  WalletAction,
  IWalletTransaction,
  WalletTransaction,
  WalletMeta,
} from 'stores/models/wallet';
import { AxiosResponse } from 'axios';
import {
  ACTIONS_OFFSET,
  MIN_VID,
  PROTOCOL_OFFSET,
  TRANSACTIONS_OFFSET,
  AUTH_KEY,
  STATE,
  START_PAGE,
} from 'const';
import StreamsStore from 'stores/streams';
import { convertToVID } from 'helpers/convertBalance';
import { StateModel } from './types';
import User from './models/user';
import Billing from './models/billing';

const Store = types
  .model('UserStore', {
    user: types.maybeNull(User),
    actions: types.array(WalletAction),
    state: StateModel,
    actionsMeta: WalletMeta,
    transactions: types.array(WalletTransaction),
    transactionsMeta: WalletMeta,
    billing: Billing,
  })
  .actions((self) => {
    let initialState = {};
    const fetchUser = flow(function* fetchUser(silent = false) {
      if (!silent) {
        self.state = STATE.loading;
      }
      try {
        const res: AxiosResponse<any> = yield API.getUser();

        self.user = User.create(res.data);
        self.state = STATE.loaded;

        return res;
      } catch (e) {
        self.state = STATE.error;
        localStorage.removeItem(AUTH_KEY);
        throw e;
      }
    });
    const fetchTransactions = flow(function* fetchTransactions({
      page = START_PAGE,
      limit = TRANSACTIONS_OFFSET,
    }: {
      limit?: number;
      page?: number;
    }) {
      const offset = (page - 1) * TRANSACTIONS_OFFSET;
      const res: AxiosResponse = yield API.fetchTransactions(
        self.user.account.address,
        { limit, offset },
      );
      const { transactions } = res.data;
      const mappedTransactions = map<IWalletTransaction, IWalletTransaction>(
        ({ value, ...rest }) => ({
          value: convertToVID(value),
          ...rest,
        }),
      )(transactions);

      self.transactionsMeta.hasMore = eq(
        transactions.length,
        TRANSACTIONS_OFFSET,
      );
      applySnapshot(self.transactions, mappedTransactions);
    });
    const fetchActions = flow(function* fetchActions({ page }) {
      const offset = (page - 1) * ACTIONS_OFFSET;

      self.actionsMeta.offset = offset;
      self.actionsMeta.page = page;
      const res: AxiosResponse = yield API.getActions(
        self.user.account.address,
        {
          limit: ACTIONS_OFFSET,
          offset,
        },
      );

      self.actionsMeta.hasMore = eq(res.data.actions.length, ACTIONS_OFFSET);
      const mappedActions = map<IWalletAction, IWalletAction>(
        ({ value, ...rest }) => ({
          value: convertToVID(value),
          ...rest,
        }),
      )(res.data.actions);

      self.actions.replace(mappedActions);
    });
    const fetchBillingProfile = flow(function* fetchBillingProfile() {
      const res = yield billingApi.getProfile();

      self.billing = res.data;
    });
    const load = flow(function* load() {
      yield fetchUser();
      yield fetchBillingProfile();
      yield fetchActions({ page: START_PAGE });
      yield fetchTransactions({ page: START_PAGE });
    });

    return {
      fetchUser,
      fetchActions,
      fetchTransactions,
      fetchBillingProfile,
      afterCreate() {
        initialState = getSnapshot(self);
        const AUTH_TOKEN = localStorage.getItem(AUTH_KEY);

        setTokenHeader(AUTH_TOKEN);
        load();
      },
      signIn: flow(function* signIn(data) {
        const res: AxiosResponse = yield API.signIn(data);
        const { token } = res.data;

        localStorage.setItem(AUTH_KEY, token);
        setTokenHeader(token);

        yield load();

        return res;
      }),
      signUp: flow(function* signUp(data) {
        const res: AxiosResponse = yield API.signUp(data);
        const { token } = res.data;

        localStorage.setItem(AUTH_KEY, token);
        setTokenHeader(token);
        yield fetchUser();
        yield fetchActions({ page: START_PAGE });

        return res;
      }),
      logout() {
        localStorage.removeItem(AUTH_KEY);
        removeTokenHeader();
        self.user = null;
        self.state = STATE.pending;
        StreamsStore.reset();
        applySnapshot(self, initialState);
      },
    };
  })
  .views((self) => ({
    get isAuth() {
      return Boolean(self.user);
    },
    get isActive() {
      return getOr(false, 'user.isActive', self);
    },
    get isLoading() {
      return propEq('state', STATE.loading)(self);
    },
    get isPending() {
      return propEq('state', STATE.pending)(self);
    },
    get account() {
      return get('user.account')(self);
    },
    get balance() {
      return get('billing.balance')(self);
    },
    get hasBalance() {
      return lt(MIN_VID)(+this.balance);
    },
    get address() {
      return get('user.account.address')(self);
    },
  }));

const UserStore = Store.create({
  state: STATE.pending,
  user: null,
  actions: [],
  transactions: [],
  billing: {
    balance: 0,
  },
  actionsMeta: {
    offset: 0,
    limit: PROTOCOL_OFFSET,
    hasMore: false,
    page: START_PAGE,
  },
  transactionsMeta: {
    offset: 0,
    limit: PROTOCOL_OFFSET,
    hasMore: false,
    page: START_PAGE,
  },
});

export default UserStore;
