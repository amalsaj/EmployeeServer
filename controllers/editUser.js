const User = require("../models/user");

const editUser = async (req, res) => {
  try {
    const currentUser = req.user;
    const user = await User.findById(currentUser._id);
    if (!user) {
      return res.status(401).json("User not found.");
    }
    if (!req.body.editUser) {
      return res.status(400).send("Data is required.");
    }

    const { _id, username, email, profile, mobileNumber } = req.body.editUser;
    console.log("req.body.editUser: ", req.body.editUser);

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: _id },
    });

    if (existingEmail) {
      return res.status(400).send("Email already exists!");
    }

    // Find the existing employee by ID
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).send("user not found.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        username,
        email,
        profile,
        mobileNumber,
      },
      { new: true }
    );

    console.log("user updated successfully:", updatedUser);
    return res
      .status(200)
      .json({ message: "user updated successfully.", updatedUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error: " + error.message);
  }
};

module.exports = { editUser };
