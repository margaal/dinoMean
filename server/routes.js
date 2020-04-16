const express = require("express");
const router = express.Router();
const jwtHelper = require("./config/jwtHelper");
const dinosaure = require("./controllers/dinosaureController");

router.post("/auth/login", dinosaure.login);
router.get("/dino", jwtHelper.verifyJwtToken, dinosaure.index);
router.get("/dino/friends/:id", jwtHelper.verifyJwtToken, dinosaure.myfreinds);
router.post("/auth/signup", dinosaure.register);
router.get("/dino/:id", jwtHelper.verifyJwtToken, dinosaure.show);
router.put("/dino/:id", jwtHelper.verifyJwtToken, dinosaure.update);
router.delete("/dino/:id", jwtHelper.verifyJwtToken, dinosaure.delete);
router.put(
  "/dino/addfriend/:id",
  jwtHelper.verifyJwtToken,
  dinosaure.addFriend
);
router.put(
  "/dino/removefriend/:id",
  jwtHelper.verifyJwtToken,
  dinosaure.removeFriend
);

module.exports = router;
