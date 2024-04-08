const express = require('express');
const sql = require('mssql/msnodesqlv8');

const app = express();
const port = 3001;

app.use(express.json());

const config = {
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=(localdb)\\Local;Database=Items;Trusted_Connection=yes;',
  database: 'Items',
  server: '(localdb)\\Local',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
};

// Create a global connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

// Enable CORS for cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Example endpoint using the connection pool
app.get('/items', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT Items.ItemID, Items.Name, Items.Price, Items.Quantity, Sellers.Name AS SellerName, Sellers.Rating
      FROM Items
      INNER JOIN Sellers ON Items.SellerID = Sellers.SellerID;
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



// Endpoint to add a new seller
app.post('/sellers', async (req, res) => {
  const { name, rating } = req.body;
  try {
    await sql.connect(config);
    await new sql.Request()
         .query(`INSERT INTO Sellers (Name, Rating) VALUES ('${name}', ${rating})`);
    res.status(201).send('Seller added successfully');
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await sql.close();
  }
});

// Endpoint to get all sellers
app.get('/sellers', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await new sql.Request().query('SELECT * FROM Sellers');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await sql.close();
  }
});
app.get('/item', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await new sql.Request().query('SELECT * FROM Items');
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    } finally {
      await sql.close();
    }
  });
  app.get('/customers', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await new sql.Request().query('SELECT * FROM Customers');
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    } finally {
      await sql.close();
    }
  });


// Example for items priced between $10 and $50
app.get('/items/price-range', async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    await sql.connect(config);
    const result = await new sql.Request().query(`
      SELECT * FROM Items 
      WHERE Price BETWEEN ${minPrice} AND ${maxPrice};
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
