import { Instance, applySnapshot, flow, types } from 'mobx-state-tree';
import { indexOf, reject, filter, map } from 'lodash/fp';
import * as API from 'api/workers';

const WorkerStatus = {
  NEW: 'NEW',
};

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
    worker: types.maybeNull(Worker),
    isCreating: false,
    isLoading: true,
    isDeleting: false,
    checked: types.array(types.string),
    isLoaded: false,
    isSaving: false,
  })
  .actions(self => {
    const fetchWorkers = flow(function* fetchWorkers({
      silent = false,
    }: {
      silent: boolean;
    }) {
      self.isLoading = !silent;

      try {
        const res = yield API.fetchWorkers();

        applySnapshot(self.workers, res.data.items);
      } finally {
        self.isLoading = false;
      }
    });

    return {
      fetchWorkers,
      fetchWorker: flow(function* fetchWorker(id: string) {
        self.isLoading = true;
        try {
          const res = yield API.fetchWorker(id);

          self.worker = res.data;

          return res;
        } finally {
          self.isLoading = false;
        }
      }),
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

          self.workers.replace(
            filter(({ id }) => indexOf(id)(self.checked) < 0, self.workers),
          );
          self.checked.clear();
        } finally {
          self.isDeleting = false;
        }
      }),
      updateWorker: flow(function* updateWorker(data) {
        self.isSaving = true;
        try {
          const res = yield API.updateWorker(self.worker.id, data);

          self.worker = res.data;
        } finally {
          self.isSaving = false;
        }
      }),
      clearWorker() {
        self.worker = null;
      },
      unsetLoaded() {
        self.isLoaded = false;
      },
    };
  })
  .views(self => ({
    get newWorkers() {
      return filter({ status: WorkerStatus.NEW })(self.workers);
    },
    get registeredWorkers() {
      return reject({ status: WorkerStatus.NEW })(self.workers);
    },
  }));

const WorkersStore = Workers.create({
  workers: [],
  worker: null,
});

export default WorkersStore;

export type IWorker = Instance<typeof Worker>;
