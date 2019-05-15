import React from 'react';
import { createPortal } from 'react-dom';
import { Modal as BaseModal, ModalProps, Overlay } from 'ui-kit';
import ModalStore from 'stores/modal';
import usePortal from 'hooks/usePortal';
import './modal.scss';

const Modal = ({ ...props }: ModalProps) => {
  const target = usePortal('modal-root');
  const { closeModal } = ModalStore;
  return createPortal(
    <Overlay onClick={closeModal}>
      <BaseModal {...props} />
    </Overlay>,
    target,
  );
};

export default Modal;
