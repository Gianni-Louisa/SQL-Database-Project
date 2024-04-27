import React, { useState, useEffect } from 'react';
import '../ItemView/ItemsView.css';
import ItemList from '../ItemView/ItemList';
export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  
  // Method to fetch items from the cart
  const fetchCartItems = () => {
      fetch("http://localhost:3001/cart", {
          credentials: "include",
      })
      .then(response => response.json())
      .then(setCartItems)
      .catch(console.error);
  };

  // Initial fetch on component mount
  useEffect(() => {
      fetchCartItems();
  }, []);

  return (
      <div className="cart-container">
          <h2>Your Shopping Cart</h2>
          <div className="items-grid">
              <ItemList items={cartItems} screen={'delete'} onItemDeleted={fetchCartItems}/>
          </div>
      </div>
  );
}
export default Cart;