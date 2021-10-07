import Module from '../Module';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { FavoritedRecipesType } from '../../../types';

const FavoritesModule = ({ favoritedRecipes }) => {
  const favoritedRecipesList =
    favoritedRecipes &&
    favoritedRecipes.map((recipe: FavoritedRecipesType) => {
      return (
        <RecipeCard
          title={recipe.title}
          recipeId={recipe.recipeId}
          key={recipe.recipeId}
        />
      );
    });

  return (
    <Module>
      <Module.Container>
        <Module.Heading>Your Favorites</Module.Heading>
        <Module.Paragraph>
          Already know the flavor destination, but just need a reminder on the
          directions?
        </Module.Paragraph>
        <Module.Paragraph>
          Add the recipe to your favorites, and you can easily access it from
          here. It’s like a GPS for your tastebuds!
        </Module.Paragraph>
      </Module.Container>
      <Module.Container>
        <div className='flex p-6 bg-gray-200 overflow-x-auto'>
          {favoritedRecipesList}
        </div>
      </Module.Container>
    </Module>
  );
};

export { FavoritesModule };
