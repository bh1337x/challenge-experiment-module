import clsx from 'clsx';
import type { Iteration } from '../types';

export default function ModuleIterationView({
  iteration,
  isModuleLocked,
  isFirst,
  isLast,
  isSingle,
  onClick,
}: {
  iteration: Iteration;
  isModuleLocked: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSingle: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex items-center justify-between bg-black px-4 py-2 ',
        isModuleLocked ? 'cursor-not-allowed' : 'cursor-pointer',
        isFirst && 'rounded-t-lg',
        isLast && 'rounded-b-lg',
        isSingle && 'rounded-lg',
      )}
    >
      <div className="flex items-center space-x-8">
        <span className="text-[#757575]">{iteration.id}</span>
        <span className="text-[#bdbdbd]">{iteration.title}</span>
      </div>
      {iteration.selection && (
        <div className="flex items-center space-x-2">
          <span className="text-[#757575]">Selection</span>
          <div
            className={clsx(
              'w-2 h-2 rounded-full',
              iteration.selection === 'short' && 'bg-green-500',
              iteration.selection === 'medium' && 'bg-yellow-500',
              iteration.selection === 'long' && 'bg-red-500',
            )}
          ></div>
        </div>
      )}
    </div>
  );
}
