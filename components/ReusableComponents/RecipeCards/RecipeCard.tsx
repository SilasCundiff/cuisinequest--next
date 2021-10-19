import { useState, useEffect, memo } from 'react';
import { useUserContext } from '@/contexts/UserContext';
import { useRemoveFavorite, useAddFavorite } from '@/lib/hooks/';
import { truncate } from '@/lib/helpers/';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaLink } from 'react-icons/fa';

interface RecipeCardProps {
  title: string;
  recipeId: number;
  inFavoritesMenu?: boolean;
  removeFromFavorites?: (recipeId: number) => void;
  addToFavorites?: (recipeId: number, title: string) => void;
  className?: string;
}

const WrappedRecipeCard = ({ title, recipeId, inFavoritesMenu = false, className = '' }: RecipeCardProps) => {
  const { user, username, favoriteRecipes } = useUserContext();
  const { addToFavorites } = useAddFavorite();
  const { removeFromFavorites } = useRemoveFavorite();
  const [recipeFavorited, setRecipeFavorited] = useState(false);
  const truncatedTitle = truncate(title, 20);

  const handleFavorite = () => {
    if (user && username) {
      if (recipeFavorited) {
        return removeFromFavorites(recipeId);
      }
      if (!recipeFavorited) {
        return addToFavorites(recipeId, title);
      }
    }
  };

  useEffect(() => {
    const recipeInFavorites =
      favoriteRecipes &&
      favoriteRecipes.length > 0 &&
      favoriteRecipes.some((recipe) => {
        return recipe.recipeId === recipeId;
      });
    setRecipeFavorited(recipeInFavorites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteRecipes]);
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
        <div className='min-w-full inset-0 mr-12 rounded absolute bg-green-50 bg-opacity-70 justify-center transition-opacity opacity-0 group-hover:opacity-100 flex'>
          <div className='m-auto flex min-w-full'>
            <button className='text-6xl text-green-900 my-auto mx-auto hover:text-green-800 transition-colors'>
              <Link passHref href={`/recipes/${recipeId}`}>
                <FaLink />
              </Link>
            </button>
            {user && username && (
              <button
                onClick={handleFavorite}
                className='text-7xl text-green-500 my-auto mx-auto hover:text-green-400 transition-colors'
              >
                {recipeFavorited ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const RecipeCard = memo(WrappedRecipeCard);

export default RecipeCard;
