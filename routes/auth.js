const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register a user
// @route POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Please enter both username and password",
      });
    }

    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: passwordHashed,
    });

    const response = await user.save();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// login a user
// @route POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Please enter both username and password",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User does not exist",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, error: "Passowrd is not correct" });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: 3600 }
    );
    return res.header("auth-token", token).status(200).json({
      success: true,
      message: "User is logged in",
      token,
      userid: user._id,
      username,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
