import React, { useEffect, useState } from "react";

const CustomersView = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/customers", {
      credentials: "include", // Include this if your backend requires sessions
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(setCustomers)
      .catch((error) => console.error("Failed to load customers:", error));
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.CustomerID}>
            {customer.Name} - {customer.Email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersView;
