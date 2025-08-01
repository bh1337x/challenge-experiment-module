import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModuleIteration from './ModuleIteration';
import type { Iteration } from '../types';

const mockIteration: Iteration = {
  id: 'EM-1',
  title: 'Test Iteration',
  selection: 'short',
};

const mockNewIteration: Iteration = {
  id: 'EM-1',
  title: '',
  selection: null,
};

const mockUpdateFn = vi.fn();

describe('ModuleIteration', () => {
  beforeEach(() => {
    mockUpdateFn.mockClear();
  });

  it('renders NewModuleIteration when title is empty', () => {
    const inputRef = { current: null };
    render(
      <ModuleIteration
        iteration={mockNewIteration}
        isLocked={false}
        totalIterations={1}
        index={0}
        inputRef={inputRef}
        updateFn={mockUpdateFn}
      />,
    );

    expect(
      screen.getByPlaceholderText('Adding iteration...'),
    ).toBeInTheDocument();
  });

  it('renders ModuleIterationView when not empty', () => {
    const inputRef = { current: null };
    render(
      <ModuleIteration
        iteration={mockIteration}
        isLocked={false}
        totalIterations={1}
        index={0}
        inputRef={inputRef}
        updateFn={mockUpdateFn}
      />,
    );

    expect(screen.getByText('Test Iteration')).toBeInTheDocument();
    expect(screen.getByText('EM-1')).toBeInTheDocument();
  });

  it('renders CollapsedModuleIteration when clicked', async () => {
    const inputRef = { current: null };
    render(
      <ModuleIteration
        iteration={mockIteration}
        isLocked={false}
        totalIterations={1}
        index={0}
        inputRef={inputRef}
        updateFn={mockUpdateFn}
      />,
    );

    await userEvent.click(screen.getByText('Test Iteration'));

    expect(screen.getByRole('button', { name: /SHORT/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /MEDIUM/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LONG/i })).toBeInTheDocument();
  });
});
