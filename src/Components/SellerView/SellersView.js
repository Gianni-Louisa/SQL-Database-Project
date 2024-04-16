import React, { useEffect, useState } from 'react';

const SellersView = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/sellers', {
      method: 'GET',  // Optional, since GET is the default method
      credentials: 'include',  // Necessary to include session cookies with the request
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(setSellers)
    .catch(error => {
      console.error('Failed to fetch sellers:', error);
    });
  }, []);

  return (
    <div>
      <h2>Sellers</h2>
      <ul>
        {sellers.map((seller) => (
          <li key={seller.SellerID}>
            {seller.Name} - Rating: {seller.Rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellersView;
