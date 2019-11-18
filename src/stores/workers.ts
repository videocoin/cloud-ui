import { Instance, applySnapshot, flow, types } from 'mobx-state-tree';
import { indexOf, reject, filter, map } from 'lodash/fp';
import * as API from 'api/workers';

const Worker = types.model('Worker', {
  id: types.identifier,
  name: types.string,
  status: types.string,
  systemInfo: types.model({
    cpuCores: types.number,
    cpuFreq: types.number,
    cpuUsage: types.number,
    memTotal: types.number,
    memUsage: types.number,
  }),
});

const Workers = types
  .model('Workers', {
    workers: types.array(Worker),
    isCreating: false,
    isLoading: true,
    isDeleting: false,
    checked: types.array(types.string),
    isLoaded: false,
  })
  .actions(self => {
    const fetchWorkers = flow(function* fetchWorkers({
      silent = false,
    }: {
      silent: boolean;
    }) {
      if (!silent) {
        self.isLoading = true;
      }
      try {
        const res = yield API.fetchWorkers();

        applySnapshot(self.workers, res.data.items);
      } finally {
        self.isLoading = false;
      }
    });

    return {
      fetchWorkers,
      createWorker: flow(function* createWorker() {
        self.isCreating = true;
        try {
          const res = yield API.createWorker();

          self.isLoaded = true;
          self.workers.unshift(res.data);
        } finally {
          self.isCreating = false;
        }
      }),
      checkWorker(id: string) {
        const idx = indexOf(id)(self.checked);

        if (idx >= 0) {
          self.checked.splice(idx, 1);
        } else {
          self.checked.push(id);
        }
      },
      deleteWorkers: flow(function* deleteWorkers() {
        self.isDeleting = true;
        try {
          const promises = map(API.deleteWorker)(self.checked);

          yield Promise.all(promises);

          const t = filter(
            ({ id }) => indexOf(id)(self.checked) < 0,
            self.workers,
          );

          self.workers.replace(t);
          console.log(self.workers);
          self.checked.clear();
        } finally {
          self.isDeleting = false;
        }
      }),
    };
  })
  .views(self => ({
    get newWorkers() {
      return filter({ status: 'NEW' })(self.workers);
    },
    get registeredWorkers() {
      return reject({ status: 'NEW' })(self.workers);
    },
  }));

const WorkersStore = Workers.create({
  workers: [],
});

export default WorkersStore;

export type IWorker = Instance<typeof Worker>;
