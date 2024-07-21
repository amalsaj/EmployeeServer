const emp = require("../models/employee");
const editEmployee = async (req, res) => {
  console.log(req.body);
  try {
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

    // Check if editFormData exists
    if (!req.body.editFormData) {
      return res.status(400).send("Data is required.");
    }

    const existingEmail = await emp.findOne({
      f_Email: f_Email,
      _id: { $ne: _id },
    });

    if (existingEmail) {
      return res.status(400).send("Email already exists!");
    }

    const existingUser = await emp.findOne({ _id });
    if (existingUser) {
      console.log(existingUser);
      await emp.findOneAndUpdate(
        { _id },
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

      return res.status(200).send("Employee updated successfully.");
    }

    return res.status(404).send("Employee not found."); // Return 404 if employee not found
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    res.status(500).send("Internal server error: " + error.message); // Send the error message to the client
  }
};
module.exports = { editEmployee };
