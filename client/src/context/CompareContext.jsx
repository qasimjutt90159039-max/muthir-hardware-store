import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    const saved = localStorage.getItem('mhs_compare');
    return saved ? JSON.parse(saved) : [];
  });
  const { success, warning } = useToast();

  useEffect(() => {
    localStorage.setItem('mhs_compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product) => {
    if (compareItems.some((item) => item._id === product._id)) {
      warning(`${product.name} is already in comparison list.`);
      return;
    }

    if (compareItems.length >= 4) {
      warning('You can compare a maximum of 4 tools at once. Remove one to add another.');
      return;
    }

    setCompareItems((prev) => [...prev, product]);
    success(`Added ${product.name} to tool comparison.`);
  };

  const removeFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((item) => item._id !== productId));
    success('Removed tool from comparison.');
  };

  const clearCompare = () => {
    setCompareItems([]);
    localStorage.removeItem('mhs_compare');
  };

  const isInCompare = (productId) => {
    return compareItems.some((item) => item._id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        compareCount: compareItems.length,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
