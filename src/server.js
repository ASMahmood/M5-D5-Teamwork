const express = require("express");
const { join } = require("path");
const productsRouter = require("./products");

const server = express();
const port = 3077;

const publicFolderPath = join(__dirname, "../public");

server.use(express.json());
server.use(express.static(publicFolderPath));

server.use("/products", productsRouter);

server.listen(port, () => {
  console.log("Server running away on port: ", port);
});
