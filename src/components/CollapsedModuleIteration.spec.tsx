import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollapsedModuleIteration from './CollapsedModuleIteration';
import type { Iteration } from '../types';

const mockIteration: Iteration = {
  id: 'EM-1',
  title: 'Test Iteration',
  selection: 'short',
};

const mockIterationNoSelection: Iteration = {
  id: 'EM-2',
  title: 'No Selection',
  selection: null,
};

const mockCancelFn = vi.fn();
const mockDoneFn = vi.fn();

describe('CollapsedModuleIteration', () => {
  beforeEach(() => {
    mockCancelFn.mockClear();
    mockDoneFn.mockClear();
  });

  it('renders iteration id and title', () => {
    render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={true}
        isLast={false}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    expect(screen.getByText('EM-1')).toBeInTheDocument();
    expect(screen.getByText('Test Iteration')).toBeInTheDocument();
  });

  it('renders selection buttons', () => {
    render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={true}
        isLast={false}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    expect(screen.getByRole('button', { name: /SHORT/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /MEDIUM/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /LONG/i,
      }),
    ).toBeInTheDocument();
  });

  it('shows current selection highlighted', () => {
    render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={true}
        isLast={false}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    const shortButton = screen.getByRole('button', { name: /SHORT/i });
    expect(shortButton).toHaveClass('border-green-500', 'text-green-500');
  });

  it('can toggle selection', async () => {
    render(
      <CollapsedModuleIteration
        iteration={mockIterationNoSelection}
        isFirst={true}
        isLast={false}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    const shortButton = screen.getByRole('button', { name: /SHORT/i });
    await userEvent.click(shortButton);

    expect(shortButton).toHaveClass('border-green-500', 'text-green-500');
  });

  it('calls cancelFn when cancel button is clicked', async () => {
    render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={true}
        isLast={false}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: /CANCEL/i });
    await userEvent.click(cancelButton);

    expect(mockCancelFn).toHaveBeenCalledTimes(1);
  });

  it('calls doneFn when done button is clicked', async () => {
    render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={true}
        isLast={false}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    const doneButton = screen.getByRole('button', { name: /DONE/i });
    await userEvent.click(doneButton);

    expect(mockDoneFn).toHaveBeenCalledWith('short');
  });

  it('applies correct CSS classes for positioning', () => {
    const { container } = render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={true}
        isLast={false}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('rounded-t-lg');
  });

  it('handles last iteration styling', () => {
    const { container } = render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={false}
        isLast={true}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('rounded-b-lg');
  });

  it('handles single iteration styling', () => {
    const { container } = render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={false}
        isLast={false}
        isSingle={true}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('rounded-lg');
  });

  it('can deselect current selection', async () => {
    render(
      <CollapsedModuleIteration
        iteration={mockIteration}
        isFirst={true}
        isLast={false}
        isSingle={false}
        cancelFn={mockCancelFn}
        doneFn={mockDoneFn}
      />,
    );

    const shortButton = screen.getByRole('button', { name: /SHORT/i });
    await userEvent.click(shortButton);

    expect(shortButton).not.toHaveClass('border-green-500', 'text-green-500');
  });
});
