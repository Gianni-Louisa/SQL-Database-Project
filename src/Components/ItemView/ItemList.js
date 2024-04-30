import React from 'react';
import './ItemList.css'; // Ensure the CSS file is in the same directory


const ItemList = ({ items, seller, screen, onItemDeleted }) => {
  const AddToCart = async (itemID, quantity) => {
    try {
      const response = await fetch('https://nodejs-server-447-d8a11fc1af75.herokuapp.com/cart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
              items: {
                  ItemID: itemID,
                  Quantity: 1,
              }
          }),
      });

      console.log(response);

      if (response.ok) {
          alert("Item added to cart successfully!");
      } else {
          const errorText = await response.text();  // Get more error details if not successful
          throw new Error(errorText || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert(error.message);
    }
  };

  const RemoveFromCart = async (itemID) => {
    try {
      const response = await fetch(`https://nodejs-server-447-d8a11fc1af75.herokuapp.com/cart/${itemID}`, {
          method: 'DELETE',
          credentials: 'include',
      });

      console.log(response);

      if (response.ok) {
          onItemDeleted();
      } else {
          const errorText = await response.text();  // Get more error details if not successful
          throw new Error(errorText || 'Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert(error.message);
    }
  }

  return (
    <div className="item-list">
      {items.map(item => (
        <div key={item.ItemID} className="item">
          <img
            src={require(`./itempictures/${item.Name}.png`)} // Ensure path is correct
            alt={item.Name}
            className="item-image"
          />
          <div className="item-details">
            <h3 className="item-name">{item.Name}</h3>
            <p className="item-price">Price: ${item.Price.toFixed(2)}</p>
            <p
                          hidden={screen === 'add'} 
                          className="item-quantity">Quantity: {1}</p>
            {item.Seller_Name && <p className="item-seller">Seller: {item.Seller_Name}</p>}
            {item.Seller_Name && <p className="item-seller">Rating: {seller.Rating}</p>}
            <button 
              hidden={screen === 'delete'} 
              className="add-to-cart" 
              onClick={() => AddToCart(item.ItemID, 1)} // Example assumes you want to add 1 quantity
            >
              Add to Cart
            </button>
            <button 
              hidden={screen === 'add'} 
              className="remove-from-cart" 
              onClick={() => RemoveFromCart(item.CartID)} // Example assumes you want to remove the item
            >
              REMOVE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

  export default ItemList;