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

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  posterId: { type: DataTypes.STRING },
  likes: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  content: { type: DataTypes.STRING(500) },
  picture: { type: DataTypes.STRING },
  video: { type: DataTypes.STRING },
});

module.exports = sequelize.model("Post", Post);
