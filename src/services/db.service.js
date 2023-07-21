const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(
      `mongodb://localhost:27017/authentification-express`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { connectDatabase };
