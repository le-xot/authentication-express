const express = require("./http.js");
const mongodb = require("./db.js");
const port = 3000;

async function start() {
  await mongodb.client.connect();
  console.log("Connected successfully to server");
  express.listen(port, () => {
    console.log(`http://localhost:3000/`);
  });
}

start();
