// for home screen (for recipe screen need more fields)
export type Recipe = {
  id: number;
  title: string;
  categories: Category[];
  image?: string;
  isSaved?: boolean; // filled heart icon
  calories: number;
  time: number;
  price: number;
  servings: number;
}

export type RootStackParamList = {
  Main: undefined;
  Recipe: { id: number };
  Login: undefined;
};

// for recipe screen
export type RecipeFull = Recipe & {
  products: Ingredient[];
  steps: RecipeStep[];
}

export type RecipeStep = {
  id: number; // for order steps
  description: string;
}

export type Product = {
  id: number;
  aisle: string;
  name: string;
}

export type Unit = {
  id: number;
  name: string;
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
