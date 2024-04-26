import React from 'react';
import './ItemList.css'; // Ensure the CSS file is in the same directory

const ItemList = ({ items, seller, screen }) => {
  const AddToCart = async (itemID, quantity) => {
    try {
      const response = await fetch('http://localhost:3001/cart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
              items: {
                  ItemID: itemID,
                  Quantity: quantity,
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
            <p className="item-quantity">Quantity: {item.Quantity}</p>
            {item.Seller_Name && <p className="item-seller">Seller: {item.Seller_Name}</p>}
            {item.Seller_Name && <p className="item-seller">Rating: {seller.Rating}</p>}
            <button 
              hidden={screen} 
              className="add-to-cart" 
              onClick={() => AddToCart(item.ItemID, 1)} // Example assumes you want to add 1 quantity
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

  export default ItemList;