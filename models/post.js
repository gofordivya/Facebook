const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  comment: [
    {
      type: String,
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};
