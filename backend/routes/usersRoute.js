const express = require("express");
const router = express.Router({ mergeParams: true });
//controllers
const {
  newUser,
  loginUser,
  editUser,
  getUser,
  verifyUser,
  checkUsername
} = require("../controllers/usersController");

//routes
router.route("/:username").get(checkUsername);

router.post("/login", loginUser);

router
  .route("/")
  .get(verifyUser, getUser)
  .put(verifyUser, editUser)
  .post(newUser);

module.exports = router;
