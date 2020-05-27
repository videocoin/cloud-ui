import { types, flow, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { propEq, getOr, get, lt } from 'lodash/fp';
import * as API from 'api/user';
import { removeTokenHeader, setTokenHeader } from 'api';
import {
  WalletAction,
  WalletTransaction,
  WalletMeta,
} from 'stores/models/wallet';
import { AxiosResponse } from 'axios';
import {
  MIN_BALANCE,
  PROTOCOL_OFFSET,
  STATE,
  START_PAGE,
  STORAGE_KEY,
  UI_ROLE,
} from 'const';
import StreamsStore from 'stores/streams';
import billingStore from 'stores/billing';
import { StateModel } from './types';
import User from './models/user';

const Store = types
  .model('UserStore', {
    user: types.maybeNull(User),
    actions: types.array(WalletAction),
    state: StateModel,
    actionsMeta: WalletMeta,
    transactions: types.array(WalletTransaction),
    transactionsMeta: WalletMeta,
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
        localStorage.removeItem(STORAGE_KEY.AUTH_KEY);
        throw e;
      }
    });

    const load = flow(function* load() {
      yield fetchUser();
      yield billingStore.fetchBillingProfile();
    });

    return {
      fetchUser,
      updateRole: (uiRole: UI_ROLE) => {
        API.updateUser(self.user.id, { uiRole });
        self.user.uiRole = uiRole;
      },
      afterCreate() {
        initialState = getSnapshot(self);
        const AUTH_TOKEN = localStorage.getItem(STORAGE_KEY.AUTH_KEY);

        setTokenHeader(AUTH_TOKEN);
        load();
      },
      signIn: flow(function* signIn(data) {
        const res: AxiosResponse = yield API.signIn(data);
        const { token } = res.data;

        localStorage.setItem(STORAGE_KEY.AUTH_KEY, token);
        setTokenHeader(token);

        yield load();

        return res;
      }),
      signUp: flow(function* signUp(data) {
        const res: AxiosResponse = yield API.signUp(data);
        const { token } = res.data;

        localStorage.setItem(STORAGE_KEY.AUTH_KEY, token);
        setTokenHeader(token);
        yield fetchUser();
        // yield fetchActions({ page: START_PAGE });

        return res;
      }),
      logout() {
        localStorage.removeItem(STORAGE_KEY.AUTH_KEY);
        removeTokenHeader();
        self.user = null;
        self.state = STATE.pending;
        StreamsStore.reset();
        applySnapshot(self, initialState);
      },
      confirmUser: flow(function* confirmUser(token: string) {
        yield API.confirmUser(token);
        yield fetchUser();
      }),
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
      return get('user.account.balance')(self);
    },
    get hasBalance() {
      return lt(MIN_BALANCE)(+this.balance);
    },
    get address() {
      return get('user.account.address')(self);
    },
    get isWorker() {
      return propEq('user.uiRole', UI_ROLE.MINER)(self);
    },
    get isPublisher() {
      return propEq('user.uiRole', UI_ROLE.PUBLISHER)(self);
    },
    get isBoth() {
      return propEq('user.uiRole', UI_ROLE.BOTH)(self);
    },
  }));

const UserStore = Store.create({
  state: STATE.pending,
  user: null,
  actions: [],
  transactions: [],
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
