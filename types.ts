

export type FavoriteRecipeType = {
    recipeId: number;
    title: string;
  }



export type IntoleranceTypes = {
    avoid: boolean;
    name: string;
  }



export type DislikedIngredientsTypes = {
    id?: number;
    name?: string;
    image?: string;
  }



export interface UserData {
  user?: {
    uid: number,
    photoURL: string,
    displayName: string,
  };
  username?: string;
  favoriteRecipes?: Array<FavoriteRecipeType> | undefined;
  intolerance?: Array<IntoleranceTypes> | undefined;
  dislikedIngredients?: Array<DislikedIngredientsTypes> | undefined;
  diet?: string | undefined;
  setDiet?: (diet: string) => void;
  setIntolerance?: (intolerance: Array<IntoleranceTypes>) => void;


}
