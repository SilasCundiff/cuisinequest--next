import Module from '../Module';
import { DislikedIngredientsTypes } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//! Example ingredient url
// https://spoonacular.com/cdn/ingredients_100x100/{ingredientName}.jpg
const DislikedIngredientsModule = ({ dislikedIngredients }) => {
  const dislikedIngredientList =
    dislikedIngredients &&
    dislikedIngredients.map((ingredient: DislikedIngredientsTypes) => {
      return (
        <li
          className='inline-block text-center py-1 px-4 text-gray-50 text-xl mr-2 my-2'
          style={{ maxWidth: '160px' }}
          key={ingredient.id}
        >
          <img
            className='m-auto'
            style={{ maxHeight: '100px', maxWidth: '100px' }}
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.imageURL}`}
            alt={`Visual representation of ${ingredient.title}`}
          />
          <div className='text-green-900 font-extralight'>
            {ingredient.title}
          </div>
        </li>
      );
    });

  return (
    <Module>
      <Module.Container>
        <Module.Heading>Disliked Ingredients</Module.Heading>
        <Module.Paragraph>
          Don’t like an ingredient? Have a burning hatred of tomatoes? Just need
          a break from Bananas?
        </Module.Paragraph>
        <Module.Paragraph>
          Add ingredients to your disliked list and you can filter your searches
          to exclude them.
        </Module.Paragraph>
      </Module.Container>
      <Module.Container>
        <div className='flex flex-wrap'>
          <form
            className='min-w-full mb-5 border-gray-400 border-2 rounded-2xl focus-within:border-green-500'
            style={{ minWidth: '100%', width: '100%' }}
          >
            <div className='w-full focus-within:text-green-500 text-gray-700 text-2xl font-light tracking-widest px-2 py-1 rounded relative'>
              <button className='absolute hover:bg-gray-200 rounded p-4 focus:outline-none w-10 h-10 flex items-center justify-center'>
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                className='text-center  w-full h-10  focus:outline-none'
                type='text'
                placeholder='Banish the Brussels Sprouts!'
              />
            </div>
          </form>
          <div
            className='h-72 flex-auto  p-4 bg-gray-100 mr-5'
            style={{ minWidth: '45%', width: '49%' }}
          >
            <h3 className='text-md text-green-900 tracking-wide mb-4'>
              Search results for ingredients *term*.
            </h3>
          </div>
          <div
            className='h-72 bg-gray-100 flex-auto p-4'
            style={{ minWidth: '45%', width: '49%' }}
          >
            <h3 className='text-md text-green-900 tracking-wide mb-4'>
              Your disliked ingredients.
            </h3>
            {dislikedIngredientList}
          </div>
        </div>
      </Module.Container>
    </Module>
  );
};

export { DislikedIngredientsModule };
