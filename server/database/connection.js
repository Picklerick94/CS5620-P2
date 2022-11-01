const {MongoClient} = require('mongodb');
const USERNAME = encodeURIComponent("dbp2");
const PASSWORD = encodeURIComponent("GBKMbJoZDhHcIwO0");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const connectDB = async() => {
  try {
    await client.connect();
    console.log(`MongoDB connected`)
  } catch (err) {
    console.log(err);
  } finally {
     // exit
     await client.close();
  }
}

module.exports = connectDB;