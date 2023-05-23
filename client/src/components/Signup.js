import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/signup.css";
import image from "../images/sign-up.png";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handlePostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;
    const response = await fetch("user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const responseData = await response.json();
    if (responseData.status === 422 || !responseData) {
      window.alert("Invalid Registration!");
      console.log("Invalid Registration!");
    } else {
      window.alert(" Registration Successfull!");
      console.log(" Registration Successfull!");
      navigate("/login");
    }
  };
  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign-up</h2>
              <div className="form-container">
                <div className="form-field">
                  <form
                    method="POST"
                    className="register-form"
                    id="register-form"
                  >
                    <div className="form-group">
                      <label htmlFor="name">
                        <i class="zmdi zmdi-account material-icon-name"></i>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="off"
                        value={user.name}
                        onChange={handleInputs}
                        placeholder="Enter Name"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        <i class="zmdi zmdi-email material-icon-name"></i>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        value={user.email}
                        onChange={handleInputs}
                        placeholder="Enter Email"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">
                        <i class="zmdi zmdi-phone-in-talk material-icon-name"></i>
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        autoComplete="off"
                        value={user.phone}
                        onChange={handleInputs}
                        placeholder="Enter Phone"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="work">
                        <i class="zmdi zmdi-slideshow material-icon-name"></i>
                      </label>
                      <input
                        type="text"
                        name="work"
                        id="work"
                        autoComplete="off"
                        value={user.work}
                        onChange={handleInputs}
                        placeholder="Enter Profession"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">
                        <i class="zmdi zmdi-lock material-icon-name"></i>
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        value={user.password}
                        onChange={handleInputs}
                        placeholder="Enter Password"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpassword">
                        <i class="zmdi zmdi-lock material-icon-name"></i>
                      </label>
                      <input
                        type="password"
                        name="cpassword"
                        id="cpassword"
                        autoComplete="off"
                        value={user.cpassword}
                        onChange={handleInputs}
                        placeholder="Confirm password"
                      ></input>
                    </div>
                    <div className="form-button">
                      <input
                        type="submit"
                        name="signup"
                        id="signup"
                        className="form-submit"
                        value="Register"
                        onClick={handlePostData}
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="image-container">
                  <figure>
                    <img src={image} alt="signupImage" />
                  </figure>
                  <NavLink to="/login" className="signup-image-link">
                    I am already registered.
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
