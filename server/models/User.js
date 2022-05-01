const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv").config({ path: "./.env" });

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`,
  }
);

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  bio: { type: DataTypes.STRING, defaultValue: "" },
  following: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  followers: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  picture: {
    type: DataTypes.STRING,
    defaultValue: "./assets/random_user.png",
  },
  mod: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = sequelize.model("User", User);
