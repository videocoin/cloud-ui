import { ORDER, STATE } from 'const';
import Streams from './models/streams';

const StreamsStore = Streams.create({
  state: STATE.pending,
  streams: [],
  sort: {
    field: 'status',
    order: ORDER.ASC,
  },
  checked: {},
  profiles: [],
});

export default StreamsStore;
