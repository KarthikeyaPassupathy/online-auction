import React, { useState } from "react";
import { useHistory } from "react-router";
import "../styles/Form.css";
function App() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameerr, setNameerr] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [passerr, setPasserr] = useState("");

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const validateForm = () => {
    if (name.length == 0) {
      setNameerr("Field canot be empty");
      return false;
    }
    if (email.length == 0) {
      setEmailerr("Field canot be empty");
      return false;
    }
    if (password.length == 0) {
      setPasserr("Field canot be empty");
      return false;
    }
    if (nameerr > 0 || emailerr.length > 0 || passerr.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "nameerr":
        setNameerr(value.length < 4 ? "Enter valid name" : "");
        break;
      case "emailerr":
        setEmailerr(validEmailRegex.test(value) ? "" : "Enter valid email");
        break;
      case "passerr":
        setPasserr(
          value.length < 8 ? "Password must be longer than 8 char" : ""
        );
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      console.log("Valid Form");
      registerUser(e);
    } else {
      console.log("Invalid Form");
    }
  }

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      history.push("/login");
    } else {
      alert("User already exists");
    }
  }

  return (
    <div className="page">
      <h1>VANGO VANGO VANGURATHUKU VANGO</h1>
      <div className="Rcontainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="nameerr"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleChange(e);
            }}
            type="text"
            placeholder="Name"
          />
          {nameerr.length > 0 && <span className="error">{nameerr}</span>}
          <br />
          <input
            name="emailerr"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange(e);
            }}
            type="text"
            placeholder="E-mail "
          />
          {emailerr.length > 0 && <span className="error">{emailerr}</span>}
          <br />
          <input
            name="passerr"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange(e);
            }}
            type="password"
            placeholder="Password"
          />
          {passerr.length > 0 && <span className="error">{passerr}</span>}
          <br />
          <input className="submit-button" type="submit" value="Register" />
        </form>
        <p>
          Already a user? <a href="/login">Click here</a>
        </p>
      </div>
    </div>
  );
}

export default App;
