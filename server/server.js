const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { Sequelize } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv").config({ path: "./.env" });
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const multer = require("multer");

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
    await Post.sync({ alter: true });
    await Comment.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

/* Initialize application server */

const app = express();
app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/upload", userRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.listen(3001, () => {
  console.log("Server started");
});
