import React, { useEffect, useState } from 'react';

const SellersView = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/sellers')
      .then(response => response.json())
      .then(setSellers)
      .catch(console.error);
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
