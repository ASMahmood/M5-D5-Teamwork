const express = require("express");

const server = express();
const port = 3077;

server.listen(port, () => {
  console.log("Server running away on port: ", port);
});
