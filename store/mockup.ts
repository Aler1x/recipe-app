const recipe_full = {
  id: 1,
  title: 'Recipe',
  categories: [
    {
      id: 1,
      name: 'Category',
    },
  ],
  image: 'https://via.placeholder.com/150',
  isSaved: true,
  calories: 100,
  readyInMinutes: 10,
  pricePerServing: 1,
  servings: 1,
  products: [
    {
      id: 1,
      original: '1 cup of sugar',
      amount: 1,
      unit: {
        id: 1,
        name: 'cup',
        isMetric: false,
      },
      product: {
        id: 1,
        aisle: 'Aisle',
        name: 'Sugar',
      },
    },
  ],
  
};