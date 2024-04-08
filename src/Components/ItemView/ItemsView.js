import React, { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider'; // Your slider component
import ItemList from './ItemList'; // Your component to list items

const ItemsView = () => {
  const [items, setItems] = useState([]);
  const [filterEnabled, setFilterEnabled] = useState(false); // New state for toggling filter

  // Function to fetch all items
  const fetchAllItems = () => {
    fetch('http://localhost:3001/item') // Assuming /item returns all items
      .then(response => response.json())
      .then(setItems)
      .catch(console.error);
  };
  if (filterEnabled === false) {
    fetchAllItems();
  }

  // Function to fetch items in the price range
  const fetchItemsInRange = (minPrice, maxPrice) => {
    fetch(`http://localhost:3001/items/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`)
      .then(response => response.json())
      .then(setItems)
      .catch(console.error);
  };

  // Toggle filter on or off and fetch items accordingly
  const toggleFilter = () => {
    setFilterEnabled(!filterEnabled);
    if (!filterEnabled) {
      fetchAllItems(); // If turning filter off, fetch all items
    }
    // If turning the filter on, you might want to fetch with default range
    // or you might just wait for the user to select a range with the slider
  };

  return (
    
    <div>
      <h2>Items</h2>
      <button onClick={toggleFilter}>{filterEnabled ? 'Disable' : 'Enable'} Filter</button>
      {filterEnabled && <PriceRangeSlider onRangeSelect={fetchItemsInRange} />}
      <ItemList items={items} />
    </div>
  );
};

export default ItemsView;
