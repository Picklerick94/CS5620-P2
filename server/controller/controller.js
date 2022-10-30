const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const USERNAME = encodeURIComponent("dbp2");
const PASSWORD = encodeURIComponent("GBKMbJoZDhHcIwO0");
const MONGO_URI= `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.6ud8xet.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(MONGO_URI);
const DB_NAME = "sample_students";
const COLLECTION_NAME = "studentslists";

// create and save new students
exports.create = async (req,res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({message: "student can not be empty"});
    return;
  }

  try {
    const result = await client.db(DB_NAME).collection(COLLECTION_NAME).insertOne(req.body);
    console.log(
      `A student was inserted with the _id: ${result.insertedId}`,
    );
    res.sendStatus(200);
  } catch(e) {
    console.log(e.message || "err ocurred while creating student");
  }
}

// find and return all students
exports.find = async (req,res) => {
    // validate request
    if (!req.body) {
      res.status(400).send({message: "student can not be empty"});
      return;
    }

    try {
      const result = await client.db(DB_NAME).collection(COLLECTION_NAME).find({}) .toArray();
      console.log(
        `All students: ${JSON.stringify(result)}`,
      );
      res.json(result);
    } catch(e) {
      console.log(e.message || "err ocurred while getting student");
    }
}

// Update a student information
exports.update = async (req,res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({message: "student can not be empty"});
    return;
  }

  console.log(typeof req.params.id);
  console.log(req.body.name);

  try {
    const result = await client.db(DB_NAME).collection(COLLECTION_NAME).updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          twitterAccount: req.body.twitterAccount
        },
        $currentDate: { lastModified: true }
      }
    );
    console.log(
      `Updated student: ${JSON.stringify(result)}`,
    );
    res.sendStatus(200);
  } catch(e) {
    console.log(e.message || "err ocurred while updating student");
  }
}

// Delete a student
exports.delete = async (req,res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({message: "student can not be empty"});
    return;
  }

  try {
    const result = await client.db(DB_NAME).collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(req.params.id) });
    console.log(
      `Delete: ${JSON.stringify(result)}`,
    );
  } catch(e) {
    console.log(e.message || "err ocurred while deleting student");
  }
}