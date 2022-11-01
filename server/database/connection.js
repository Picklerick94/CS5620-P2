const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

const connectDB = async() => {
  try {
    await client.connect();
    console.log(`MongoDB connected`)
  } catch (err) {
    console.log(err);
  } finally {
     await client.close();
  }
}

module.exports = connectDB;