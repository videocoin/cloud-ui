import { types, flow } from 'mobx-state-tree';
import { equals, getOr } from 'lodash/fp';
import makeInspectable from 'mobx-devtools-mst';
import * as API from 'api/user';
import { setTokenHeader } from 'api';

const Account = types.model('Account', {
  id: types.identifier,
  address: types.string,
  balance: types.number,
});

export const User = types.model('User', {
  id: types.string,
  email: types.string,
  name: types.maybe(types.string),
  activated: false,
  account: types.maybeNull(Account),
});

export const UserStore = types
  .model('UserStore', {
    user: types.late(() => types.maybeNull(User)),
    state: types.enumeration('State', [
      'loading',
      'loaded',
      'pending',
      'error',
    ]),
  })
  .actions(self => {
    const fetchUser = flow(function* fetchUser() {
      self.state = 'loading';
      try {
        const res = yield API.getUser();
        self.user = User.create(res.data);
        self.state = 'loaded';
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
          fetchUser();
          return res;
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
      return equals('loading', self.state);
    },
    get isPending() {
      return equals('pending', self.state);
    },
  }));

const store = UserStore.create({
  state: 'pending',
  user: null,
});

makeInspectable(store);

export default store;
