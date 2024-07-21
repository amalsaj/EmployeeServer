const emp = require("../models/employee");
const getEmployeeData = async (req, res) => {
  try {
    console.log(req.query);
    // Get page and pageSize from query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    // Calculate skip and limit values
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Fetch data with pagination
    const allData = await emp.find().skip(skip).limit(limit);

    // Fetch total count of documents
    const totalCount = await emp.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);

    console.log(
      `skip:${skip},limit:${limit},totalCount:${totalCount},totalpages:${totalPages}`
    );

    // Check if any data was found
    if (allData.length === 0) {
      return res.status(404).send("No data found.");
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
