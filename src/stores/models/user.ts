import { types } from 'mobx-state-tree';
import Account from './account';

export default types.model('User', {
  id: types.identifier,
  email: types.string,
  name: types.maybe(types.string),
  isActive: false,
  account: types.maybeNull(Account),
  role: types.string,
});
