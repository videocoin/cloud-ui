import React from 'react';
import { createPortal } from 'react-dom';
import { Modal as BaseModal } from 'videocoin-ui-kit';
import { ModalProps } from 'videocoin-ui-kit/dist/components/Modal/Modal';
import usePortal from '../../hooks/usePortal';

const Modal = ({ ...props }: ModalProps) => {
  const target = usePortal('modal-root');
  return createPortal(<BaseModal {...props} />, target);
};

export default Modal;
