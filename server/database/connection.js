const {MongoClient} = require('mongodb');
const USERNAME = encodeURIComponent("dbp2");
const PASSWORD = encodeURIComponent("GBKMbJoZDhHcIwO0");
const MONGO_URI= `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.6ud8xet.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(MONGO_URI);

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