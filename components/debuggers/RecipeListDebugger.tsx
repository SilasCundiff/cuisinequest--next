import { useRecipeListContext } from '@/contexts/RecipeListContext';

export const RecipeListDebugger = () => {
  const { recipeList } = useRecipeListContext();
  const list = recipeList.map((recipe) => (
    <li key={recipe.id}>{recipe.title}</li>
  ));
  return (
    <div className={`bg-green-400 mt-2 rounded-lg flex`}>
      <span className={`text-gray-900 mx-4 my-auto`}>Recipe Titles:</span>
      <ul className='rounded bg-green-50 text-gray-900 p-2'>{list}</ul>
    </div>
  );
};
