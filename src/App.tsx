import ModulePanel from './components/ModulePanel';
import type { Module } from './types';

const staticModules: Module[] = [
  {
    isLocked: false,
    iterations: [
      {
        id: 'EM-1',
        title: 'Iteration 1',
        selection: 'short',
      },
      {
        id: 'EM-2',
        title: 'Iteration 2',
        selection: 'long',
      },
      {
        id: 'EM-3',
        title: 'Iteration 3',
        selection: null,
      },
    ],
  },
  {
    isLocked: false,
    iterations: [],
  },
  {
    isLocked: true,
    iterations: [
      {
        id: 'EM-1',
        title: 'Iteration 1',
        selection: 'short',
      },
    ],
  },
];

function App() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <ModulePanel modules={staticModules} />
      </div>
    </>
  );
}

export default App;
