// CRUD operations.

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const dataBaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.error("Unable to conect to DB.", error);
    }

    const db = client.db(dataBaseName);
    db.collection("users").insertOne({
      name: "Andrew",
      age: 27,
    });
    console.log('Inserted.');
  }
);
