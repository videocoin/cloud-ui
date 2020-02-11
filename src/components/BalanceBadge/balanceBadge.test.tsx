import React from 'react';
import { render } from '@testing-library/react';
import BalanceBadge from './index';

jest.mock('stores/user', () => ({ balance: 2394003896099999999907 }));
describe('BalanceBadge', () => {
  it('should render correctly with balance data', () => {
    const { getByTestId, getByText } = render(<BalanceBadge />);
    const balance = getByTestId('balance');

    expect(getByText('VID Tokens')).toBeInTheDocument();
    expect(balance.textContent).toBe('2394.0038');
  });
});
