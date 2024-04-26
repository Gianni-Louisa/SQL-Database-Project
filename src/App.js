import React, { useState, useRef } from "react";
import "./App.css";

import SellersView from "./Components/SellerView/SellersView";
import ItemsView from "./Components/ItemView/ItemsView";
import CustomersView from "./Components/CustomersView/CustomersView.js";
import LoginPage from "./Components/Login/Login.js";
import Cart from "./Components/Cart/Cart.js";

const App = () => {
  const [view, setView] = useState("sellers");
  const viewContainerRef = useRef(null);

  const changeView = (newView) => {
    setView(newView);
    setTimeout(() => {
      viewContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Adjust this timeout as needed
  };
  

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Marketplace Hub</h1>
          <p>Welcome to Marketplace Hub</p>
          <p>Explore, Buy, Sell – Everything in One Place</p>
          <button onClick={() => changeView("items")} className="learn-more" >Browse Items</button>
        </div>
      </header>
      <nav className="main-nav">
        <button onClick={() => changeView("sellers")}>Sellers</button>
        <button onClick={() => changeView("items")}>Items</button>
        <button onClick={() => changeView("customers")}>Customers</button>
        <button onClick={() => changeView("login")}>Login/Signup</button>
        <button onClick={() => changeView("Cart")}>Cart</button>
      </nav>

      <div className="view-container" ref={viewContainerRef}>
        {view === "sellers" && <SellersView />}
        {view === "items" && <ItemsView />}
        {view === "customers" && <CustomersView />}
        {view === "login" && <LoginPage />}
        {view === "Cart" && <Cart />}
      </div>
    </div>
  );
};

export default App;
