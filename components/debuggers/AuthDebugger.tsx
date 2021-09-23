import { useUserAuthContext } from '@/contexts/UserAuthContext';

export const AuthDebugger = () => {
  const { authenticated, toggleAuthForDebugging } = useUserAuthContext();
  return (
    <div
      className={`${
        authenticated ? 'bg-green-400' : 'bg-red-400'
      } text-gray-900 flex px-4 py-2 rounded-lg`}
      onClick={toggleAuthForDebugging}
    >
      <span className='m-auto'>
        Authenticated: {authenticated.toString().toUpperCase()}
      </span>
    </div>
  );
};
