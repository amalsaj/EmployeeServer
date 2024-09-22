const emp = require("../models/employee");
const User = require("../models/user");

const deleteEmployee = async (req, res) => {
  try {
    const currentUser = req.user;
    const user = await User.findById(currentUser._id);

    if (!user) {
      return res.status(401).json("User not found.");
    }

    // Retrieve the employee ID from the request body
    const employeeId = req.body._id;

    // Find the existing employee by ID
    const existingEmployee = await emp.findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).send("Employee not found.");
    }

    // Delete the employee
    await emp.deleteOne({ _id: employeeId });

    console.log("Employee deleted successfully:", existingEmployee);

    return res.status(200).json({ message: "Employee deleted successfully." });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error: " + error.message);
  }
};

module.exports = { deleteEmployee };
