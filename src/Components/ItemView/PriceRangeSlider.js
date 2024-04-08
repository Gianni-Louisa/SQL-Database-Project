import React, { useState } from 'react';

const PriceRangeSlider = ({ onRangeSelect }) => {
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(50);

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice') {
      setMinPrice(value);
    } else if (name === 'maxPrice') {
      setMaxPrice(value);
    }
  };

  return (
    <div>
      <label>
        Min Price: ${minPrice}
        <input
          type="range"
          name="minPrice"
          min="0"
          max="100"
          value={minPrice}
          onChange={handleRangeChange}
        />
      </label>
      <br />
      <label>
        Max Price: ${maxPrice}
        <input
          type="range"
          name="maxPrice"
          min="0"
          max="100"
          value={maxPrice}
          onChange={handleRangeChange}
        />
      </label>
      <br />
      <button onClick={() => onRangeSelect(minPrice, maxPrice)}>Fetch Items</button>
    </div>
  );
};

export default PriceRangeSlider;
