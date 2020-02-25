import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from '__mocks__/copy-to-clipboard';
import AccessTokenModal from './AccessTokenModal';

jest.mock('hooks/useLockBodyScroll');
describe('AccessTokenModal', () => {
  let wrapper: RenderResult;
  const token = 'test-token';
  const closeModal = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <AccessTokenModal closeModal={closeModal} token={token} />,
    );
  });
  it('should correct render access token', () => {
    const { getByTestId } = wrapper;
    const accessInput = getByTestId('accessTokenInput');

    expect(accessInput.querySelector('input').value).toBe(token);
  });
  it('should copy token to clipboard when clicked on input', () => {
    const { getByTestId } = wrapper;
    const accessInput = getByTestId('accessTokenInput');
    const copyBtn = accessInput.querySelector('.copy');

    userEvent.click(copyBtn);
    expect(copy).toBeCalledTimes(1);
  });
  it('should close modal when clicked on finish button', () => {
    const { getByTestId } = wrapper;
    const accessTokenBtn = getByTestId('accessTokenBtn');

    userEvent.click(accessTokenBtn.querySelector('button'));
    expect(closeModal).toBeCalledTimes(1);
  });
});
