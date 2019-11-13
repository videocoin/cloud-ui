import {
  applySnapshot,
  destroy,
  flow,
  getParent,
  getSnapshot,
  Instance,
  types,
} from 'mobx-state-tree';
import { keyBy, propEq } from 'lodash/fp';
import * as API from 'api/token';
import { values } from 'mobx';
import { AxiosResponse } from 'axios';
import { State, TState } from './types';

const Token = types
  .model({
    id: types.identifier,
    name: types.string,
    token: types.maybe(types.string),
  })
  .actions(self => ({
    remove() {
      const parent: any = getParent(self, 2);

      parent.deleteToken(self);
    },
  }));

const Tokens = types
  .model({
    state: State,
    tokens: types.map(Token),
  })
  .actions(self => ({
    fetchTokens: flow(function* fetchTokens() {
      self.state = 'loading';
      try {
        const res: AxiosResponse = yield API.getTokens();

        applySnapshot(self.tokens, keyBy('id')(res.data.items));
        self.state = 'loaded';
      } catch (e) {
        self.state = 'error';
      }
    }),
    deleteToken: flow(function* deleteToken(item: IToken) {
      self.state = 'deleting';
      const prevState = getSnapshot(self.tokens);

      destroy(item);
      try {
        yield API.removeToken(item.id);
        self.state = 'loaded';
      } catch (e) {
        applySnapshot(self.tokens, prevState);
        self.state = 'error';
      }
    }),
    addToken: flow<any, any>(function* addToken(name: string) {
      self.state = 'creating';
      try {
        const res: AxiosResponse = yield API.createToken(name);

        self.tokens.put(res.data);
        self.state = 'loaded';

        return res;
      } catch (e) {
        self.state = 'error';

        throw e;
      }
    }),
    afterCreate() {
      this.fetchTokens();
    },
  }))
  .views(self => ({
    get items() {
      return values(self.tokens);
    },
    get isCreating() {
      return propEq<TState>('state', 'creating')(self);
    },
    get isDeleting() {
      return propEq<TState>('state', 'deleting')(self);
    },
  }));

const TokensStore = Tokens.create({
  tokens: {},
  state: 'pending',
});

export default TokensStore;

export type IToken = Instance<typeof Token>;
