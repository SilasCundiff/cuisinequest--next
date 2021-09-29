import { useUserContext } from '@/contexts/UserContext';

export const AuthDebugger = () => {
  const { user } = useUserContext();

  return (
    <div
      className={`${
        user ? 'bg-green-400' : 'bg-red-400'
      } text-gray-900 flex flex-wrap px-4 py-2 rounded-lg`}
    >
      <div className='ml-auto flex-1'>
        Authenticated: {user ? 'true' : 'false'}
      </div>
      <div className='mr-auto ml-4 flex-1'>
        User: {user ? user._delegate.email : 'null'}
      </div>
    </div>
  );
};
