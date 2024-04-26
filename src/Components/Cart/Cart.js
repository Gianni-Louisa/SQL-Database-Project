import React, { useState, useEffect } from 'react';
import '../ItemView/ItemsView.css';
import ItemList from '../ItemView/ItemList';

// Mock data - this would typically be fetched from a database

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart items from a database or backend (here we're using mock data)
    
    useEffect(() => {
          fetch("http://localhost:3001/cart", {
            credentials: "include",
          })
            .then(response => response.json())
            .then(setCartItems)
            .catch(console.error);
        
      }, []);

    return (
       

        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            <div className="items-grid">
                <ItemList items={cartItems} screen={true} />
            </div>
        </div>

    );
}

export default Cart;
