import DashboardModule from './DashboardModule';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { FavoritedRecipesType } from '../../types';

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
    <DashboardModule>
      <DashboardModule.Container>
        <DashboardModule.Heading>Your Favorites</DashboardModule.Heading>
        <DashboardModule.Paragraph>
          Already know the flavor destination, but just need a reminder on the
          directions?
        </DashboardModule.Paragraph>
        <DashboardModule.Paragraph>
          Add the recipe to your favorites, and you can easily access it from
          here. It’s like a GPS for your tastebuds!
        </DashboardModule.Paragraph>
      </DashboardModule.Container>
      <DashboardModule.Container>
        <div className='flex p-6 bg-gray-200 overflow-x-auto'>
          {favoritedRecipesList}
        </div>
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { FavoritesModule };
