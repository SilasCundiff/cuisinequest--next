import Container from '@/components/ReusableComponents/Containers/Container';
import Loader from '@/components/ReusableComponents/Loaders/Loader';
import RecipeCard from '@/components/ReusableComponents/RecipeCards/RecipeCard';
import { useRecipeListContext } from '@/contexts/RecipeListContext';
import { useSearchContext } from '@/contexts/SearchContext';
import { v4 as uuidv4 } from 'uuid';

const Search = () => {
  const { currentRecipeList, loadingRecipes } = useRecipeListContext();

  const { term } = useSearchContext();
  const recipeList =
    currentRecipeList &&
    currentRecipeList.results.map((recipe: { id: number; title: string }) => {
      const { id, title } = recipe;

      return <RecipeCard className='bg-green-500' recipeId={id} title={title} key={uuidv4()} inFavoritesMenu />;
    });

  return (
    <div className='bg-gray-50'>
      {!recipeList && loadingRecipes && (
        <Container className='flex justify-center align-center mt-80'>
          <Loader />
        </Container>
      )}
      {recipeList && !loadingRecipes && (
        <Container className='bg-gray-50 rounded-md max-w-66 p-10'>
          <div className='w-full h-12 -ml-20 text-2xl font-light text-green-500'>On a Quest for {term}!</div>
          <div className='grid grid-cols-3 m-w-1/2 gap-4 justify-items-center'>{recipeList}</div>
        </Container>
      )}
    </div>
  );
};

export default Search;
