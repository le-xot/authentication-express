const express = require("./app.js");
const { connectDatabase } = require("./services/db.service.js");
const port = 3000;

async function bootstrap() {
  try {
    await connectDatabase();
    express.listen(port, () => {
      console.log(`http://localhost:3000/`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
