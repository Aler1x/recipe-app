import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import useFetch from '../hooks/useFetch';
import { Recipe } from '../types/types';
import { API_URL } from '../constants';
import { getStoreData } from './asyncStore';

interface FavesContextType {
  faves: number[];
  addFave: (id: number) => void;
  removeFave: (id: number) => void;
  favesRecipes: Recipe[];
}

// Creating the context with undefined initial value
const FavesContext = createContext<FavesContextType | undefined>(undefined);

// Custom hook to use the grocery context
export const useFavesContext = () => {
  const context = useContext(FavesContext);
  if (context === undefined) {
    throw new Error('useGroceryContext must be used within a GroceryProvider');
  }
  return context;
};

export const FavesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [faves, setFaves] = useState<number[]>([]);
  const [favesRecipes, setFavesRecipes] = useState<Recipe[]>([]);
  const { data: initialData } = useFetch<{
    id: number;
    name: string;
    recipes: Recipe[];
  }>('/user/lists/faves');

  useEffect(() => {
    if (initialData) {
      setFaves(initialData.recipes.map(recipe => recipe.id));
      setFavesRecipes(initialData.recipes);
    }
  }, [initialData]);

  const addFave = useCallback((id: number) => {
    console.log('addFave', id);
    setFaves(prev => [...prev, id]);
  }, []);

  const removeFave = useCallback((id: number) => {
    console.log('removeFave', id);
    setFaves(prev => prev.filter(faveId => faveId !== id));
  }, []);

  useEffect(() => {
    if (faves.length > 0) {
      getStoreData('jwtToken').then(token => {
        fetch(`${API_URL}/user/lists`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: 'Faves', recipeIds: faves }),
        }).then(response => {
          if (!response.ok) {
            console.log('Error then faves: ', response.status);
          }
        }).catch(error => {
          console.error('Error catch faves: ', error);
        });
      });
    }
  }, [faves, setFavesRecipes, setFaves]);

  return (
    <FavesContext.Provider value={{ faves, addFave, removeFave, favesRecipes }}>
      {children}
    </FavesContext.Provider>
  );
};
