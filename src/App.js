import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/items') // Ensure the URL matches your server's URL and endpoint
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Items</h1>
      {items.map(item => (
        <div key={item.ID}>
          <p>Name: {item.Name}</p>
          <p>Price: {item.Price}</p>
          {/* Output other fields as needed */}
        </div>
      ))}
    </div>
  );
}

export default App;
