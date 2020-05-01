const jwt = require("jsonwebtoken");
const config = require("dotenv").config();

function verifyToken(req, res, next) {
  let token =
    req.headers["x-access-token"] || req.body.headers["x-access-token"];
  if (!token) return res.status(401).send("Unauthorized. No token provided.");
  try {
    const verifiedUser = jwt.verify(token, process.env.SECRET);
    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
    return next(new NotAuthorizedError());
  }
}

module.exports = verifyToken;
