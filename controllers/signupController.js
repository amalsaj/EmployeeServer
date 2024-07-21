const User = require("../models/collection");
const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send("Username already exists.");
    }
    // Validating the username and password with regex
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (usernameRegex.test(username)) {
      console.log("Valid username");
    } else {
      return res
        .status(400)
        .send(
          "Your username should start with a letter and be 3 to 16 characters long, allowing letters, numbers, underscores, and hyphens."
        );
    }
    if (passwordRegex.test(password)) {
      console.log("Valid password");
    } else {
      return res
        .status(400)
        .send(
          "Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        );
    }

    // Create a new user document
    const newUser = new User({ username, password });

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
