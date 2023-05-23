import React, { useEffect, useState } from "react";
import "../stylesheets/contact.css";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();
      console.log(resData);
      setUserData({
        ...userData,
        name: resData.name,
        email: resData.email,
        phone: resData.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const handleClickChange = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;

    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const resData = await res.json();

    if (!resData) {
      console.log("Message not send");
    } else {
      alert(`Message send`);
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              <div className="contact_info_item d-flex justify-content-start align-items-centre">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">{userData.phone}</div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-items-centre">
                <img
                  src="https://img.icons8.com/office/24/000000/email.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">{userData.email}</div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-items-centre">
                <img
                  src="https://img.icons8.com/office/24/000000/address.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">
                    Dhanbad, Jharkhand-826003
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Form */}

      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch </div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_data d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required="true"
                    />

                    <input
                      type="email"
                      id="contact_form_email"
                      className="contact_form_email input_field"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      required="true"
                    />

                    <input
                      type="number"
                      id="contact_form_phone"
                      className="contact_form_phone input_field"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      required="true"
                    />
                  </div>

                  <div className="contact_form_text mt-5">
                    <textarea
                      className="text_filed contact_form_message"
                      name="message"
                      value={userData.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>

                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="button contact_submit_button"
                      onClick={handleClickChange}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
