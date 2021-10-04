import { useState, useEffect } from 'react';
import { useUserContext } from '@/contexts/UserContext';
import {
  IntolerancesModule,
  DietTypeModule,
  DislikedIngredientsModule,
  FavoritesModule,
} from '@/components/DashboardComponents';

//! Example ingredient url
// https://spoonacular.com/cdn/ingredients_100x100/{ingredientName}.jpg

//! Example recipe image url
// https://spoonacular.com/recipeImages/{recipeID}-312x231.jpg

const Dashboard = () => {
  const { diet, intolerances, favoritedRecipes, dislikedIngredients } =
    useUserContext();
  // TODO create state for each module's returned values
  /**
   * E.G: Diet Type module will contain a controlled Select menu with a list of diet types
   * Default value of select will be pulled from the above "diet" state from useUserContext()
   * When the user updates the select by clicking a new option, the state will be updated here
   * Then when the user submits the dashboard form, the values in state here will be pushed to firestore
   */

  return (
    <div className='container mx-auto p-6 bg-red-500'>
      <div className='container flex flex-col mx-auto'>
        <FavoritesModule favoritedRecipes={favoritedRecipes} />
        <IntolerancesModule intolerances={intolerances} />
        <DislikedIngredientsModule dislikedIngredients={dislikedIngredients} />
        <DietTypeModule diet={diet} />
      </div>
    </div>
  );
};

export default Dashboard;
