import React from 'react';
import { Modal as BaseModal, ModalProps, Overlay } from 'ui-kit';
import ModalStore from 'stores/modal';
import usePortal from 'react-useportal';
import useLockBodyScroll from 'hooks/useLockBodyScroll';
import './modal.scss';

const Modal = ({ ...props }: ModalProps) => {
  useLockBodyScroll();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('modal-root'),
  });
  const { closeModal } = ModalStore;

  return (
    <Portal>
      <Overlay onClick={closeModal}>
        <BaseModal {...props} />
      </Overlay>
    </Portal>
  );
};

export default Modal;
