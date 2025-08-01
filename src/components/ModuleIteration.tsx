import { useEffect, useState } from 'react';
import NewModuleIteration from './NewModuleIteration';
import CollapsedModuleIteration from './CollapsedModuleIteration';
import ModuleIterationView from './ModuleIterationView';
import type { Iteration } from '../types';

export default function ModuleIteration({
  inputRef,
  iteration,
  isLocked,
  totalIterations,
  index,
  updateFn,
}: {
  iteration: Iteration;
  totalIterations: number;
  index: number;
  isLocked: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  updateFn: (newIteration: Iteration) => void;
}) {
  const isFirst = index === 0;
  const isLast = index === totalIterations - 1;
  const isSingle = totalIterations === 1;
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLocked) return;
    if (!isCollapsed) return;

    setIsCollapsed(false);
  }, [isLocked, isCollapsed]);

  if (!iteration.title) {
    return (
      <NewModuleIteration
        iteration={iteration}
        isFirst={isFirst}
        isLast={isLast}
        isSingle={isSingle}
        inputRef={inputRef}
        generateFn={() => {
          if (!inputRef || !inputRef.current) return;
          inputRef.current.value = `Iteration ${totalIterations}`;
        }}
      />
    );
  }

  if (isCollapsed) {
    return (
      <CollapsedModuleIteration
        iteration={iteration}
        isFirst={isFirst}
        isLast={isLast}
        isSingle={isSingle}
        cancelFn={() => {
          setIsCollapsed(false);
        }}
        doneFn={newSelection => {
          setIsCollapsed(false);
          updateFn({ ...iteration, selection: newSelection });
        }}
      />
    );
  }

  return (
    <ModuleIterationView
      iteration={iteration}
      isModuleLocked={isLocked}
      isFirst={isFirst}
      isLast={isLast}
      isSingle={isSingle}
      onClick={() => {
        if (isLocked) return;
        setIsCollapsed(!isCollapsed);
      }}
    />
  );
}
