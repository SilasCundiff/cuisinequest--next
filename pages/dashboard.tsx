import { useEffect, useState } from 'react';
import { useUserContext } from '@/contexts/UserContext';
import { useUserData } from '../lib/hooks';
import {
  IntoleranceTypes,
  FavoritedRecipesType,
  DislikedIngredientsTypes,
} from '../types';
//! Example ingredient url
// https://spoonacular.com/cdn/ingredients_100x100/{ingredientName}.jpg

//! Example recipe image url
// https://spoonacular.com/recipeImages/{recipeID}-312x231.jpg

const Dashboard = () => {
  const {
    username,
    diet,
    intolerances,
    favoritedRecipes,
    dislikedIngredients,
  } = useUserContext();

  const intoleranceList =
    intolerances &&
    intolerances.map((intolerance: IntoleranceTypes) => (
      <li
        className={`${intolerance.avoid ? 'text-red-500' : 'text-gray-700'}`}
        key={intolerance.name}
      >
        {intolerance.name}
      </li>
    ));

  const favoritedRecipesList =
    favoritedRecipes &&
    favoritedRecipes.map((recipe: FavoritedRecipesType) => {
      return (
        <div
          className='w-48 h-48 bg-green-200 my-auto mx-8'
          key={recipe.recipeId}
        >
          {recipe.title}
        </div>
      );
    });

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
    <div className='container mx-auto'>
      <h1 className='text-2xl'>This is the dashboard Page</h1>
      <div className='container flex flex-col mx-auto'>
        <div className='text-6xl text-green-400 font-bold p-6'>{username}</div>
        <div className='list-none flex p-6'>{favoritedRecipesList}</div>
        <div className=' list-none  p-6'>
          <h2 className='text-green-400 font-medium text-2xl'>intolerances:</h2>
          <div className='grid grid-cols-3 bg-gray-200'>{intoleranceList}</div>
        </div>
        <div className='bg-gray-50 list-none p-6'>
          <h2 className='text-green-400 font-medium text-2xl'>
            Disliked ingredients:
          </h2>
          <div className='container flex'> {dislikedIngredientList}</div>
        </div>
        <div className='p-6 text-green-400 font-medium text-2xl'>
          Diet Type: {diet}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
