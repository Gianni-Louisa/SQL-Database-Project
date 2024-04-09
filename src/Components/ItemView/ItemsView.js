import React, { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import ItemList from './ItemList';

const ItemsView = () => {
  const [items, setItems] = useState([]);
  const [filterEnabled, setFilterEnabled] = useState(false);

  const fetchAllItems = () => {
    fetch('http://localhost:3001/item') 
      .then(response => response.json())
      .then(setItems)
      .catch(console.error);
  };
  if (filterEnabled === false) {
    fetchAllItems();
  }

  const fetchItemsInRange = (min, max) => {
    fetch(`http://localhost:3001/items/price-range?minPrice=${min}&maxPrice=${max}`)
      .then(response => response.json())
      .then(setItems)
      .catch(console.error);
  };
  const fetchItemsInRangeRating = (min, max) => {
    fetch(`http://localhost:3001/items/seller-range?minRating=${min}&maxRating=${max}`)
      .then(response => response.json())
      .then(setItems)
      .catch(console.error);
  };

  const toggleFilter = () => {
    setFilterEnabled(!filterEnabled);
    if (!filterEnabled) {
      fetchAllItems(); 
    }

  };

  return (
    
    <div>
      <h2>Items</h2>
      <button onClick={toggleFilter}>{filterEnabled ? 'Disable' : 'Enable'} Filter</button>
      {filterEnabled && <PriceRangeSlider onRangeSelect={fetchItemsInRange} min={0} max={100} units={'Price: $'}/>}
      {filterEnabled && <PriceRangeSlider onRangeSelect={fetchItemsInRangeRating} min={0} max={5} units={'Rating: '}/>}


      <ItemList items={items} />
    </div>
  );
};

export default ItemsView;
