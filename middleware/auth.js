const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) throw new Error("Token Missing");

    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!req.user) throw new Error("Invalid Token");

    next();
  } catch (error) {
    if (
      error.message === "Token Missing" ||
      error.message === "Invalid Token"
    ) {
      res.status(401).send(error.message);
    } else {
      res.status(400).send(error.message);
    }
  }
};

module.exports = isAuthenticated;
