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

    // Validating the username and password with regex
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .send(
          "Your username should start with a letter and be 3 to 16 characters long, allowing letters, numbers, underscores, and hyphens."
        );
    }

    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .send(
          "Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        );
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
