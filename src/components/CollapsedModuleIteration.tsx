import clsx from 'clsx';
import type { Iteration } from '../types';
import { useState } from 'react';

export default function CollapsedModuleIteration({
  iteration,
  isFirst,
  isLast,
  isSingle,
  cancelFn,
  doneFn,
}: {
  iteration: Iteration;
  isFirst: boolean;
  isLast: boolean;
  isSingle: boolean;
  cancelFn: () => void;
  doneFn: (newSelection: Iteration['selection']) => void;
}) {
  const [selection, setSelection] = useState(iteration.selection);

  function toggleSelection(newSelection: 'short' | 'medium' | 'long') {
    if (selection === newSelection) return setSelection(null);
    setSelection(newSelection);
  }

  return (
    <div
      key={iteration.id}
      className={clsx(
        'flex flex-col bg-black px-4 py-4',
        isFirst && 'rounded-t-lg',
        isLast && 'rounded-b-lg',
        isSingle && 'rounded-lg',
      )}
    >
      <div className="flex">
        <div className="mr-10">
          <span className="block text-[#757575]">{iteration.id}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#bdbdbd]">{iteration.title}</span>
          <div className="text-sm border-b-1 border-[#181818] font-semibold">
            <button
              onClick={() => toggleSelection('short')}
              className={clsx(
                'my-4 mr-4 bg-transparent border py-1 px-2 rounded cursor-pointer',
                selection === 'short'
                  ? 'border-green-500 text-green-500'
                  : 'border-[#757575] text-[#757575]',
              )}
            >
              SHORT
            </button>
            <button
              onClick={() => toggleSelection('medium')}
              className={clsx(
                'bg-transparent border py-1 px-2 rounded cursor-pointer',
                selection === 'medium'
                  ? 'border-yellow-500 text-yellow-500'
                  : 'border-[#757575] text-[#757575]',
              )}
            >
              MEDIUM LENGTH
            </button>
            <button
              onClick={() => toggleSelection('long')}
              className={clsx(
                'mb-4 bg-transparent border py-1 px-2 rounded cursor-pointer',
                selection === 'long'
                  ? 'border-red-500 text-red-500'
                  : 'border-[#757575] text-[#757575]',
              )}
            >
              VERY VERY VERY LONG (UP TO 35 CHAR)
            </button>
          </div>
        </div>
      </div>
      <div className="font-bold text-[#757575] flex justify-end mt-4">
        <button onClick={cancelFn} className="cursor-pointer mr-8">
          CANCEL
        </button>
        <button
          onClick={() => doneFn(selection)}
          className="cursor-pointer text-[#d9d9d9]"
        >
          DONE
        </button>
      </div>
    </div>
  );
}
