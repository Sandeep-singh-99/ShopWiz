const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.accesstoken;
  console.log("Request cookies: ", req.cookies);
  if (!accessToken) {
    const renewed = await renewToken(req, res);
    if (renewed) {
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const renewed = await renewToken(req, res);
      if (renewed) {
        return next();
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized", success: false });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  }
};

const renewToken = async (req, res) => {
  const refreshToken = req.cookies.refreshtoken;

  if (!refreshToken) {
    return false;
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("accesstoken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1800000,
    });

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = verifyToken;
