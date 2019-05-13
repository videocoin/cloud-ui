import React from 'react';
import { createPortal } from 'react-dom';
import { Modal as BaseModal, ModalProps } from 'ui-kit';
import usePortal from '../../hooks/usePortal';

const Modal = ({ ...props }: ModalProps) => {
  const target = usePortal('modal-root');
  return createPortal(<BaseModal {...props} />, target);
};

export default Modal;
