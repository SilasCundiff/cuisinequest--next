import Link from 'next/link';
import Image from 'next/image';
import { truncate } from '@/lib/helpers';
interface RecipeCardProps {
  title: string;
  recipeId: number;
  inFavoritesMenu?: boolean;
  removeFromFavorites?: (recipeId) => void;
  className?: string;
}

const apiKey = process.env.NEXT_PUBLIC_RECIPES_API_KEY;

const RecipeCard = ({
  title,
  recipeId,
  inFavoritesMenu = false,
  removeFromFavorites,
  className = '',
}: RecipeCardProps) => {
  const truncatedTitle = truncate(title, 20);

  const handleRemoval = (e) => {
    e.preventDefault();
    removeFromFavorites(recipeId);
  };

  return (
    <div
      className='w-64 h-60 mr-12 rounded bg-white relative group'
      style={{ minWidth: '300px', maxWidth: '300px', minHeight: '280px' }}
    >
      <div className='flex flex-col h-full w-full'>
        <div className='m-2'>
          <Image
            width={312}
            height={231}
            layout={'intrinsic'}
            src={`https://spoonacular.com/recipeImages/${recipeId}-312x231.jpg`}
            alt={`Recipe: title`}
          />
        </div>
        <div className='mt-auto text-green-600 text-xl font-bold mb-4'>
          <div className='text-center'>{truncatedTitle}</div>
        </div>
      </div>
      {inFavoritesMenu && (
        <div className='min-w-full inset-0 mr-12 rounded absolute bg-black bg-opacity-50 flex flex-col justify-center transition-opacity opacity-0 group-hover:opacity-100'>
          <button className='rounded transition-colors bg-green-500 hover:bg-green-600 mb-4 min-w-3/4 max-w-3/4 px-2 p-3 mx-auto  text-sm font-bold text-white'>
            Go to recipe
          </button>
          <button
            onClick={handleRemoval}
            className='rounded transition-colors bg-red-500 hover:bg-red-600  min-w-3/4 max-w-3/4 px-2 p-3 mx-auto  text-sm font-bold text-white'
          >
            Remove from favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
