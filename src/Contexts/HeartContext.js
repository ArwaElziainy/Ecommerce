import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the wishlist context
export const WishlistContext = createContext();

// Create the WishlistProvider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch the wishlist from the API
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist');
        setWishlist(response.data);
        console.log(response.data);
    } catch (error) {
      console.error('Error occurred while fetching wishlist:', error);
    }
  };

  // Add item to the wishlist
  const addToWishlist = async (itemId) => {
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist/', { itemId });
      setWishlist([...wishlist, itemId]);
    } catch (error) {
      console.error('Error occurred while adding to wishlist:', error);
    }
  };

  // Remove item from the wishlist
  const removeFromWishlist = async (itemId) => {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`);
      setWishlist(wishlist.filter((item) => item !== itemId));
    } catch (error) {
      console.error('Error occurred while removing from wishlist:', error);
    }
  };

  // Check if item is in the wishlist
  const isInWishlist = (itemId) => {
    return wishlist.includes(itemId);
  };

  // Provide the wishlist state and actions to the children components
  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};