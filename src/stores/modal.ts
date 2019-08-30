import { types } from 'mobx-state-tree';

const Modal = types
  .model('Modal', {
    type: types.maybeNull(types.string),
  })
  .volatile(() => ({
    props: null,
  }))
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
});

export default ModalStore;
