import clsx from 'clsx';
import type { Iteration } from '../types';

export default function NewModuleIteration({
  iteration,
  isFirst,
  isLast,
  isSingle,
  inputRef,
  generateFn,
}: {
  iteration: Iteration;
  isFirst: boolean;
  isLast: boolean;
  isSingle: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  generateFn: () => void;
}) {
  return (
    <>
      <div
        key={iteration.id}
        className={clsx(
          'flex items-center justify-between bg-black px-4 py-2',
          isFirst && 'rounded-t-lg',
          isLast && 'rounded-b-lg',
          isSingle && 'rounded-lg',
        )}
      >
        <div className="flex items-center space-x-8">
          <span className="text-[#757575]">{iteration.id}</span>
          <input
            type="text"
            ref={inputRef}
            placeholder="Adding iteration..."
            className="placeholder-[#757575] text-[#bdbdbd] focus:outline-none"
          />
        </div>
      </div>
      <div className="bg-black rounded-lg text-xl text-[#757575] p-4 mt-4">
        To add a new iteration, start typing a prompt or{' '}
        <span
          onClick={generateFn}
          className="underline underline-offset-5 cursor-pointer"
        >
          generate
        </span>{' '}
        a new one.
      </div>
    </>
  );
}
