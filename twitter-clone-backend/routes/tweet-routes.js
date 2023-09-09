/* eslint-disable no-undef */
const express = require("express");
const { check } = require("express-validator");
const postsController = require("../controllers/posts-controller");
// const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.post(
  "/new",
  fileUpload.single("media"),
  //   checkAuth,
  [
    check("content")
      .trim()
      .isString()
      .withMessage("Content must be a string")
      .isLength({ max: 280 }),
  ],
  postsController.newTweet
);

module.exports = router;
