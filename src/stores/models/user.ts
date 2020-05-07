import { types } from 'mobx-state-tree';
import { USER_ROLE } from '../../const';

export default types.model('User', {
  id: types.identifier,
  email: types.string,
  name: types.maybe(types.string),
  isActive: false,
  role: types.enumeration<USER_ROLE>('Role', Object.values(USER_ROLE)),
});
