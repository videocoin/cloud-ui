import { types, flow } from 'mobx-state-tree';
import { propEq, getOr, get } from 'lodash/fp';
import * as API from 'api/user';
import * as AccountAPI from 'api/account';
import { removeTokenHeader, setTokenHeader } from 'api';
import initSocket from 'socket';
import { WalletAction } from 'stores/models/wallet';
import { State } from './types';
import User from './models/user';

const Store = types
  .model('UserStore', {
    user: types.maybeNull(User),
    actions: types.array(WalletAction),
    state: State,
  })
  .actions(self => {
    const fetchUser = flow(function* fetchUser() {
      self.state = 'loading';
      try {
        const res = yield API.getUser();

        self.user = User.create(res.data);
        self.state = 'loaded';
        initSocket(self.user.id);

        return res;
      } catch (e) {
        self.state = 'error';
        localStorage.removeItem('token');
        throw e;
      }
    });
    const fetchActions = flow(function* fetchActions() {
      const res = yield API.getActions(self.user.account.address, {
        limit: 15,
        offset: 0,
      });

      console.log(res);
    });

    return {
      fetchUser,
      fetchActions,
      afterCreate: flow(function* afterCreate() {
        yield fetchUser();
        yield fetchActions();
      }),
      fetchAccount: flow(function* fetchAccount() {
        const res = yield AccountAPI.fetchAccount(self.user.account.id);

        self.user.account = res.data;

        return res;
      }),
      signIn: flow(function* signIn(data) {
        const res = yield API.signIn(data);
        const { token } = res.data;

        localStorage.setItem('token', token);
        setTokenHeader(token);

        yield fetchUser();
        yield fetchActions();

        return res;
      }),
      signUp: flow(function* signUp(data) {
        const res = yield API.signUp(data);
        const { token } = res.data;

        localStorage.setItem('token', token);
        setTokenHeader(token);
        yield fetchUser();
        yield fetchActions();

        return res;
      }),
      logout() {
        localStorage.removeItem('token');
        removeTokenHeader();
        self.user = null;
        self.state = 'pending';
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
    get address() {
      return get('user.account.address')(self);
    },
  }));

const UserStore = Store.create({
  state: 'pending',
  user: null,
  actions: [],
});

export default UserStore;
