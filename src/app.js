const express = require("./http.js");
const { mongoGetCollection } = require("./db.js");
const port = 3000;

async function start() {
  await mongoGetCollection();
  console.log("Connected successfully to server");
  express.listen(port, () => {
    console.log(`http://localhost:3000/`);
  });
}

start();
