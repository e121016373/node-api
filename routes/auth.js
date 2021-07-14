const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

// Register a user
// @route POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Please enter all information");

    const foundUser = await User.findOne({ username });
    if (foundUser) throw new Error("User already exists");

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: passwordHashed,
    });

    const response = await user.save();
    res.status(200).json(response);
  } catch (error) {
    if (
      error.message === "Please enter all information" ||
      error.message === "User already exists"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// login a user
// @route POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Please enter all information");

    const user = await User.findOne({ username });
    if (!user) throw new Error("User does not exist");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Passowrd is not correct");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.status(200).json({ message: "User is logged in" });
  } catch (error) {
    if (
      error.message === "User does not exist" ||
      error.message === "Please enter all information" ||
      error.message === "Passowrd is not correct"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
