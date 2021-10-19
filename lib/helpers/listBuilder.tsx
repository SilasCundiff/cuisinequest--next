import { truncate } from '@/lib/helpers/';
import { DislikedIngredientsTypes } from '@/types/';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

export const listBuilder = (list: Array<DislikedIngredientsTypes>, moveFunc) => {
  if (list && list.length > 0) {
    return list.map((ingredient: DislikedIngredientsTypes, index) => {
      return (
        <div
          className='flex-shrink-0 flex-grow-0 min-w-1/6 text-center py-4 px-4 bg-white rounded text-gray-50 text-xl mr-2 my-2 w-56'
          style={{ maxWidth: '200px', maxHeight: '180px', minWidth: '200px', minHeight: '180px' }}
          key={uuidv4()}
          onClick={() => {
            if (moveFunc) moveFunc(index);
          }}
        >
          <Image
            width={100}
            height={100}
            layout='fixed'
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
            alt={`Visual representation of ${ingredient.name}`}
          />
          <div className='text-green-900 text-2xl w-full font-light mt-4 h-8 '>
            {ingredient.name ? truncate(ingredient.name, 13) : null}
          </div>
        </div>
      );
    });
  }
};
