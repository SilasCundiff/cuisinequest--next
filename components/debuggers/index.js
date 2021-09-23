import { AuthDebugger } from './AuthDebugger';
import { SearchDebugger } from './SearchDebugger';
import { RecipeListDebugger } from './RecipeListDebugger';
import { useState } from 'react';
const Debugger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed top-4 right-4 flex transform ${
          open && 'translate-x-full right-16'
        }`}
      >
        <div
          className='rounded-lg  bg-gray-800 p-4 text-green-50 mb-auto mr-4 text-4xl font-bold flex'
          onClick={() => setOpen(!open)}
        >
          {!open ? '>' : '<'}
        </div>
        <div className='rounded-lg  bg-gray-800 p-4'>
          <AuthDebugger />
          <SearchDebugger />
          <RecipeListDebugger />
        </div>
      </div>
    </>
  );
};

export * from './AuthDebugger';
export * from './RecipeListDebugger';
export * from './SearchDebugger';

export default Debugger;
