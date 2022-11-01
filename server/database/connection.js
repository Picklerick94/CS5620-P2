const {MongoClient} = require('mongodb');
const uri = process.env.MONGODB_URI;
console.log(uri)
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