import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('mhs_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });
  const { user } = useAuth();
  const { success } = useToast();

  useEffect(() => {
    localStorage.setItem('mhs_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync with backend if user logs in
  useEffect(() => {
    if (user) {
      const fetchBackendWishlist = async () => {
        try {
          const { data } = await api.get('/wishlist');
          if (data && Array.isArray(data)) {
            // Merge with local
            setWishlist(data);
          }
        } catch (err) {
          console.error('Failed to sync wishlist with backend:', err);
        }
      };
      fetchBackendWishlist();
    }
  }, [user]);

  const toggleWishlist = async (product) => {
    const exists = wishlist.some((item) => (item._id || item) === (product._id || product));
    let updated;

    if (exists) {
      updated = wishlist.filter((item) => (item._id || item) !== (product._id || product));
      setWishlist(updated);
      success(`Removed ${product.name || 'item'} from wishlist.`);
    } else {
      updated = [...wishlist, product];
      setWishlist(updated);
      success(`Added ${product.name || 'item'} to wishlist.`);
    }

    if (user) {
      try {
        await api.post('/wishlist/toggle', { productId: product._id || product });
      } catch (err) {
        console.error('Error persisting wishlist to server:', err);
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => (item._id || item) === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
