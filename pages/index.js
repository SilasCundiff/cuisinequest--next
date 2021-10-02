import Debugger from '@/components/debuggers';
import { useUserContext } from '@/contexts/UserContext';

export default function Home() {
  const { user } = useUserContext();

  return (
    <div className='p-4 shadow rounded bg-white'>
      <p className='text-gray-600 font-sora font-extrabold'>
        with Tailwind CSS, Firebase, and Spoonacular API.
      </p>
    </div>
  );
}
