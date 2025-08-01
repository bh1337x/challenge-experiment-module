import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ModulePanel from './ModulePanel';

describe('ModulePanel', () => {
  it('renders all given modules', () => {
    const modules = [
      {
        isLocked: false,
        iterations: [],
      },
      {
        isLocked: true,
        iterations: [],
      },
    ];

    render(<ModulePanel modules={modules} />);

    expect(screen.getAllByText('Experiment Module')).toHaveLength(
      modules.length,
    );
  });
});
