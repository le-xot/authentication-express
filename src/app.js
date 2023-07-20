const express = require("./http.js");
const db = require("./db.js");
const port = 3000;

async function start() {
  console.log("Connected successfully to server");
  express.listen(port, () => {
    console.log(`http://localhost:3000/`);
  });
}
start();
