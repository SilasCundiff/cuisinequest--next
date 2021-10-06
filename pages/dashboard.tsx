import { useState, useEffect } from 'react';
import { useUserContext } from '@/contexts/UserContext';
import {
  IntolerancesModule,
  DietTypeModule,
  DislikedIngredientsModule,
  FavoritesModule,
} from '@/components/DashboardComponents';

//! Example recipe image url
// https://spoonacular.com/recipeImages/{recipeID}-312x231.jpg

const Dashboard = () => {
  const { diet, intolerances, favoritedRecipes, dislikedIngredients } =
    useUserContext();

  const [dashboardFavorited, setDashboardFavorited] =
    useState(favoritedRecipes);
  const [dashboardIntolerances, setDashboardIntolerances] =
    useState(intolerances);
  const [dashboardDisliked, setDashboardDisliked] =
    useState(dislikedIngredients);
  const [dashboardDiet, setDashboardDiet] = useState(diet);

  useEffect(() => {
    setDashboardFavorited(favoritedRecipes);
  }, [favoritedRecipes]);

  useEffect(() => {
    setDashboardIntolerances(intolerances);
  }, [intolerances]);

  useEffect(() => {
    setDashboardDisliked(dislikedIngredients);
  }, [dislikedIngredients]);

  useEffect(() => {
    setDashboardDiet(diet);
  }, [diet]);

  console.log('dashboardDiet :>> ', dashboardDiet);

  // TODO create state for each module's returned values
  /**
   * E.G: Diet Type module will contain a controlled Select menu with a list of diet types
   * Default value of select will be pulled from the above "diet" state from useUserContext()
   * When the user updates the select by clicking a new option, the state will be updated here
   * Then when the user submits the dashboard form, the values in state here will be pushed to firestore
   */

  return (
    <div className='font-sora container max-w-screen-2xl px-32 mx-auto my-40 '>
      <div className='flex flex-col mx-auto '>
        <FavoritesModule favoritedRecipes={dashboardFavorited} />
        <IntolerancesModule
          setDashboardIntolerances={setDashboardIntolerances}
          dashboardIntolerances={dashboardIntolerances}
        />
        <DislikedIngredientsModule dislikedIngredients={dashboardDisliked} />
        <DietTypeModule
          diet={dashboardDiet}
          setDashboardDiet={setDashboardDiet}
        />
      </div>
    </div>
  );
};

export default Dashboard;
