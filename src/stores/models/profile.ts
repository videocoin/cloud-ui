import { types } from 'mobx-state-tree';

export const Profile = types.model({
  id: types.identifier,
  name: types.string,
  description: types.string,
  isEnabled: types.boolean,
});
