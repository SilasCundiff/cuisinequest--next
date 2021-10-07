

export type FavoritedRecipesType = {
    recipeId: number;
    title: string;
  }



export type IntoleranceTypes = {
    avoid: boolean;
    name: string;
  }



export type DislikedIngredientsTypes = {
    id: number;
    title: string;
    imageURL: string;
  }



export interface UserData {
  user?: {
    uid: number,
    photoURL: string,
    displayName: string,
  };
  username?: string;
  favoritedRecipes?: Array<FavoritedRecipesType> | undefined;
  intolerances?: Array<IntoleranceTypes> | undefined;
  dislikedIngredients?: Array<DislikedIngredientsTypes> | undefined;
  diet?: string | undefined;
}
