import { Category } from '../types/types';

export const mockup_categories: Category[] = [
  {
    id: 15,
    name: 'Italian',
    categoryImage: 'https://i.imgur.com/d6QvFgx.png',
    categoryType: {
      id: 1,
      name: 'cuisine',
    },
  },
  {
    id: 17,
    name: 'American',
    categoryImage: 'https://i.imgur.com/u0Ovrfn.png',
    categoryType: {
      id: 1,
      name: 'cuisine',
    },
  },
  {
    id: 37,
    name: 'Asian',
    categoryImage: 'https://i.imgur.com/OgkJzYV.png',
    categoryType: {
      id: 1,
      name: 'cuisine',
    },
  },
];

export const mockup_name_categories: Category[] = [
  {
    id: 1,
    name: '✅ Easy'  
  },
  {
    id: 2,
    name: '⚡ Quick'
  },
  {
    id: 3,
    name: '🍲 Breakfast'
  },
  {
    id: 4,
    name: '🍝 Dinner'
  },
  {
    id: 5,
    name: '🌿 Vegan'
  }
];
