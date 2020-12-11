const express = require("express");
const multer = require("multer");
const { writeFile, createReadStream } = require("fs-extra");
const { join } = require("path");
const { pipeline } = require("stream");

const router = express.Router();

const upload = multer({});

const productsImagePath = join(__dirname, "../../public/img/products");

router.post(
  "/:id/upload",
  upload.single("productImg"),
  async (req, res, next) => {
    console.log(req.params.id);
    console.log(req.file.originalname);
    try {
      await writeFile(
        join(productsImagePath, req.file.originalname),
        req.file.buffer
      );
      res.send("Image uploaded!");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.get("/:name", (res, req, next) => {
  const source = createReadStream(
    join(productsImagePath, `${req.params.name}`)
  );
  pipeline(source, res, (error) => console.log(error));
});
module.exports = router;
