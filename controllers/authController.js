const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("Token is not provided");
    return res
      .status(401)
      .json({ message: "Unauthorized - Token is not provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.error("Token has expired");
        return res.redirect("/");
      } else {
        console.error("Token verification failed:", err);
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
      }
    }
    console.log(`Authorized - Valid token: ${token}`);
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateUser };
