import DashboardModule from './DashboardModule';
import { DislikedIngredientsTypes } from '../../types';

const DislikedIngredientsModule = ({ dislikedIngredients }) => {
  const dislikedIngredientList =
    dislikedIngredients &&
    dislikedIngredients.map((ingredient: DislikedIngredientsTypes) => {
      return (
        <li
          className='bg-green-500 inline-block py-1 px-4 text-gray-50 text-xl rounded-full mr-2 my-2'
          key={ingredient.id}
        >
          {ingredient.title}
        </li>
      );
    });

  return (
    <DashboardModule>
      <DashboardModule.Container>
        <DashboardModule.Heading>Disliked Ingredients</DashboardModule.Heading>
        <DashboardModule.Paragraph>
          Don’t like an ingredient? Have a burning hatred of tomatoes? Just need
          a break from Bananas? Just add ingredients to your disliked list and
          you can filter your searches to exclude them.
        </DashboardModule.Paragraph>
      </DashboardModule.Container>
      <DashboardModule.Container>
        <div>{dislikedIngredientList}</div>
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { DislikedIngredientsModule };
