const express = require("express");
const reviewsRoutes = require("./reviews");

const server = express();
const port = 3077;

server.use(express.json());
server.use("/reviews", reviewsRoutes);

server.listen(port, () => {
  console.log("Server running away on port: ", port);
});
