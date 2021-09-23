import { useSearchContext } from '@/contexts/SearchContext';

export const SearchDebugger = () => {
  const { search } = useSearchContext();
  return (
    <div className={`bg-green-50 text-gray-900 flex px-4 py-2 rounded-lg mt-2`}>
      Search:
      <span className='ml-2'>{search.query}</span>
    </div>
  );
};
