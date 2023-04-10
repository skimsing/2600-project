const express = require("express");
const router = express.Router({ mergeParams: true });
//controllers
const {
  newUser,
  loginUser,
  getUserDetails,
  editUser,
  getUser,
  verifyUser,
} = require("../controllers/usersController");
// const { getStoriesbyUser } = require("../controllers/storiesController");
//routes
// router.route("/:id").get(verifyUser, getStoriesbyUser);
// .get(verifyUser, getUserDetails)

router.post("/login", loginUser);

router
  .route("/")
  .get(verifyUser, getUser)
  .put(verifyUser, editUser)
  .post(newUser);

module.exports = router;
