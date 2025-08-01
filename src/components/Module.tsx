import { useRef, useState } from 'react';
import clsx from 'clsx';
import type { Iteration, Module } from '../types';
import ModuleIteration from './ModuleIteration';

export default function Module({ module }: { module: Module }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLocked, setIsLocked] = useState(module.isLocked);
  const [iterations, setIterations] = useState<Iteration[]>(
    module.iterations.length > 0
      ? module.iterations
      : [
          {
            id: 'EM-1',
            title: '',
            selection: null,
          },
        ],
  );

  const shouldShowLock =
    iterations.length > 0 && iterations[iterations.length - 1].title;

  function resetIterations() {
    setIterations([
      {
        id: `EM-1`,
        title: '',
        selection: null,
      },
    ]);
  }

  function addIteration() {
    setIterations([
      ...iterations,
      {
        id: `EM-${iterations.length + 1}`,
        title: '',
        selection: null,
      },
    ]);
  }

  function cancelAddingIteration() {
    if (iterations.length === 1) return setIsCollapsed(true);

    setIterations(iterations.filter(iteration => iteration.title !== ''));
  }

  function saveNewIteration() {
    if (!inputRef.current) return;

    iterations[iterations.length - 1].title = inputRef.current.value;
    setIterations([...iterations]);
  }

  return (
    <div className="bg-[#191919] p-4 rounded-lg">
      <div className="flex flex-row justify-between">
        <h1
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={clsx(
            'text-xl font-bold cursor-pointer',
            isCollapsed ? 'text-[#757575]' : 'text-white',
          )}
        >
          Experiment Module
        </h1>
        {shouldShowLock && <LockIcon isLocked={isLocked} />}
      </div>
      <div className={isCollapsed ? 'hidden' : 'mt-4 block'}>
        <div className="space-y-[2px]">
          {iterations.map((iteration, index) => (
            <ModuleIteration
              key={iteration.id}
              iteration={iteration}
              totalIterations={iterations.length}
              isLocked={isLocked}
              index={index}
              inputRef={inputRef}
              updateFn={newIteration => {
                const newIterations = [...iterations];
                newIterations[index] = newIteration;
                setIterations(newIterations);
              }}
            />
          ))}
        </div>
        <div className="font-bold text-[#757575] flex justify-end mt-4">
          {shouldShowLock ? (
            <>
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={clsx(
                  'cursor-pointer',
                  !isLocked && 'mr-8',
                  isLocked && 'text-red-500',
                )}
              >
                {isLocked ? 'UNLOCK' : 'LOCK'}
              </button>
              {!isLocked && (
                <>
                  <button
                    onClick={resetIterations}
                    className="cursor-pointer mr-8"
                  >
                    RESET
                  </button>
                  <button
                    onClick={addIteration}
                    className="cursor-pointer text-[#d9d9d9]"
                  >
                    + ADD ITERATION
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <button
                onClick={cancelAddingIteration}
                className="cursor-pointer mr-8"
              >
                CANCEL
              </button>
              <button
                onClick={saveNewIteration}
                className="cursor-pointer text-[#d9d9d9]"
              >
                DONE
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LockIcon({ isLocked }: { isLocked: boolean }) {
  return (
    <svg
      className="w-6 h-6 text-[#757575]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
    >
      {isLocked ? (
        <path
          fill="currentColor"
          d="M28 4.258c-6.54 0-12.516 4.664-12.516 14.25v5.625c-2.53.305-3.773 1.828-3.773 4.828v17.883c0 3.375 1.547 4.898 4.664 4.898h23.25c3.117 0 4.664-1.523 4.664-4.898V28.938c0-3-1.242-4.594-3.773-4.875v-5.555c0-9.586-5.977-14.25-12.516-14.25m-8.742 13.734c0-6.539 3.89-10.125 8.742-10.125s8.742 3.586 8.742 10.125v6.047l-17.484.023Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M40.316 3.297c-6.609 0-12.984 4.547-12.984 14.226v7.383H7.246c-3.117 0-4.57 1.477-4.57 4.828v18.141c0 3.352 1.453 4.828 4.57 4.828h23.578c3.117 0 4.57-1.476 4.57-4.828v-18.14c0-3.235-1.359-4.712-4.289-4.805v-7.9c0-6.656 4.313-10.148 9.211-10.148c4.922 0 9.234 3.492 9.234 10.148v5.39c0 1.665.82 2.368 1.899 2.368c1.031 0 1.875-.633 1.875-2.297v-4.969c0-9.68-6.398-14.226-13.008-14.226"
        />
      )}
    </svg>
  );
}
