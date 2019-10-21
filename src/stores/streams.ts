import Streams from './models/streams';

const StreamsStore = Streams.create({
  state: 'pending',
  streams: {},
  sort: {
    field: 'status',
    order: 'asc',
  },
  checked: {},
  profiles: [],
});

export default StreamsStore;
