const jwt = require("jsonwebtoken");
const JWT_SECRET = "SECRET@#2020";

module.exports.verifyJwtToken = (req, res, next) => {
  var token;
  if ("authorization" in req.headers)
    token = req.headers["authorization"].split(" ")[1];

  if (!token)
    return res
      .status(403)
      .send({ auth: false, message: "Dino! Identifie toi pour voir tes amis" });
  else {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error)
        return res
          .status(500)
          .send({ auth: false, message: "Oups!! Dino, réessaye plus tard" });
      else {
        req._id = decoded._id;
        next();
      }
    });
  }
};
