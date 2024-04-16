import React, { useState, useEffect } from 'react';

const SellersView = () => {
  const [items, setItems] = useState([]);
  const [minRating, setMinRating] = useState(1); // Assuming the rating starts at 1

  const fetchItemsInRangeRating = (min) => {
    fetch(`http://localhost:3001/items/seller-range?minRating=${min}&maxRating=5`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(setItems)
      .catch(console.error);
  };

  useEffect(() => {
    fetchItemsInRangeRating(minRating);
  }, [minRating]); // Fetch items whenever minRating changes

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      <h2 style={{ color: "#333" }}>Sellers Rating:</h2>
      <div>
        <label htmlFor="rating-slider">Minimum Rating: {minRating}</label>
        <input
          id="rating-slider"
          type="range"
          min="1"
          max="5"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          step="0.1"
          className="slider"
        />
      </div>
      <div className="item-list-container">
        {items.map((item) => (
          <div key={item.SellerID} className="item-card">
            <div className="item-name">{item.Name}</div>
            <div className="item-details">Rating: {item.Rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellersView;
