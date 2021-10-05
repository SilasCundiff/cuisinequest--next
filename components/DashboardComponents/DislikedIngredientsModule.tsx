import DashboardModule from './DashboardModule';
import { DislikedIngredientsTypes } from '../../types';
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
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.title}s.jpg`}
            alt={`Visual representation of ${ingredient.title}`}
          />
          <div className='text-green-900 font-extralight'>
            {ingredient.title}
          </div>
        </li>
      );
    });

  return (
    <DashboardModule>
      <DashboardModule.Container>
        <DashboardModule.Heading>Disliked Ingredients</DashboardModule.Heading>
        <DashboardModule.Paragraph>
          Don’t like an ingredient? Have a burning hatred of tomatoes? Just need
          a break from Bananas?
        </DashboardModule.Paragraph>
        <DashboardModule.Paragraph>
          Add ingredients to your disliked list and you can filter your searches
          to exclude them.
        </DashboardModule.Paragraph>
      </DashboardModule.Container>
      <DashboardModule.Container>
        <div className='flex flex-wrap'>
          <form className='min-w-full mb-5'>
            <input
              className='w-1/2 bg-gray-100 text-2xl font-light tracking-widest px-2 py-1 rounded '
              type='text'
              placeholder='Banish the Brussels Sprouts!'
            />
          </form>
          <div
            className='h-72 flex-auto  p-4 bg-gray-100 mr-5'
            style={{ minWidth: '50%' }}
          >
            <h3 className='text-md text-green-900 tracking-wide mb-4'>
              Search results for ingredients *term*.
            </h3>
          </div>
          <div
            className='h-72 bg-gray-100 flex-auto p-4'
            style={{ minWidth: '45%' }}
          >
            <h3 className='text-md text-green-900 tracking-wide mb-4'>
              Your disliked ingredients.
            </h3>
            {dislikedIngredientList}
          </div>
        </div>
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { DislikedIngredientsModule };
