import { types } from 'mobx-state-tree';

export default types.model('Account', {
  id: types.identifier,
  address: types.string,
  balance: types.number,
});
