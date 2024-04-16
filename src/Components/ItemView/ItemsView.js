import React, { useEffect, useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import ItemList from "./ItemList";
import "./ItemsView.css";

const ItemsView = () => {
  const [items, setItems] = useState([]);
  const [seller, setSeller] = useState([]);
  const [filterEnabled, setFilterEnabled] = useState(false);
  
  useEffect(() => {
    if (!filterEnabled) {
      fetch("http://localhost:3001/item", {
        credentials: "include",
      })
        .then(response => response.json())
        .then(setItems)
        .catch(console.error);
    }
  }, [filterEnabled]);

  useEffect(() => {
    if (!filterEnabled) {
      fetch("http://localhost:3001/seller", {
        credentials: "include",
      })
        .then(response => response.json())
        .then(setSeller)
        .catch(console.error);
    }
  }, [filterEnabled]);


  

  const fetchItemsInRange = (min, max) => {
    fetch(`http://localhost:3001/items/price-range?minPrice=${min}&maxPrice=${max}`, {
      credentials: "include",
    })
      .then(response => response.json())
      .then(setItems)
      .catch(console.error);
  };



  const toggleFilter = () => {
    setFilterEnabled(!filterEnabled);
  };

  return (
    <div className="items-view-container">
      <div className="filter-container">
    
        
          <PriceRangeSlider
            onRangeSelect={fetchItemsInRange}
            min={0}
            max={100}
            units={"Price: $"}
          />
     
    

       
      </div>
      <ItemList items={items} seller={seller} />
    </div>
  );
};

export default ItemsView;
