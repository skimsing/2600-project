const { Stories } = require("../models/Stories");
const { Users } = require("../models/Users");

exports.getStoryById = async (req, res) => {
  try {
    const results = await Stories.findOne({ _id: req.params.id }).exec();
    res.status(200).send(results);
  } catch {
    (error) => {
      res.status(500).error("couldn't find story", error);
    };
  }
};
exports.getAllStories = async (req, res) => {
  try {
    const results = await Stories.find({}).exec();
    res.status(200).send(results);
  } catch {
    (error) => {
      res.status(500).error("couldn't find story", error);
    };
  }
};
exports.getStoriesbyGenre = async (req, res, next) => {
  try {
    const parsed = req.params.genre.toLowerCase()
    const isValid = Stories.isValidGenre(parsed)
    const getAll = await Stories.find({}).exec();
    if (!isValid) {
      res.status(200).send(getAll);
    } else {
      const results = await Stories.find({ genre: parsed })
        .select("story title genre")
        .exec();
      if(!results) res.status(200).send(getAll) 
      else res.status(200).send(results);
    }
  } catch {
    (error) => {
      res.status(500).error("couldn't find story", error);
    };
  }
};
exports.getStoriesbyUser = async (req, res) => {
  try {
    const foundStories = await Stories.find({
      author: req.params.userid,
    }).exec();
    if (!foundStories)
      res.status(200).send({ message: "couldn't find requested author" });
    else res.status(200).send(foundStories);
  } catch {
    (error) => {
      res.status(500).error("couldn't find stories by author", error);
    };
  }
};
exports.postStory = async (req, res) => {
  try {
    if (!req.body.story || !req.body.title)
      res.status(200).json({ message: "these fields can't be blank!" });
    else {
      const results = await Users.findOne({ _id: req.params.userid })
        .select("username _id")
        .exec();
      if (!results) res.status(200).send({ message: "no user found" });
      else {
        const parsed = req.body.genre.toLowerCase()
        const checkGenre = Stories.isValidGenre(parsed)
          ? parsed
          : "other";
        const newStory = new Stories({
          title: req.body.title,
          genre: checkGenre,
          publishDate: Date.now(),
          story: req.body.story,
          author: results.id,
        });
        newStory.save();
        const resObj = {
          url: `stories/${results.id}/${newStory._id}`,
          data: newStory,
        };
        res.set("content-location", `stories/${results.id}/${newStory._id}`);
        res.status(201).send(resObj);
      }
    }
  } catch {
    (error) => {
      res.status(500).error("couldn't post story", error);
    };
  }
};

exports.editStory = async (req, res) => {
  try {
    const foundUser = await Users.findOne({ _id: req.params.userid })
      .select("username _id")
      .exec();
    if (!foundUser) res.status(200).send("user was not found");
    else {
      const parsed = req.body.genre.toLowerCase()
        const checkGenre = Stories.isValidGenre(parsed)
          ? parsed
          : "other";
      const updateStory = {
        title: req.body.title,
        genre: checkGenre,
        story: req.body.story,
      };
      const results = await Stories.findOneAndUpdate(
        { _id: req.params.id },
        updateStory,
        { new: true }
      ).exec();
      if (results) {
        res.status(200).send(results);
      } else res.status(200).send("error updating story");
    }
  } catch (error) {
    res.status(500).error("couldn't update story", error);
  }
};
