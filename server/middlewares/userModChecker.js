module.exports = (req, res, next) => {
  try {
    if (req.userId === req.posterId) next();
    else if (req.userMod === 1) next();
    else throw Error("Bad request");
  } catch (err) {
    res.status(400).json("bad request" + err);
  }
};
