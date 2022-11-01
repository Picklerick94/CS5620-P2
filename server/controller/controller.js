const { MongoClient } = require("mongodb");
const { TwitterApi } = require("twitter-api-v2");
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const DB_NAME = "sample_students";
const COLLECTION_NAME = "studentslists";
// remove this later
const twitterClient = new TwitterApi(
  "AAAAAAAAAAAAAAAAAAAAAKwLiwEAAAAArgUF7g8j%2F3DXjjMxYHXxStwTe1w%3DQIYZjprz85c0w037hSFxMh5RFdBYb4LeV3mPEsf4vgesBhZvGk"
);
const readOnlyClient = twitterClient.readOnly;

// create and save new students
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "student can not be empty" });
    return;
  }

  const user = await readOnlyClient.v2.userByUsername(req.body.twitterAccount);
  const tweetsOfUser = await readOnlyClient.v2.userTimeline(user.data.id, {
    "tweet.fields": ["created_at"],
  });
  const tweetsRaw = tweetsOfUser._realData.data;
  req.body.tweets = tweetsRaw;

  try {
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .insertOne(req.body);
    console.log(`A student was inserted with the _id: ${result.insertedId}`);
    res.sendStatus(200);
  } catch (e) {
    console.log(e.message || "err ocurred while creating student");
    res.sendStatus(500);
  }
};

// find and return all students
exports.find = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "student can not be empty" });
    return;
  }

  try {
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray();
    console.log(`All students found`);
    res.json(result);
  } catch (e) {
    console.log(e.message || "err ocurred while getting student");
  }
};

exports.findOne = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "student can not be empty" });
    return;
  }

  try {
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .find({ _id: ObjectId(req.params.id) })
      .toArray();
    console.log(`Student: ${JSON.stringify(result)}`);
    res.json(result);
  } catch (e) {
    console.log(e.message || "err ocurred while getting student");
  }
};

// Update a student information
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "student can not be empty" });
    return;
  }

  try {
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            name: req.body.name,
            NUID: req.body.NUID,
          },
          $currentDate: { lastModified: true },
        }
      );
    console.log(`Updated student: ${JSON.stringify(result)}`);
    res.sendStatus(200);
  } catch (e) {
    console.log(e.message || "err ocurred while updating student");
  }
};

// Delete a student
exports.delete = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "student can not be empty" });
    return;
  }

  try {
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: ObjectId(req.params.id) });
    console.log(`Delete: ${JSON.stringify(result)}`);
  } catch (e) {
    console.log(e.message || "err ocurred while deleting student");
  }
};

// Get current user
exports.login = async (req, res) => {
  res.json({
    isLoggedIn: !!req.session.user,
    user: req.session.user,
  });
};

// User loggin
exports.authenticate = async (req, res) => {
  const user = req.body;

  try {
    const result = await client
      .db(DB_NAME)
      .collection("usersLists")
      .find({ username: user.username })
      .toArray();
    if (user.password == result[0].password) {
      req.session.user = { user: user.username };
      res.json({ isLoggedIn: true, err: null });
    }
    res.sendStatus(200);
  } catch (e) {
    req.session.user = null;
    res.json({
      isLoggedIn: false,
      err: "Incorrect username password combination",
    });
  }
};

// Search
exports.search = async (req, res) => {
  // validateRequest(req);
  const query = { $text: { $search: req.query.name } };
  console.log(req.query.name);
  try {
    await client.db(DB_NAME).collection(COLLECTION_NAME).createIndex({ name: "text" });

    const result = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .find(query)
      .toArray();
    console.log(`Search result: ${JSON.stringify(result)}`);
    res.json(result);
  } catch (e) {
    console.log(e.message || "err ocurred while getting student");
  }
};

function validateRequest(req) {
  if (!req.body) {
    res.status(400).send({ message: "student can not be empty" });
    return;
  }
}
