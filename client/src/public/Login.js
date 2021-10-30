import React, { useState } from "react";
import "../styles/Form.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert(`${data.role} Logged in`);
      console.log(data.role);
      if (data.role === "admin") {
        window.location.href = "./additem";
      } else {
        window.location.href = "./userhomepage";
      }
    } else {
      alert("Please check your username and password");
    }

    console.log(data);
  }

  return (
    <div className="page">
      <h1>VANGO VANGO VANGURATHUKU VANGO</h1>
      <div className="Rcontainer">
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="E-mail "
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <input className="submit-button" type="submit" value="Login" />
        </form>
        <p>
          Not a user? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default App;
