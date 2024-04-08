import React, { useState } from 'react';
import './App.css'; // Adjust the path based on your file structure

import SellersView from './Components/SellerView/SellersView'; // Component showing all sellers
import ItemsView from './Components/ItemView/ItemsView'; // Component showing items with a price range slider
import CustomersView from './Components/CustomersView/CustomersView.js'; // Component showing all customers

const App = () => {
  const [view, setView] = useState('sellers'); // Default view

  return (
    <div>
      <nav>
        <button onClick={() => setView('sellers')}>Sellers</button>
        <button onClick={() => setView('items')}>Items</button>
        <button onClick={() => setView('customers')}>Customers</button>
      </nav>

      {view === 'sellers' && <SellersView />}
      {view === 'items' && <ItemsView />}
      {view === 'customers' && <CustomersView />}
    </div>
  );
};

export default App;
