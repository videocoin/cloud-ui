import { types } from 'mobx-state-tree';

export default types.model('Billing', {
  balance: types.number,
});
