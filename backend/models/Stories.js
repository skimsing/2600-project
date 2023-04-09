const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const { UsersSchema } = require("./Users");
//stories schema stores userID as author reference
const StoriesSchema = new Schema({
  title: {
    type: String,
    maxlength: 250,
    required: true,
  },
  genre: {
    type: String,
    enum: ["fantasy", "mystery", "horror", "romance", "sci-fi", "other"],
    default: "other",
  },
  publishDate: {
    type: Date,
  },
  story: {
    type: String,
    maxlength: 3000,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});
//validation methods
StoriesSchema.statics.isValidGenre = function (genre) {
  if (
    genre === "fantasy" ||
    genre === "mystery" ||
    genre === "horror" ||
    genre === "romance" ||
    genre === "sci-fi" ||
    genre === "other"
  ) {
    return true;
  } else {
    return false;
  }
};
//create model
const Stories = mongoose.model("Stories", StoriesSchema);

//export model + schema
module.exports = {
  Stories,
  StoriesSchema,
};
