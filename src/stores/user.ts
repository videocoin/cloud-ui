import { types, flow, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { propEq, getOr, get, map, lt } from 'lodash/fp';
import * as API from 'api/user';
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
} from 'const';
import StreamsStore from 'stores/streams';
import { convertToVID } from 'helpers/convertBalance';
import { State } from './types';
import User from './models/user';

const Store = types
  .model('UserStore', {
    user: types.maybeNull(User),
    actions: types.array(WalletAction),
    state: State,
    actionsMeta: WalletMeta,
    transactions: types.array(WalletTransaction),
    transactionsMeta: WalletMeta,
  })
  .actions(self => {
    let initialState = {};
    const fetchUser = flow(function* fetchUser(silent = false) {
      if (!silent) {
        self.state = 'loading';
      }
      try {
        const res: AxiosResponse<any> = yield API.getUser();

        self.user = User.create(res.data);
        self.state = 'loaded';

        return res;
      } catch (e) {
        self.state = 'error';
        localStorage.removeItem('token');
        throw e;
      }
    });
    const fetchTransactions = flow(function* fetchTransactions({
      page = 1,
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

      self.transactionsMeta.hasMore =
        transactions.length === TRANSACTIONS_OFFSET;
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

      self.actionsMeta.hasMore = res.data.actions.length === ACTIONS_OFFSET;
      const mappedActions = map<IWalletAction, IWalletAction>(
        ({ value, ...rest }) => ({
          value: convertToVID(value),
          ...rest,
        }),
      )(res.data.actions);

      self.actions.replace(mappedActions);
    });

    return {
      fetchUser,
      fetchActions,
      fetchTransactions,
      afterCreate: flow(function* afterCreate() {
        const AUTH_TOKEN = localStorage.getItem('token');

        initialState = getSnapshot(self);
        setTokenHeader(AUTH_TOKEN);
        yield fetchUser();
        yield fetchActions({ page: 1 });
        yield fetchTransactions({ page: 1 });
      }),
      signIn: flow(function* signIn(data) {
        const res: AxiosResponse = yield API.signIn(data);
        const { token } = res.data;

        localStorage.setItem('token', token);
        setTokenHeader(token);

        yield fetchUser();
        yield fetchActions({ page: 1 });

        return res;
      }),
      signUp: flow(function* signUp(data) {
        const res: AxiosResponse = yield API.signUp(data);
        const { token } = res.data;

        localStorage.setItem('token', token);
        setTokenHeader(token);
        yield fetchUser();
        yield fetchActions({ page: 1 });

        return res;
      }),
      logout() {
        localStorage.removeItem('token');
        removeTokenHeader();
        self.user = null;
        self.state = 'pending';
        StreamsStore.reset();
        applySnapshot(self, initialState);
      },
    };
  })
  .views(self => ({
    get isAuth() {
      return Boolean(self.user);
    },
    get isActive() {
      return getOr(false, 'user.isActive', self);
    },
    get isLoading() {
      return propEq('state', 'loading')(self);
    },
    get isPending() {
      return propEq('state', 'pending')(self);
    },
    get account() {
      return get('user.account')(self);
    },
    get balance() {
      return get('user.account.balance')(self);
    },
    get hasBalance() {
      return lt(MIN_VID)(+this.balance);
    },
    get address() {
      return get('user.account.address')(self);
    },
  }));

const UserStore = Store.create({
  state: 'pending',
  user: null,
  actions: [],
  transactions: [],
  actionsMeta: {
    offset: 0,
    limit: PROTOCOL_OFFSET,
    hasMore: false,
    page: 1,
  },
  transactionsMeta: {
    offset: 0,
    limit: PROTOCOL_OFFSET,
    hasMore: false,
    page: 1,
  },
});

export default UserStore;
