export type UserType = {
  name: string;
  category: string;
  savedRecipes: string[];
};

export type userContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export type RecepieFetchTypes = {
  endpoints: string;
};

export type CategoryType = {
  map(
    arg0: (meal: CategoryType) => import('react').JSX.Element
  ): import('react').ReactNode;
  strCategory: string;
  idCategory: number;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type MealCardTypes = {
  name: string;
  id: string;
  image: string;
};

export type RecipeCardType = {
  map(
    arg0: (meal: RecipeType) => import('react').JSX.Element
  ): import('react').ReactNode;
  name: string;
  id: string;
  image: string;
  area: string;
  category: string;
  video?: string;
  instructions: string;
  ingredients?: string[];
  measure?: string[];
};

export type RecipesCardType = {
  name: string;
  area: string;
  category: string;
  image: string;
  video: string;
  instructions: string;
};

export type RecipeType = {
  map(
    arg0: (meal: RecipeType) => import('react').JSX.Element
  ): import('react').ReactNode;
  strMeal: string;
  idMeal: string;
  strMealThumb: string;
  strArea?: string;
  strInstructions?: string;
  strIngredient?: string[];
  strMeasure?: string[];
  strYoutube?: string;
  strTags?: string | string[];
};
