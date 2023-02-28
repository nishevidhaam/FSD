import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your simple authentication logic here
    if (username === "admin" && password === "password" && role === "admin") {
      history.push("/performancescorecard");
    } else if (
      username === "manager" &&
      password === "password" &&
      role === "manager"
    ) {
      history.push("/performancescorecard");
    } else if (
      username === "director" &&
      password === "password" &&
      role === "director"
    ) {
      history.push("/performancescorecard");
    } else if (
      username === "ceo" &&
      password === "password" &&
      role === "ceo"
    ) {
      history.push("/performancescorecard");
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={handleRoleChange}>
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="ceo">CEO</option>
          </select>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

