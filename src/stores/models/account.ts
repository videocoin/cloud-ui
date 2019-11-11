import { types } from 'mobx-state-tree';

export default types.model('Account', {
  address: types.string,
  balance: types.string,
});
