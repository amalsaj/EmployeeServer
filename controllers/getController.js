const emp = require("../models/employee");
const User = require("../models/user");

const getEmployeeData = async (req, res) => {
  try {
    // Get the current user from the request (assuming user is authenticated)
    const currentUser = req.user;

    // Find the user in the database using their ID
    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.status(401).json("User not found");
    }

    // If the user exists, continue fetching employee data
    const employeeId = user._id;

    // Get page and pageSize from query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const search = req.query.search;

    // Calculate skip and limit values
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Build search criteria
    let searchCriteria = { employeeId };

    // If search query exists, add regex-based search for employee fields
    if (search) {
      searchCriteria = {
        employeeId,
        $or: [
          { f_Name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          // { f_Mobile: search },
          { f_Designation: { $regex: search, $options: "i" } },
          { f_gender: { $regex: search, $options: "i" } },
          { f_Course: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Fetch employee data associated with the user (employeeId) and search criteria
    const allData = await emp.find(searchCriteria).skip(skip).limit(limit);

    // Fetch total count of documents for this employeeId and search criteria
    const totalCount = await emp.countDocuments(searchCriteria);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);

    // Check if any data was found
    if (allData.length === 0) {
      return res.status(200).json("No data found.");
    }

    // Respond with paginated data and metadata
    res.json({
      page,
      pageSize,
      totalCount,
      totalPages,
      data: allData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = { getEmployeeData };
