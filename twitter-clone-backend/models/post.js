/* eslint-disable no-undef */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 280,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  retweets: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Post", postSchema);
