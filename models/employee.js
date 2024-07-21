const mongoose = require("mongoose");

const EmpSchema = new mongoose.Schema({
  f_Name: String,
  f_Email: String,
  f_Mobile: Number,
  f_Designation: String,
  f_gender: { type: String, enum: ["Male", "Female", "Other"] },
  f_Course: [String],
  f_Createdate: { type: Date, default: Date.now },
  f_Image: String,
});

const emp = mongoose.model("t_Employee", EmpSchema);

module.exports = emp;
