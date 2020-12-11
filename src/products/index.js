const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const router = express.Router();

const productsFilePath = path.join(__dirname, "products.json");

const readDatabase = () => {
  const fileAsBuffer = fs.readFileSync(productsFilePath);
  const fileAsAString = fileAsBuffer.toString();
  const productsArray = JSON.parse(fileAsAString);
  return productsArray;
};

router.get("/", (req, res) => {
  const productsArray = readDatabase();

  res.send(productsArray);
});

router.post("/", (req, res) => {
  const newProduct = req.body;
  const productsArray = readDatabase();

  newProduct._id = uniqid();
  newProduct.createdAt = new Date();
  newProduct.updatedAt = new Date();
  productsArray.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(productsArray));
  res.status(201).send(newProduct);
});

router.put("/:id", (req, res) => {
  const productsArray = readDatabase();
  const singleProduct = productsArray.filter(
    (product) => product._id === req.params.id
  );
  const filteredArray = productsArray.filter(
    (product) => product._id !== req.params.id
  );

  const editedProduct = req.body;
  editedProduct._id = singleProduct[0]._id;
  editedProduct.updatedAt = new Date();
  filteredArray.push(editedProduct);

  fs.writeFileSync(productsFilePath, JSON.stringify(filteredArray));
  res.status(201).send(editedProduct);
});

router.delete("/:id", (req, res) => {
  const productsArray = readDatabase();
  const singleProduct = productsArray.filter(
    (product) => product._id === req.params.id
  );
  const filteredArray = productsArray.filter(
    (product) => product._id !== req.params.id
  );

  const deletedProduct = req.body;
  fs.writeFileSync(productsFilePath, JSON.stringify(filteredArray));
  res.status(201).send(filteredArray);
});

module.exports = router;
