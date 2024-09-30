const { signin } = require("../controllers/signinController");
const { signup } = require("../controllers/signupController");
const { createEmployee } = require("../controllers/createController");
const { editEmployee } = require("../controllers/editController");
const { getEmployeeData } = require("../controllers/getController");
const { authenticateUser } = require("../controllers/authController");
const { deleteEmployee } = require("../controllers/deleteController");
const { getUser } = require("../controllers/getUser");
const { editUser } = require("../controllers/editUser");

const router = require("express").Router();
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/createEmployee").post(authenticateUser, createEmployee);
router.route("/editEmployee").put(authenticateUser, editEmployee);
router.route("/getEmployeeData").get(authenticateUser, getEmployeeData);
router.route("/deleteEmployee").delete(authenticateUser, deleteEmployee);
router.route("/getUser").get(authenticateUser, getUser);
router.route("/editUser").put(authenticateUser, editUser);

module.exports = router;
