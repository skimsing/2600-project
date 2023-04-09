const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getStoryById,
  getAllStories,
  getStoriesbyGenre,
  getStoriesbyUser,
  postStory,
  editStory,
} = require("../controllers/storiesController");

const {
  verifyUser
} = require('../controllers/usersController');

router.get("/", getAllStories);

router.route("/:genre")
.get(getStoriesbyGenre);

router.route("/:userid")
.get(getStoriesbyUser)
.post(verifyUser, postStory);

router.route("/:userid/:id")
.get(getStoryById)
.put(verifyUser, editStory);

module.exports = router;
