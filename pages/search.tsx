import { useRecipeListContext } from '@/contexts/RecipeListContext';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { v4 as uuidv4 } from 'uuid';
import Container from '@/components/Containers/Container';
import { useSearchContext } from '@/contexts/SearchContext';
import Loader from '@/components/Loader';

const Search = () => {
  const { currentRecipeList, loadingRecipes } = useRecipeListContext();
  const { term } = useSearchContext();
  const recipeList =
    currentRecipeList &&
    currentRecipeList.results.map((recipe: { id: number; title: string }) => {
      const { id, title } = recipe;
      return <RecipeCard className='bg-green-500' recipeId={id} title={title} key={uuidv4()} />;
    });

  return (
    <div className='bg-gray-50'>
      {!recipeList && loadingRecipes && (
        <Container>
          <Loader />
        </Container>
      )}
      {recipeList && (
        <Container className='bg-gray-50 rounded-md max-w-66 p-10'>
          <div className='w-full h-12 -ml-20 text-2xl font-light text-green-500'>On a Quest for {term}!</div>
          <div className='grid grid-cols-3 m-w-1/2 gap-4 justify-items-center'>{recipeList}</div>
        </Container>
      )}
    </div>
  );
};

export default Search;
