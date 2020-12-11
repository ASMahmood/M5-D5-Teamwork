const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("get request route is working!");
  res.send("it works!");
});

module.exports = router;
