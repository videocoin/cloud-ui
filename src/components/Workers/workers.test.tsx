import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkersStore from 'stores/workers';
import mockAxios from '__mocks__/axios';
import WorkerStatus from 'components/Workers/WorkerStatus';
import WorkerSetupGuideCard from 'components/Workers/WorkerSetupGuide/Card';
import ControlBar from './ControlBar';

describe('Control Bar', () => {
  it('Should show selected workers length', () => {
    WorkersStore.checkWorker('1');
    WorkersStore.checkWorker('2');
    WorkersStore.checkWorker('3');
    const { container } = render(<ControlBar />);

    expect(container.innerHTML).toContain('3 Selected');
  });
  it('Should delete workers', async () => {
    mockAxios.onAny(`/miners/1`).reply(200);
    mockAxios.onAny(`/miners/2`).reply(200);
    mockAxios.onAny(`/miners/3`).reply(200);
    const { container } = render(<ControlBar />);
    const btn = container.querySelector('button');

    expect(container.innerHTML).not.toContain('Spinner');

    await act(async () => {
      await userEvent.click(btn);
    });

    expect(container.innerHTML).toContain('0 Selected');
    expect(container.innerHTML).not.toContain('Spinner');
  });
});

describe('Worker status', () => {
  it('Should correct render worker status', () => {
    const props = {
      status: 'NEW',
      name: 'TEST',
    };
    const { getByTestId } = render(<WorkerStatus {...props} />);

    expect(getByTestId('status').classList).toContain('new');
    expect(getByTestId('name').innerHTML).toEqual('test');
  });
});

describe('Worker SetupGuide Card', () => {
  it('Should correct render setup worker card', () => {
    const props = {
      title: 'Amazon',
      icon: 'aws' as any,
    };
    const { container } = render(<WorkerSetupGuideCard {...props} />);

    expect(container.querySelector('.cardDesc').innerHTML).toEqual(
      'Amazon Setup Guide',
    );
  });
});
