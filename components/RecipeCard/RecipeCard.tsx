import Link from 'next/link';

import { truncate } from '@/lib/helpers';
interface RecipeCardProps {
  title: string;
  recipeId: number;
}

const apiKey = process.env.NEXT_PUBLIC_RECIPES_API_KEY;

const RecipeCard = ({ title, recipeId }: RecipeCardProps) => {
  const truncatedTitle = truncate(title, 20);

  return (
    <div
      className='w-64 h-60  mr-12 rounded bg-white'
      style={{ minWidth: '250px' }}
    >
      <Link
        passHref
        href={`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&information`}
      >
        <div className='flex flex-col h-full w-full'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='m-2'
            src={`https://spoonacular.com/recipeImages/${recipeId}-312x231.jpg`}
            alt={`Recipe: title`}
          />
          <div className='mt-auto text-green-600 text-xl font-bold mb-3'>
            <div className='text-center'>{truncatedTitle}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
