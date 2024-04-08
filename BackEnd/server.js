const express = require('express');
const sql = require('mssql/msnodesqlv8');

const app = express();
const port = 3001; // Ensure this port does not conflict with your React app's port

const config = {
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=(localdb)\\Local;Database=Items;Trusted_Connection=yes;',
  database: 'Items',
  server: '(localdb)\\Local', // or your LocalDB instance
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
};

// Enable CORS if your React app is on a different port or domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Endpoint to get all items from the database
app.get('/items', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await new sql.Request().query('SELECT * FROM ItemsTable');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await sql.close(); // Make sure to close the connection
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
