import React from 'react';
import './ItemList.css'; // Ensure the CSS file is in the same directory

const ItemList = ({ items }) => {
  return (
    <div className="item-list">
      {items.map(item => (
        <div key={item.ItemID} className="item">
          <img src={item.imageUrl || '/placeholder-image.png'} alt="Item" className="item-image" />
          <div className="item-details">
            <h3 className="item-name">{item.Name}</h3>
            <p className="item-price">Price: ${item.Price.toFixed(2)}</p>
            <p className="item-quantity">Quantity: {item.Quantity}</p>
            {item.Seller_Name && <p className="item-seller">Seller: {item.Seller_Name}</p>}
            {item.Seller_Name && <p className="item-seller">Rating: {item.Rating}</p>}

          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
