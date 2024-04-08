import React, { useEffect, useState } from 'react';

const CustomersView = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/customers')
      .then(response => response.json())
      .then(setCustomers)
      .catch(console.error);
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
