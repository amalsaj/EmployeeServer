const User = require("../models/user");
const emp = require("../models/employee");

const getUser = async (req, res) => {
  try {
    // Get the current user from the request (assuming user is authenticated)
    const currentUser = req.user;

    // Find the user in the database using their ID
    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.status(401).json("User not found");
    }

    const employeeId = user._id;

    const empCount = await emp.countDocuments({ employeeId: employeeId });

    res.json({
      user,
      count: empCount,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error.");
  }
};



module.exports = { getUser };
