import React, { useState } from "react";
import "./Login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are included
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const message = await response.text();
      setIsLoggedIn(true); // Update state to reflect the user is logged in
    } else {
      const error = await response.text();
      alert(error); // Display error message
    }
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include", // Ensure cookies are included
    });

    if (response.ok) {
      const message = await response.text();
      alert(message); // Display success message
      setIsLoggedIn(false); // Update state to reflect the user is logged out
    } else {
      const error = await response.text();
      alert(error); // Display error message
    }
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Login</h1>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              placeholder="admin"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="secureAdminPassword123!"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {!isLoggedIn && (
        <p className="register-text">
          Don't have an account? <a href="/register" onClick={handleLogout}>Register</a>
        </p>
      )}
        </form>
      ) : (
        
          <div className="welcome-container">
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
       
      )}
    </div>
  );
}

export default LoginPage;
