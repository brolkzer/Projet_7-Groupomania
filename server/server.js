const User = require("./models/User");
const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv").config({ path: "./.env" });
const userRoutes = require("./routes/user.routes");

/* Initialize DB Server */

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`,
  }
);

/* Immediately Invoked Function Expression */

(async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

/* Initialize application server */

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

app.listen(3001, () => {
  console.log("Server started");
});
