const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const Token = req.cookies.accesstoken
  console.log("Request cookies: ", req.cookies);
  if (!Token) {
    const renewed = await renewToken(req, res);
    if (renewed) {
      next(); // Proceed to the next middleware if the token was successfully renewed
    } else {
      return; // Stop further execution if renewToken sends a response
    }
  } else {
    try {
      const decoded = jwt.verify(Token, process.env.JWT_SECRET);
      req.user = decoded;
      next(); // Proceed if the token is valid
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized", success: false }); // Send a response if token is invalid
    }
  }
};

const renewToken = async (req, res) => {
  const refreshToken = req.cookies.refreshtoken;

  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized", success: false });
    return false; // Explicitly return false to stop further execution
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const accesstoken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("accesstoken", accesstoken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1800000,
    });

    return true; // Token successfully renewed
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", success: false });
    return false; // Explicitly return false to stop further execution
  }
};

module.exports = verifyToken;
