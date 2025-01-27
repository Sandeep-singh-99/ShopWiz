const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accesstoken;
    console.log("Received token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Log the error for debugging
    return res.status(402).json({ message: "Unauthorized Access" });
  }
};

module.exports = verifyToken;
