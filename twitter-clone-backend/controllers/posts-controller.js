/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
//const natural = require("natural");
const axios = require("axios").default;

const Post = require("../models/post");

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
        const error = new HttpError("Error retrieving keywords", 500);
        return next(error);
      }
      passToNewTweet(keywordIds);
    };
    const passToNewTweet = async (keywordIds) => {
      // Extract uploaded media files and determine their types (images or videos)
      console.log(req.files["media"][0]);
      const mediaFile = req.files["media"][0]; // Contains the uploaded file data
      const mediaType = mediaFile.mimetype;

      // const media = mediaFiles.map((file) => ({
      //   data: file.buffer, // Store the file data in the database
      //   contentType: file.mimetype, // Store the content type (e.g., image/jpeg, video/mp4)
      // }));
      console.log(mediaFile);
      const newPost = new Post({
        user: userID,
        content: content,
        mediaType: mediaType,
        media: mediaFile.buffer,
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

exports.newTweet = newTweet;
