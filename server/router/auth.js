const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from router auth.js");
});
router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/about", authenticate, userController.about);
router.get("/getdata", authenticate, userController.contactUs);

router.post("/contact", authenticate, userController.contact);

router.get("/logout", userController.logout);

module.exports = router;
