const express = require("./app.js");
const port = 3000;

async function bootstrap() {
  express.listen(port, () => {
    console.log(`http://localhost:3000/`);
    console.log("Connected successfully to server");
  });
}
bootstrap();
