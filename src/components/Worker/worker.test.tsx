import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import formatBytes from 'helpers/formatBytes';
import Worker from './index';

jest.mock('stores/workers', () => ({
  worker: {
    id: 123,
    name: 'Worker',
    status: 'new',
    systemInfo: {
      cpuCores: 1,
      cpuFreq: 2,
      cpuUsage: 3,
      memTotal: 4,
      memUsage: 5,
    },
  },
  isLoading: false,
}));
describe('Worker Page', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<Worker />);
  });
  it('Should correct render worker', () => {
    const { getByTestId, getByText, getByDisplayValue } = wrapper;
    const clientId = getByText('Client ID').nextElementSibling;

    expect(clientId.innerHTML).toEqual('123');
    expect(getByDisplayValue('Worker')).toBeInTheDocument();
    expect(getByTestId('ram').firstChild.innerHTML).toContain(
      `${formatBytes(4)}gb RAM`,
    );
    expect(getByTestId('cpu').firstChild.innerHTML).toContain('1 Cores');
    expect(getByTestId('freq').firstChild.innerHTML).toBe(
      `${(2 / 1000).toFixed(1)} ghz`,
    );
  });
  it('Should update worker name', async () => {
    const { getByDisplayValue, getByLabelText } = wrapper;

    await userEvent.type(getByDisplayValue('Worker'), 'New worker');
    expect(
      getByLabelText('Worker Name', { selector: 'input' }),
    ).toHaveAttribute('value', 'New worker');
  });
});
