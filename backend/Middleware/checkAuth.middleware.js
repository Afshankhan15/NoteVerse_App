const jwt = require("jsonwebtoken");

const secret_key = process.env.JWT_SECRET; // Replace with your actual secret key

const authenticateJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]; // Get the token from the request headers

  if (!token) {
    return handleErrorResponse(res, 401, "Unauthorized - Missing token", null);
  }

  let decode; // Define a variable to store the decoded token

  try {
    decode = jwt.verify(token, secret_key); // Verify and store the decoded token
  } catch (err) {
    return handleErrorResponse(res, 401, "Unauthorized - Invalid token", null);
  }

  // if everything is ok means ---->>> token === valid && user === authorized

  req.user = decode; // Attach decoded user information to the request object
  next(); // Continue to the next middleware or route handler
};

module.exports = authenticateJWT;
