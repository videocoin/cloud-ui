import { types, flow } from 'mobx-state-tree';
import { propEq, getOr } from 'lodash/fp';
import makeInspectable from 'mobx-devtools-mst';
import * as API from 'api/user';
import { removeTokenHeader, setTokenHeader } from 'api';
import { State } from './types';

const Account = types.model('Account', {
  id: types.identifier,
  address: types.string,
  balance: types.number,
});

const User = types.model('User', {
  id: types.maybe(types.string),
  email: types.maybe(types.string),
  name: types.maybe(types.string),
  activated: false,
  account: types.maybeNull(Account),
});

const Store = types
  .model('UserStore', {
    user: types.maybeNull(User),
    state: State,
  })
  .actions(self => {
    const fetchUser = flow(function* fetchUser() {
      self.state = 'loading';
      try {
        const res = yield API.getUser();
        self.user = User.create(res.data);
        self.state = 'loaded';
        return res;
      } catch (e) {
        self.state = 'error';
        throw e;
      }
    });
    return {
      fetchUser,
      signIn: flow(function* signIn(data) {
        try {
          const res = yield API.signIn(data);
          const { token } = res.data;
          localStorage.setItem('token', token);
          setTokenHeader(token);
          return yield fetchUser();
        } catch (e) {
          throw e;
        }
      }),
      signUp: flow(function* signUp(data) {
        try {
          const res = yield API.signUp(data);
          const { token } = res.data;
          localStorage.setItem('token', token);
          setTokenHeader(token);
          fetchUser();
          return res;
        } catch (e) {
          throw e;
        }
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
      return getOr(false, 'user.activated', self);
    },
    get isLoading() {
      return propEq('state', 'loading')(self);
    },
    get isPending() {
      return propEq('state', 'pending')(self);
    },
    get account() {
      return self.user.account;
    },
    get balance() {
      return self.user.account.balance;
    },
  }));

const UserStore = Store.create({
  state: 'pending',
  user: null,
});

makeInspectable(UserStore);

export default UserStore;
