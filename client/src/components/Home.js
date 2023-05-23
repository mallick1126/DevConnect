import React, { useEffect, useState } from "react";
import "../stylesheets/home.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Conten-Type": "application/json",
        },
      });

      const resData = await res.json();
      console.log(resData);
      setUserName(resData.name);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);
  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME</p>
          <h1>{userName}</h1>
          <h1>
            {show ? "Happy to see you back" : "We are The MERN Developer"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
