const express = require("express");
const reviewsRoutes = require("./reviews");
const fileRoutes = require("./files/upload");
const productsRouter = require("./products");
const { join } = require("path");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} = require("./lib/errorHandling");


const server = express();
const port = 3077;
const publicFolderPath = join(__dirname, "../public");

server.use(express.json());
server.use(express.static(publicFolderPath));

server.use("/products", productsRouter);
server.use("/reviews", reviewsRoutes);
server.use("/files", fileRoutes);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

server.listen(port, () => {
  console.log("Server running away on port: ", port);
});
