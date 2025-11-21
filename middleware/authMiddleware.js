const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // 1. Check for token in Headers: Authorization: Bearer [Token]
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract Token
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attach User ID to the request object
      req.user = { id: decoded.id };

      next(); // Move to the next function (the protected route)
    } catch (error) {
      console.error("Token verification failed", error);
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  // If no Token is present
  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

module.exports = protect;