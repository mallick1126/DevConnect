import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/login.css";
import LoginImage from "../images/sign-up.png";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    const res = await fetch("user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({ type: "USER", payload: true });
      window.alert("1 Login Successful");
      console.log("Login Successful");

      navigate("/");
    } else if (res.status === 400 || !data) {
      window.alert("2 Invalid credentials");
      console.log("Invalid credentials");
    } else {
      window.alert("3 Invalid credentials");
    }
  };

  return (
    <section className="login">
      <div className="container mt-5">
        <div className="login-content">
          <div className="login-form">
            <h2 className="login-title">Login</h2>
            <div className="login-container">
              <div className="login-field">
                <div className="login-image-container">
                  <figure>
                    <img src={LoginImage} alt="signupImage" />
                  </figure>
                  <NavLink to="/signup" className="login-image-link">
                    Create Account
                  </NavLink>
                </div>
              </div>
              <form className="login-form">
                <div className="login-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email material-icon-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Enter Email"
                  />
                </div>
                <div className="login-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icon-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Enter password"
                  />
                </div>
                <div className="login-button">
                  <input
                    type="submit"
                    name="login"
                    id="login"
                    className="login"
                    value="Log In"
                    onClick={loginUser}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
