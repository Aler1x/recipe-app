// for home screen (for recipe screen need more fields)
export type Recipe = {
  id: number;
  title: string;
  categories: Category[];
  image?: string;
  isSaved?: boolean; // filled heart icon
  calories: number;
  readyInMinutes: number;
  pricePerServing?: number;
  servings?: number;
}

// for recipe screen
export type RecipeFull = Recipe & {
  products: Ingredient[];
  recipeSteps: RecipeStep[];
}

export type RecipeStep = {
  id: number;
  description: string;
  recipe: Recipe;
}

export type Product = {
  id: number;
  aisle: string;
  name: number;
}

export type Unit = {
  id: number;
  name: string;
  isMetric: boolean;
}

export type Ingredient = {
  id: number;
  original: string;
  amount: number;
  unit: Unit,
  product: Product;
}

export type Category = {
  id: number;
  name: string;
  image?: string;
  categoryType?: CategoryType;
}

export type CategoryType = {
  id: number;
  name: string;
};
