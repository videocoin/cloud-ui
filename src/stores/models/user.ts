import { types } from 'mobx-state-tree';
import { USER_ROLE, UI_ROLE } from '../../const';

export default types.model('User', {
  id: types.identifier,
  email: types.string,
  name: types.maybe(types.string),
  isActive: false,
  role: types.enumeration<USER_ROLE>('Role', Object.values(USER_ROLE)),
  uiRole: types.enumeration<UI_ROLE>('Role', Object.values(UI_ROLE)),
  address1: types.string,
  address2: types.string,
  city: types.string,
  firstName: types.string,
  lastName: types.string,
  region: types.string,
  zip: types.string,
});
