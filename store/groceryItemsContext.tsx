import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoreData, storeData } from './asyncStore';


export type GroceryItem = {
  id: string;
  title: string;
  quantity: number;
  unit: string;
  icon: string;
  completed: boolean;
};

export const GROCERY_ITEMS_KEY = 'groceryItems';


// Type definition for the context state
interface GroceryContextType {
  groceryItems: GroceryItem[];
  saveGroceryItems: (items: GroceryItem[]) => Promise<void>;
  loading: boolean;
}

// Creating the context with undefined initial value
const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

export const GroceryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStoreData<GroceryItem[]>(GROCERY_ITEMS_KEY).then(data => {
      if (data) {
        setGroceryItems(data);
      }
    }).finally(() => setLoading(false));
  }, []);

  const saveGroceryItems = useCallback((items: GroceryItem[]) => {
    setGroceryItems(items);
    return storeData(GROCERY_ITEMS_KEY, items);
  }, []);

  return (
    <GroceryContext.Provider value={{ groceryItems, saveGroceryItems, loading }}>
      {children}
    </GroceryContext.Provider>
  );
};

// Custom hook to use the grocery context
export const useGroceryContext = () => {
  const context = useContext(GroceryContext);
  if (context === undefined) {
    throw new Error('useGroceryContext must be used within a GroceryProvider');
  }
  return context;
};
