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
        .then(() =>
          res.sendStatus(200).json({ message: "Utilisateur enregistré" })
        )
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

module.exports.signIn = async (req, res) => {
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  User.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (isEmpty(user)) {
        res.status(400).json({ err: "Cet email n'est lié à aucun compte" });
      } else {
        bcrypt
          .compare(req.body.password, user[0].password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ err: "Mot de passe incorrect" });
            } else {
              res.status(200).json({
                userId: user[0].id,
                token: jwt.sign(
                  { data: user[0].id },
                  `${process.env.JWT_TOKEN}`,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((err) => res.status(500).json({ err }));
      }
    })
    .catch((err) => console.log(err));
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

module.exports.fetchToken = async (req, res) => {
  const token = req.body.token;

  if (!token) {
    res.json({ error: "Vous ne vous êtes pas connecté" });
  } else {
    jwt.verify(token, `${process.env.JWT_TOKEN}`, async (err, userId) => {
      if (err) {
        res.sendStatus(400).json("pas de token");
      } else {
        res.status(200).json({ userId });
      }
    });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.followUser = async (req, res) => {
  /**
   * ajouter la condition
   */
  try {
    const userFollowing = await User.findOne({ where: { id: req.params.id } });
    userFollowing.following += req.body.idToFollow;
    await userFollowing.save();

    const userFollowed = await User.findOne({
      where: { id: req.body.idToFollow },
    });
    userFollowed.followers += req.params.id;
    await userFollowed.save();

    return res.status(200).json("Utilisateur suivi");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" + err });
  }
};
