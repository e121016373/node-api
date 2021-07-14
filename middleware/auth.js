const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) res.status(401).send("Token Missing");

  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    if (error.message === "Token Missing") {
      res.status(401).json({ error: error.message });
    } else {
      res.status(400).send("Invalid Token");
    }
  }
};

module.exports = auth;
