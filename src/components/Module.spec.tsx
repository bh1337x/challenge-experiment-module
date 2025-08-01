import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Module from './Module';
import type { Module as ModuleType } from '../types';

const mockModule: ModuleType = {
  isLocked: false,
  iterations: [
    {
      id: 'EM-1',
      title: 'Test Iteration',
      selection: 'short',
    },
  ],
};

const mockEmptyModule: ModuleType = {
  isLocked: false,
  iterations: [],
};

const mockLockedModule: ModuleType = {
  isLocked: true,
  iterations: [
    {
      id: 'EM-1',
      title: 'Locked Iteration',
      selection: 'medium',
    },
  ],
};

describe('Module', () => {
  it('renders with iterations', () => {
    render(<Module module={mockModule} />);

    expect(screen.getByText('EM-1')).toBeInTheDocument();
    expect(screen.getByText('Test Iteration')).toBeInTheDocument();
  });

  it('renders add iteration when empty', () => {
    render(<Module module={mockEmptyModule} />);

    expect(screen.getByText('EM-1')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Adding iteration...'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /CANCEL/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /DONE/i })).toBeInTheDocument();
  });

  it('renders locked module correctly', () => {
    render(<Module module={mockLockedModule} />);

    expect(screen.getByText('Locked Iteration')).toBeInTheDocument();
  });

  it('does not show lock or unlock button when empty', () => {
    render(<Module module={mockEmptyModule} />);

    const lockButton = screen.queryByRole('button', { name: /LOCK/i });
    const unlockButton = screen.queryByRole('button', { name: /UNLOCK/i });

    expect(lockButton).not.toBeInTheDocument();
    expect(unlockButton).not.toBeInTheDocument();
  });

  it('can toggle lock state', async () => {
    render(<Module module={mockModule} />);

    const lockButton = screen.getByRole('button', { name: /LOCK/i });
    await userEvent.click(lockButton);

    expect(lockButton).toHaveTextContent('UNLOCK');
  });

  it('can add new iteration', async () => {
    render(<Module module={mockModule} />);

    const addButton = screen.getByRole('button', { name: /ADD ITERATION/i });
    await userEvent.click(addButton);

    const inputBox = screen.getByPlaceholderText('Adding iteration...');
    await userEvent.type(inputBox, 'The New Iteration');

    const doneButton = screen.getByRole('button', { name: /DONE/i });
    await userEvent.click(doneButton);

    expect(screen.getByText('EM-2')).toBeInTheDocument();
    expect(screen.getByText('The New Iteration')).toBeInTheDocument();
  });

  it('can reset iterations', async () => {
    render(<Module module={mockModule} />);
    const resetButton = screen.getByRole('button', { name: /RESET/i });

    await userEvent.click(resetButton);
    expect(
      screen.getByPlaceholderText('Adding iteration...'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /CANCEL/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /DONE/i })).toBeInTheDocument();
  });
});
