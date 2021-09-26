import Debugger from '@/components/debuggers';

export default function Home() {
  return (
    <div className='p-4 shadow rounded bg-white'>
      <Debugger />
      <h1 className='text-purple-500 leading-normal font-extrabold'>
        CuisineQuest
      </h1>
      <p className='text-gray-500 font-sora font-extrabold'>
        with Tailwind CSS, Firebase, and Spoonacular API.
      </p>
    </div>
  );
}
