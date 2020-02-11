import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmModal from './index';

jest.mock('hooks/useLockBodyScroll');

describe('Confirm Modal', () => {
  let wrapper: RenderResult;
  const closeModal = jest.fn();
  const onConfirm = jest.fn();

  beforeEach(() => {
    const props = {
      title: 'Test Modal',
      text: 'test description',
      onConfirm,
      closeModal,
      confirmText: 'ok test',
    };

    wrapper = render(<ConfirmModal {...props} />);
  });
  it('should render correctly with props', () => {
    const { getByText } = wrapper;

    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByText('test description')).toBeInTheDocument();
    expect(getByText('ok test')).toBeInTheDocument();
  });
  it('should close modal', () => {
    const { getByText } = wrapper;
    const cancelBtn = getByText('Cancel');

    userEvent.click(cancelBtn);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
  it('should confirm modal and change state to loading', () => {
    const { getByText } = wrapper;
    const confirmBtn = getByText('ok test');

    userEvent.click(confirmBtn);
    expect(confirmBtn.parentNode).toBeDisabled();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
