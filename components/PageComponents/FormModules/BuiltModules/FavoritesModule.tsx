import { memo } from 'react';
import Module from '@/components/PageComponents/FormModules/Module';
import RecipeCard from '@/components/ReusableComponents/RecipeCards/RecipeCard';
import { useRemoveFavorite } from '@/lib/hooks';
import { FavoriteRecipeType } from '@/types/types';

const WrappedFavoritesModule = () => {
  const { userFavorites, removeFromFavorites } = useRemoveFavorite();

  const favoriteRecipesList =
    userFavorites &&
    userFavorites.length > 0 &&
    userFavorites.map((recipe: FavoriteRecipeType) => {
      return (
        <RecipeCard
          title={recipe.title}
          recipeId={recipe.recipeId}
          key={recipe.recipeId}
          inFavoritesMenu
          removeFromFavorites={removeFromFavorites}
        />
      );
    });

  return (
    <Module>
      <Module.Container>
        <Module.Heading>Your Favorites</Module.Heading>
        <Module.Paragraph>
          Already know the flavor destination, but just need a reminder on the directions?
        </Module.Paragraph>
        <Module.Paragraph>
          Add the recipe to your favorites, and you can easily access it from here. It’s like a GPS for your taste buds!
        </Module.Paragraph>
      </Module.Container>
      <Module.Container>
        {userFavorites && userFavorites.length > 0 && (
          <div className='flex p-6 bg-gray-100 h-80 rounded overflow-x-auto'>{favoriteRecipesList}</div>
        )}
        {!userFavorites && (
          <span className='bg-gray-100 h-96 rounded flex items-center justify-center text-gray-600 text-2xl font-light'>
            Your favorite recipes will show up here once you add some!
          </span>
        )}
      </Module.Container>
    </Module>
  );
};
const FavoritesModule = memo(WrappedFavoritesModule);
export { FavoritesModule };
