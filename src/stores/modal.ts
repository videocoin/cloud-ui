import { types } from 'mobx-state-tree';

const Node: any = types.map(types.union(types.string, types.number));

const Modal = types
  .model('Modal', {
    type: types.maybeNull(types.string),
    props: types.maybeNull(Node),
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

export default Modal.create({
  type: null,
  props: null,
});
