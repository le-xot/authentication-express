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
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    throw error;
  }
}

module.exports = { connectDatabase };
