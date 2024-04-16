import React, { useState } from "react";
import "./App.css";

import SellersView from "./Components/SellerView/SellersView";
import ItemsView from "./Components/ItemView/ItemsView";
import CustomersView from "./Components/CustomersView/CustomersView.js";
import LoginPage from "./Components/Login/Login.js";

const App = () => {
  const [view, setView] = useState("sellers");

  return (
    <div>
      <nav>
        <button onClick={() => setView("sellers")}>Sellers</button>
        <button onClick={() => setView("items")}>Items</button>
        <button onClick={() => setView("customers")}>Customers</button>
        <button onClick={() => setView("login")}>Login</button>
      </nav>

      {view === "sellers" && <SellersView />}
      {view === "items" && <ItemsView />}
      {view === "customers" && <CustomersView />}
      {view === "login" && <LoginPage />}
    </div>
  );
};

export default App;
