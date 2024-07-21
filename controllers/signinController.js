const jwt = require("jsonwebtoken");
const User = require("../models/collection");

const signin = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).send("Incorrect password.");
    }

    // Generate token for authentication
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.json({ message: "Sign in successful", token: token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = { signin };
