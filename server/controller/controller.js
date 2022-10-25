const {MongoClient} = require('mongodb');
const USERNAME = encodeURIComponent("dbp2");
const PASSWORD = encodeURIComponent("GBKMbJoZDhHcIwO0");
const MONGO_URI= `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.6ud8xet.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(MONGO_URI);

// create and save new students
exports.create = async (req,res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({message: "student can not be empty"});
    return;
  }

  // new student
  const student = {
    name: "Ting",
    NUID: 1234567,
    twitterAccount: "@jastangting",
    tweets: [
      {
        content: "React fiber: In React V15, drop frame happens :( React V16 changed the stack reconciler to fiber reconciler, which is a singly-linked list with fiber nodes, to record prev and next steps. The traverse therefore can be stopped and restarted.",
        timeStamp: Date.now(),
        metDeadline: true
      }
    ]
  }

  try {
    const result = await client.db("sample_students").collection("studentslists").insertOne(student);
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    );
  } catch(e) {
    console.log(e.message || "err ocurred while creating student");
  }
}

// find and return all students
exports.find = (req,res) => {

}