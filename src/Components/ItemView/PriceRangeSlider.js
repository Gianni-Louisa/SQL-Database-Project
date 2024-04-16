import React, { useState, useEffect } from 'react';

const PriceRangeSlider = ({ onRangeSelect, min, max, units }) => {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'min') {
      setMinPrice(Number(value));
    } else if (name === 'max') {
      setMaxPrice(Number(value));
    }
  };
  useEffect(() => {
    onRangeSelect(minPrice, maxPrice);
  }, [maxPrice,minPrice]); // Fetch items whenever minRating changes

  return (
    <div>
      <label>
        Min {units}{minPrice}
        <input
          type="range"
          name="min"
          min={min}
          max={max}
          value={minPrice}
          onChange={handleRangeChange}
        />
      </label>
      <br />
      <label>
        Max {units} {maxPrice}
        <input
          type="range"
          name="max"
          min={min}
          max={max}
          value={maxPrice}
          onChange={handleRangeChange}
        />
      </label>
      <br />
      
    </div>
  );
};

export default PriceRangeSlider;
