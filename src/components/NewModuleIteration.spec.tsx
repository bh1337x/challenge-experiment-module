import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewModuleIteration from './NewModuleIteration';
import type { Iteration } from '../types';

const mockIteration: Iteration = {
  id: 'EM-1',
  title: '',
  selection: null,
};

const mockGenerateFn = vi.fn();

function TestWrapper() {
  const inputRef = { current: null };

  return (
    <NewModuleIteration
      iteration={mockIteration}
      isFirst={true}
      isLast={false}
      isSingle={false}
      inputRef={inputRef}
      generateFn={mockGenerateFn}
    />
  );
}

describe('NewModuleIteration', () => {
  it('renders iteration id', () => {
    render(<TestWrapper />);
    expect(screen.getByText('EM-1')).toBeInTheDocument();
  });

  it('renders input placeholder', () => {
    render(<TestWrapper />);
    expect(
      screen.getByPlaceholderText('Adding iteration...'),
    ).toBeInTheDocument();
  });

  it('calls generateFn when generate is clicked', async () => {
    render(<TestWrapper />);

    const generateLink = screen.getByText('generate');
    await userEvent.click(generateLink);

    expect(mockGenerateFn).toHaveBeenCalledTimes(1);
  });
});
