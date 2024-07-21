const emp = require("../models/employee");
const createEmployee = async (req, res) => {
  console.log(req.body);
  try {
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
      return res.status(400).send("EmployeeName and email are required.");
    }

    const existingUser = await emp.findOne({ f_Email });
    if (existingUser) {
      return res.status(409).send("Employee already exists.");
    }

    // Create a new employee document
    const newEmployee = new emp({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate,
      f_Image,
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Sign-up successful
    console.log("Employee created successfully:", newEmployee);
    res.status(200).send("Employee created successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error: " + error.message);
  }
};
module.exports = { createEmployee };
