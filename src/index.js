const express = require("./app.js");
const mongoose = require("mongoose");
const db = require("./services/db.service.js");

const port = 3000;
async function bootstrap() {
  try {
    await mongoose.connect(
      `mongodb://localhost:27017/authentification-express`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    express.listen(port, () => {
      console.log(`http://localhost:3000/`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
