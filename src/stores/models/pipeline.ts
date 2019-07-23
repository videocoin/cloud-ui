import { flow, getParent, types } from 'mobx-state-tree';
import * as API from 'api/streams';
import { map, reject, indexOf, without, concat } from 'lodash/fp';
import { TStream } from 'stores/types';
import Stream from './stream';

export const PipelineItem = types.model('PipelineItem', {
  id: types.identifier,
  name: types.string,
  createdAt: types.string,
  profileId: types.string,
  streamsCount: types.number,
  streamsPending: types.number,
  streamsReady: types.number,
});

export const Pipeline = types
  .model('Pipeline', {
    id: types.identifier,
    name: types.string,
    createdAt: types.string,
    profileId: types.string,
    streams: types.model({
      items: types.array(Stream),
    }),
  })
  .volatile(() => ({
    checked: [],
  }))
  .actions(self => ({
    checkStream(id: string) {
      if (indexOf(id)(self.checked) >= 0) {
        self.checked = without([id])(self.checked);
      } else {
        self.checked = concat([id])(self.checked);
      }
    },
    createStream: flow(function* createStream() {
      try {
        const res = yield API.createStream(self.id);

        self.streams.items.push(res.data);
      } catch (e) {
        throw e;
      }
    }),
    deleteStreams: flow(function* deleteStream() {
      const parent = getParent(self);

      parent.changePipelineState('deleting');
      const promises = map(API.deleteStream)(self.checked);

      try {
        const res = yield Promise.all(promises);

        self.streams.items.replace(
          reject<TStream>(({ id }) => indexOf(id)(self.checked) >= 0)(
            self.streams.items,
          ),
        );
        parent.changePipelineState('loaded');

        return res;
      } catch (e) {
        parent.changePipelineState('error');
        throw e;
      }
    }),
  }));
