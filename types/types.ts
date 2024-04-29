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

export type Category = {
  id: number;
  name: string;
  categoryImage?: string;
  categoryType?: CategoryType;
}

export type CategoryType = {
  id: number;
  name: string;
};
