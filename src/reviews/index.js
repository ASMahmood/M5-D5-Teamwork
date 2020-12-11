const express = require("express");
const path = require("path");
const uniqid = require("uniqid");
const { check, validationResult } = require("express-validator");
const { readDB, writeDB } = require("../lib/utilities");
const router = express.Router();

const reviewsFilePath = path.join(__dirname, "reviews.json");

router.get("/", async (req, res, next) => {
  try {
    const reviewsDataBase = await readDB(reviewsFilePath);
    res.status(201).send(reviewsDataBase);
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const reviewsDataBase = await readDB(reviewsFilePath);
    const selectedReview = reviewsDataBase.filter(
      (review) => review._id === req.params.id
    );
    if (selectedReview.length > 0) {
      res.status(201).send(selectedReview);
    } else {
      throw new Error(error);
    }
    res.status(201).send(reviewsDataBase);
  } catch (error) {
    throw new Error(error);
  }
});

router.post(
  "/",
  [
    check("comment").exists().withMessage("You need to give a comment!"),
    check("rate")
      .isInt({ min: 1, max: 5 })
      .withMessage("You need to give a rating between 1 and 5!"),
    check("productID")
      .exists()
      .withMessage(
        "You need to provide the ID of the product you're reviewing"
      ),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors);
    } else {
      const reviewsDataBase = await readDB(reviewsFilePath);
      const newReview = req.body;
      newReview._id = uniqid();
      newReview.createdAt = new Date();
      reviewsDataBase.push(newReview);
      await writeDB(reviewsFilePath, reviewsDataBase);
      res.status(201).send(reviewsDataBase);
    }
  }
);

module.exports = router;
