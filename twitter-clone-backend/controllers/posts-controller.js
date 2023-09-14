/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
//const natural = require("natural");
const axios = require("axios").default;

const Post = require("../models/post");
const User = require("../models/user");
const UserInteraction = require("../models/userInteration");

const edenNLPKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGNmMzFjNTgtNGRlMC00MDc3LThhZDgtMmJlOWMwN2U4NGVhIiwidHlwZSI6ImFwaV90b2tlbiJ9.eHngTN0AVus2Qh8gUtRRq7T6UYyMdPWM403oVAeijKw";

const endpointUrl = "https://api.edenai.run/v2/text/keyword_extraction";

const config = {
  headers: {
    Authorization: `Bearer ${edenNLPKey}`,
  },
};

const newTweet = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  try {
    const { content, userID } = req.body;

    // const userId = req.userData.userId;

    //check content for keywords present
    let keywords = [];

    const postData = {
      providers: "microsoft",
      text: content,
      language: "en",
    };

    axios
      .post(endpointUrl, postData, config)
      .then(async (response) => {
        // Handle the API response here
        response.data.microsoft.items.map((item) => {
          keywords.push(item.keyword);
        });

        await sortKeywordAndSave(keywords);
        // keywords.push(response.data.microsoft.items.keyword)
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
    const keywordIds = [];
    const sortKeywordAndSave = async (keywords) => {
      try {
        const wordFrequency = {};
        keywords.forEach((word) => {
          if (wordFrequency[word]) {
            wordFrequency[word]++;
          } else {
            wordFrequency[word] = 1;
          }
        });
        const sortedKeywords = Object.keys(wordFrequency).sort(
          (a, b) => wordFrequency[b] - wordFrequency[a]
        );

        // Return the top N keywords (adjust N as needed)
        const topKeywords = sortedKeywords.slice(0, 5); // Extract the top 5 keywords

        // existingKeyword = new Post({ topKeywords: topKeywords });

        // await existingKeyword.save();

        keywordIds.push(topKeywords);
      } catch (err) {
        const error = new HttpError("Error retrieving keywords " + err, 500);
        return next(error);
      }
      passToNewTweet(keywordIds);
    };
    const passToNewTweet = async (keywordIds) => {
      let mediaFile;
      let mediaType;

      if (req.files && req.files["media"]) {
        mediaFile = req.files["media"][0].buffer; // Contains the uploaded file data
        mediaType = mediaFile.mimetype;
      } else {
        // Handle the case when media is not provided
        mediaFile = null;
        mediaType = null;
      }
      // Extract uploaded media files and determine their types (images or videos)

      // const media = mediaFiles.map((file) => ({
      //   data: file.buffer, // Store the file data in the database
      //   contentType: file.mimetype, // Store the content type (e.g., image/jpeg, video/mp4)
      // }));
      console.log(mediaFile);
      const newPost = new Post({
        user: userID,
        content: content,
        mediaType: mediaType,
        media: mediaFile,
        keywords: keywordIds,
      });

      try {
        await newPost.save();
      } catch (err) {
        const error = new HttpError("Error Saving keywords", 500);
        return next(error);
      }

      res.status(201).json({ message: "Tweet created successfully" });
    };
  } catch (err) {
    const error = new HttpError("Error Creating tweet", 500);
    return next(error);
  }
};

const listNewsFeed = async (req, res, next) => {
  const userID = req.params.uid;
  existingUser = await User.findOne({ _id: userID });
  try {
    const userLikedPosts = await Post.find({ likes: userID }).exec();

    const document = userLikedPosts.flatMap((post) => post.keywords);

    const keywordTexts = document.map((keyword) =>
      Object.values(keyword).filter((value) => typeof value === "string")
    );

    const keywordValues = keywordTexts
      .flat()
      .filter((value) => !["weight", "timestamp", "_id"].includes(value));

    const userKeywords = [...new Set(keywordValues)];

    const relatedPosts = await Post.find({
      keywords: {
        $elemMatch: {
          $in: userKeywords.map((keyword) => new RegExp(keyword, "i")), // Case-insensitive search
        },
      },
      _id: { $nin: userLikedPosts.map((post) => post._id) },
    })
      .populate("comments.postedBy", "_id name")
      .populate("user", "_id name")
      .sort("-timestamp")
      .exec();

    // let posts = await Post.find({})
    //   .populate("comments.postedBy", "_id name")
    //   .populate("user", "_id name")
    //   .sort("-timestamp")
    //   .exec();
    res.json({ posts: relatedPosts, user: existingUser });
  } catch (err) {
    const error = new HttpError("Error listing new posts " + err, 500);
    return next(error);
  }
};

const comment = async (req, res, next) => {
  const { content, userID, postID } = req.body;

  try {
    const post = await Post.findById(postID);

    if (!post) {
      const error = new HttpError("Post not found", 404);
      return next(error);
    }
    const newComment = {
      content: content,
      postedBy: userID,
    };
    post.comments.push(newComment);

    // Save the updated Post document
    const result = await post.save();
    res.json(result);
  } catch (err) {
    const error = new HttpError("Error making comments " + err, 400);
    return next(error);
  }
};

const listComments = async (req, res, next) => {
  const postID = req.params.pid;

  try {
    let posts = await Post.find({ _id: postID })
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
          model: "User",
        },
        options: { sort: { created: -1 } },
      })
      .exec();
    res.json(posts[0].comments);
    console.log(posts[0].comments);
  } catch (err) {
    const error = new HttpError("Error listing comments " + err, 400);
    return next(error);
  }
};

const likePost = async (req, res) => {
  const { postCreator, postID } = req.body;
  const userID = postCreator;
  try {
    await Post.findByIdAndUpdate(
      postID,
      { $push: { likes: userID } },
      { new: true }
    );

    const like = new UserInteraction({
      user: userID,
      tweet: postID,
      interactionType: "likes",
    });

    await like.save();
    res.json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while liking the post" });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    await Like.deleteOne({ user: req.user.id, post: postId });
    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    console.error("Error unliking post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while unliking the post" });
  }
};

// Get likes for a post
const getLikesForPost = async (req, res) => {
  const postID = req.params.pid;

  try {
    const likes = await Post.findById(postID).populate("likes", "_id name");
    res.json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ message: "An error occurred while fetching likes" });
  }
};

exports.newTweet = newTweet;
exports.comment = comment;
exports.listNewsFeed = listNewsFeed;
exports.listComments = listComments;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.getLikesForPost = getLikesForPost;
