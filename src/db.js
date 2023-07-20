const mongoose = require("mongoose");

const dbName = "authentification-express";

mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const collectionSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
});

const Collection = mongoose.model("Collection", collectionSchema);

async function mongoGetCollection(collectionName) {
  const collection = await Collection.findOne({ collectionName });
  return collection;
}

module.exports = { Collection, mongoGetCollection };
