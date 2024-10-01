const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
  const { username, password, email, mobileNumber } = req.body;
  try {
    // Check if the username already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "user already exist" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user document
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      mobileNumber,
    });

    // Save the new user to the database
    await newUser.save();

    // Sign up successful
    res.status(201).send("Sign-up Successful.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = { signup };
