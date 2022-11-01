const { MongoClient } = require('mongodb');

const USERNAME = encodeURIComponent("dbp2");
const PASSWORD = encodeURIComponent("GBKMbJoZDhHcIwO0");
const MONGO_URI= `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.6ud8xet.mongodb.net/?retryWrites=true&w=majority`;

const uri = process.env.MONGO_URI || MONGO_URI;
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