import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModuleIterationView from './ModuleIterationView';
import type { Iteration } from '../types';

const mockIteration: Iteration = {
  id: 'EM-1',
  title: 'Test Iteration',
  selection: 'short',
};

const mockIterationWithoutSelection: Iteration = {
  id: 'EM-2',
  title: 'No Selection Iteration',
  selection: null,
};

const mockOnClick = vi.fn();

describe('ModuleIterationView', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders iteration id and title', () => {
    render(
      <ModuleIterationView
        iteration={mockIteration}
        isModuleLocked={false}
        isFirst={true}
        isLast={false}
        isSingle={false}
        onClick={mockOnClick}
      />,
    );

    expect(screen.getByText('EM-1')).toBeInTheDocument();
    expect(screen.getByText('Test Iteration')).toBeInTheDocument();
  });

  it('shows selection indicator when selection exists', () => {
    render(
      <ModuleIterationView
        iteration={mockIteration}
        isModuleLocked={false}
        isFirst={true}
        isLast={false}
        isSingle={false}
        onClick={mockOnClick}
      />,
    );

    expect(screen.getByText('Selection')).toBeInTheDocument();
  });

  it('does not show selection indicator when selection is null', () => {
    render(
      <ModuleIterationView
        iteration={mockIterationWithoutSelection}
        isModuleLocked={false}
        isFirst={true}
        isLast={false}
        isSingle={false}
        onClick={mockOnClick}
      />,
    );

    expect(screen.queryByText('Selection')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked and not locked', async () => {
    render(
      <ModuleIterationView
        iteration={mockIteration}
        isModuleLocked={false}
        isFirst={true}
        isLast={false}
        isSingle={false}
        onClick={mockOnClick}
      />,
    );

    await userEvent.click(screen.getByText('Test Iteration'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct CSS classes for first iteration', () => {
    const { container } = render(
      <ModuleIterationView
        iteration={mockIteration}
        isModuleLocked={false}
        isFirst={true}
        isLast={false}
        isSingle={false}
        onClick={mockOnClick}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('rounded-t-lg');
  });

  it('applies correct CSS classes for last iteration', () => {
    const { container } = render(
      <ModuleIterationView
        iteration={mockIteration}
        isModuleLocked={false}
        isFirst={false}
        isLast={true}
        isSingle={false}
        onClick={mockOnClick}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('rounded-b-lg');
  });

  it('applies correct CSS classes for single iteration', () => {
    const { container } = render(
      <ModuleIterationView
        iteration={mockIteration}
        isModuleLocked={false}
        isFirst={false}
        isLast={false}
        isSingle={true}
        onClick={mockOnClick}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('rounded-lg');
  });

  it('applies cursor-not-allowed when module is locked', () => {
    const { container } = render(
      <ModuleIterationView
        iteration={mockIteration}
        isModuleLocked={true}
        isFirst={true}
        isLast={false}
        isSingle={false}
        onClick={mockOnClick}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('cursor-not-allowed');
  });

  it('applies cursor-pointer when module is not locked', () => {
    const { container } = render(
      <ModuleIterationView
        iteration={mockIteration}
        isModuleLocked={false}
        isFirst={true}
        isLast={false}
        isSingle={false}
        onClick={mockOnClick}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('cursor-pointer');
  });
});
