const express = require("./app.js");
const { connectDatabase } = require("./server/db.service.js");
const { client } = require("./server/redis.service.js");
const port = 3000;

async function bootstrap() {
  try {
    await connectDatabase();
    express.listen(port);
  } catch (error) {
    console.log(error);
  }
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
  console.log(`http://localhost:3000/`);
}

bootstrap();
