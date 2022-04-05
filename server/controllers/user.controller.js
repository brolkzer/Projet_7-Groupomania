const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
        .then(() => res.status(200).json({ message: "Utilisateur enregistré" }))
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

module.exports.getAllUsers = async (req, res) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getOneUser = async (req, res) => {
  User.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ err }));
};
