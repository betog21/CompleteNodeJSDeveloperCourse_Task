// CRUD operations.
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dataBaseName = "task-manager";

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.error("Unable to conect to DB.", error);
    }

    const db = client.db(dataBaseName);
    db.collection("users").insertMany([{name:"Me1"},{name:"Me3"}])
      
  }
);
