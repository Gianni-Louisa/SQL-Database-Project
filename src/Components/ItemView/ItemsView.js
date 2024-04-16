import React, { useEffect, useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import ItemList from "./ItemList";

const ItemsView = () => {
  const [items, setItems] = useState([]);
  const [filterEnabled, setFilterEnabled] = useState(false);

  // Fetch all items initially and when filters are disabled
  useEffect(() => {
    if (!filterEnabled) {
      fetch("http://localhost:3001/item", {
        credentials: "include", // Include this if your backend requires sessions
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(setItems)
        .catch(console.error);
    }
  }, [filterEnabled]);

  const fetchItemsInRange = (min, max) => {
    fetch(
      `http://localhost:3001/items/price-range?minPrice=${min}&maxPrice=${max}`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then(setItems)
      .catch(console.error);
  };

  const fetchItemsInRangeRating = (min, max) => {
    fetch(
      `http://localhost:3001/items/seller-range?minRating=${min}&maxRating=${max}`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then(setItems)
      .catch(console.error);
  };

  const toggleFilter = () => {
    setFilterEnabled(!filterEnabled);
  };

  return (
    <div>
      <h2>Items</h2>
      <button onClick={toggleFilter}>
        {filterEnabled ? "Disable" : "Enable"} Filter
      </button>
      {filterEnabled && (
        <PriceRangeSlider
          onRangeSelect={fetchItemsInRange}
          min={0}
          max={100}
          units={"Price: $"}
        />
      )}
      {filterEnabled && (
        <PriceRangeSlider
          onRangeSelect={fetchItemsInRangeRating}
          min={0}
          max={5}
          units={"Rating: "}
        />
      )}
      <ItemList items={items} />
    </div>
  );
};

export default ItemsView;
