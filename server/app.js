require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const dbConnection = require("./database/db");
const authRoute = require("./router/auth");

app.use(express.json());
dbConnection();

app.use("/user", authRoute);

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Set the appropriate origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cookieParser());

// Middleware

// const middleware = (req, res, next) => {
//   console.log(`Hello from middleware`);
//   next();
// };

// app.get("/", middleware, (req, res) => {
//   res.send(`Hello world from server`);
// });

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
