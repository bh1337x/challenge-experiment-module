import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl font-bold mb-2">Count: {count}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}
