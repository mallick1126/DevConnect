const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
      return res.status(422).json({ message: "Please fill all details" });
    }

    const userDetails = await User.findOne({ email: email });
    if (userDetails) {
      return res
        .status(422)
        .json({ message: "User already exists. Please login!" });
    }
    if (password != cpassword) {
      return res
        .status(422)
        .json({ message: "Password and confirm password should be same" });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });
    const userRegister = await user.save();
    if (userRegister) {
      return res
        .status(201)
        .json({ messgae: "User registered successfully.", userRegister });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "Insufficient data." });
    }
    const userDetails = await User.findOne({ email: email });
    console.log(userDetails);
    if (userDetails) {
      const isMatch = await bcrypt.compare(password, userDetails.password);
      token = await userDetails.generateAuthToken();
      console.log(token);

      res.cookie("jwt_token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        return res.status(400).json({ messgage: "Invalid credentials" });
      }
      return res.status(200).json({ message: "User logged in successfully" });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

exports.about = async (req, res) => {
  try {
    console.log(`Hello my About`);
    res.status(200).send(req.rootUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

exports.contactUs = async (req, res) => {
  try {
    res.send(req.rootUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

exports.contact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log(`Error in contact form`);
      return res.status(500).json(`Please fill the contact form`);
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: "User contact successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    console.log(`Hello my logout page`);
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).json(`User logged out successfully!`);
  } catch (error) {
    console.log(error);
  }
};
