import { types, flow } from 'mobx-state-tree';
import { propEq, getOr, get, map, lt } from 'lodash/fp';
import * as API from 'api/user';
import { removeTokenHeader, setTokenHeader } from 'api';
import { IWalletAction, WalletAction } from 'stores/models/wallet';
import { AxiosResponse } from 'axios';
import { ACTIONS_OFFSET, MIN_VID, PROTOCOL_OFFSET } from 'const';
import StreamsStore from 'stores/streams';
import { convertToVID } from 'helpers/convertBalance';
import { State } from './types';
import User from './models/user';

const Store = types
  .model('UserStore', {
    user: types.maybeNull(User),
    actions: types.array(WalletAction),
    state: State,
    actionsMeta: types.model({
      offset: types.number,
      page: types.number,
      limit: types.number,
      hasMore: false,
    }),
  })
  .actions(self => {
    const fetchUser = flow(function* fetchUser(silent = false) {
      if (!silent) {
        self.state = 'loading';
      }
      try {
        const res: AxiosResponse = yield API.getUser();

        self.user = User.create(res.data);
        self.user.account.balance = convertToVID(self.user.account.balance);
        self.state = 'loaded';

        return res;
      } catch (e) {
        self.state = 'error';
        localStorage.removeItem('token');
        throw e;
      }
    });
    const fetchActions = flow(function* fetchActions(page) {
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
      afterCreate: flow(function* afterCreate() {
        yield fetchUser();
        yield fetchActions(1);
      }),
      signIn: flow(function* signIn(data) {
        const res: AxiosResponse = yield API.signIn(data);
        const { token } = res.data;

        localStorage.setItem('token', token);
        setTokenHeader(token);

        yield fetchUser();
        yield fetchActions(1);

        return res;
      }),
      signUp: flow(function* signUp(data) {
        const res: AxiosResponse = yield API.signUp(data);
        const { token } = res.data;

        localStorage.setItem('token', token);
        setTokenHeader(token);
        yield fetchUser();
        yield fetchActions(1);

        return res;
      }),
      logout() {
        localStorage.removeItem('token');
        removeTokenHeader();
        self.user = null;
        self.state = 'pending';
        StreamsStore.reset();
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
  actionsMeta: {
    offset: 0,
    limit: PROTOCOL_OFFSET,
    hasMore: false,
    page: 1,
  },
});

export default UserStore;
