const express = require("express");
const sql = require("mssql");
const session = require("express-session");
const bcrypt = require("bcryptjs"); // You will need bcryptjs to hash and compare hashed passwords
const cors = require("cors");

const app = express();
const port = 3001;
app.use(express.json());


// Configuration for your Azure SQL database
const config = {
  user: "Jayhawk",
  password: "Rockchalk2025@",
  server: "eecs-447.database.windows.net", // Replace with your server name
  database: "EECS 447 Final",
  options: {
    encrypt: true, // Required for Azure SQL
    enableArithAbort: true,
  },
};
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to match your frontend's URL
    credentials: true, // This allows the server to accept the session cookie from the client
  })
);
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto", maxAge: 3600000 },
  })
);
// Simplify and correct your CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow only from React app
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true"); // If you're using cookies/sessions
  next();
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8); // Hash the password with bcrypt

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("hashedPassword", sql.VarChar, hashedPassword)
      .query(
        "INSERT INTO Users (Username, Password) VALUES (@username, @hashedPassword)"
      );

    res.send("User registered successfully");
  } catch (err) {
    if (err.number === 2627) {
      // Unique constraint error
      res.status(400).send("Username already exists");
    } else {
      res.status(500).send(err.message);
    }
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE Username = @username"); // Ensure you have a Users table with Username and Password columns

    if (result.recordset.length > 0) {
      const user = result.recordset[0];

      // Compare submitted password with stored hash
      const isMatch = await bcrypt.compare(password, user.Password);
      if (isMatch) {
        req.session.userId = user.Id; // Save user id in session
        res.send("Logged in successfully!");
      } else {
        res.status(401).send("Authentication failed");
      }
    } else {
      res.status(401).send("User not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.send("Logged out successfully");
  });
});

// Configure express-session

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to Azure MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

// Middleware to check session
function checkSession(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

// Require authentication for all routes

// Add a new seller
app.post("/sellers", checkSession, async (req, res) => {
  const { name, rating } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `INSERT INTO Sellers (Name, Rating) VALUES ('${name}', ${rating})`
      );
    res.status(201).send("Seller added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all sellers
app.get("/sellers", checkSession, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Sellers");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all items
app.get("/item", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Items");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all customers
app.get("/customers", checkSession, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Customers");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get items by price range
app.get("/items/price-range", async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM Items 
      WHERE Price BETWEEN ${minPrice} AND ${maxPrice};
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get items by seller rating range
app.get("/items/seller-range", async (req, res) => {
  const { minRating, maxRating } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM Items Join Sellers ON Items.SellerID=Sellers.SellerID
      WHERE Rating BETWEEN ${minRating} AND ${maxRating};
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/cart", checkSession, async (req, res) => {
  const userId = 1;
  const { items } = req.body;

  console.log("Received items:", items);
  console.log("User ID:", userId);

  if (!items || !userId) {
      return res.status(400).send("Missing items or user ID");
  }

  try {
    // Use poolPromise to get the database pool from the promise
    const pool = await poolPromise;
    await pool.request()
      .input('ItemID', sql.Int, items.ItemID)
      .input('Quantity', sql.Int, items.Quantity)
      .input('UserID', sql.Int, userId)
      .query('INSERT INTO Cart (ItemID, Quantity, UserID) VALUES (@ItemID, @Quantity, @UserID)');

    res.status(201).send("Item added to cart successfully");
  } catch (err) {
      console.error("Error when adding to cart:", err);
      res.status(500).send(err.message);
  }
});


app.get("/cart", checkSession, async (req, res) => {
  const userId = 1;  // Assuming `user` is the field where you store the userId in session

  console.log("Fetching cart for User ID:", userId);

  if (!userId) {
      return res.status(400).send("User ID is missing or not authenticated");
  }

  try {
      const pool = await poolPromise;
      const result = await pool.request()
          .input('UserID', sql.Int, userId)
          .query('SELECT * FROM Cart JOIN Items ON Cart.ItemID = Items.ItemID WHERE Cart.UserID = @UserID');

      if (result.recordset.length > 0) {
          res.json(result.recordset);
      } else {
          res.status(404).send("No items found in the cart for this user.");
      }
  } catch (err) {
      console.error("Error fetching cart items:", err);
      res.status(500).send(err.message);
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
