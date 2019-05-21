import { types } from 'mobx-state-tree';

const Node = types.map(types.union(types.string, types.number));

const Modal = types
  .model('Modal', {
    type: types.maybeNull(types.string),
    props: types.maybeNull(types.late(() => Node)),
  })
  .actions(self => ({
    openModal(modalType: string, modalProps?: any) {
      self.type = modalType;
      self.props = modalProps;
    },
    closeModal() {
      self.type = null;
      self.props = null;
    },
  }));

const ModalStore = Modal.create({
  type: null,
  props: null,
});

export default ModalStore;
