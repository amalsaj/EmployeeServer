const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      // Avoid specifying if email or password is wrong
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send response
    res.json({ message: "Sign in successful", token });
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = { signin };
