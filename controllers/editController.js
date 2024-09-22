const emp = require("../models/employee");
const User = require("../models/user");

const editEmployee = async (req, res) => {
  try {
    const currentUser = req.user;
    const user = await User.findById(currentUser._id);
    if (!user) {
      return res.status(401).json("User not found.");
    }
    if (!req.body.editFormData) {
      return res.status(400).send("Data is required.");
    }

    const {
      _id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate,
      f_Image,
    } = req.body.editFormData;

    const existingEmail = await emp.findOne({
      f_Email,
      _id: { $ne: _id },
    });

    if (existingEmail) {
      return res.status(400).send("Email already exists!");
    }

    // Find the existing employee by ID
    const existingUser = await emp.findById(_id);
    if (!existingUser) {
      return res.status(404).send("Employee not found.");
    }

    const updatedEmployee = await emp.findByIdAndUpdate(
      _id,
      {
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_gender,
        f_Course,
        f_Createdate,
        f_Image,
      },
      { new: true }
    );

    console.log("Employee updated successfully:", updatedEmployee);
    return res
      .status(200)
      .json({ message: "Employee updated successfully.", updatedEmployee });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error: " + error.message);
  }
};

module.exports = { editEmployee };
