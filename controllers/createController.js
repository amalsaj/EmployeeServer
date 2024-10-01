const emp = require("../models/employee");
const User = require("../models/user");

const createEmployee = async (req, res) => {
  try {
    const currentUser = req.user;
    const user = await User.findById(currentUser._id);

    // Check if the user exists
    if (!user) {
      return res.status(401).json("User not found.");
    }

    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate,
      f_Image,
    } = req.body.formData;

    // Check if formData exists
    if (!req.body.formData) {
      return res.status(400).send("formData is required.");
    }

    // Check if required fields are provided
    if (!f_Name || !f_Email) {
      return res.status(400).send("Employee Name and Email are required.");
    }

    // Check if the employee with the same email already exists
    const existingEmployee = await emp.findOne({ f_Email });
    if (existingEmployee) {
      return res.status(409).send("Employee with this email already exists.");
    }

    // Create a new employee document, including the user._id as employeeId
    const newEmployee = new emp({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate,
      f_Image,
      employeeId: user._id, // Assign the user's ID as employeeId
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Respond with a success message
    console.log("Employee created successfully");
    res.status(200).send("Employee created successfully.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error: " + error.message);
  }
};

module.exports = { createEmployee };
