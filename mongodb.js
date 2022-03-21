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
    //Insert one example.
    // db.collection("users").insertOne(
    //   {
    //     name: "Andrew",
    //     age: 27,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.error("Error inserting user.", error);
    //     }

    //     console.log(result.ops);
    //   }
    // );

    //Insert many
    // db.collection("users").insertMany(
    //   [
    //     { name: "Jen", age: 28 },
    //     { name: "Gunther", age: 27 },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.error("Error inserting users.", error);
    //     }
    //     console.log(result.ops);
    //   }
    // );

    //Insert Many tasks.
    db.collection("tasks").insertMany(
      [
        { description: "Task 1", completed: true },
        { description: "Task 2", completed: true },
        { description: "Task 3", completed: false },
      ],
      (error, result) => {
        if (error) {
          return console.error("Unable to insert tasks.", error);
        }
        console.log(result.ops);
      }
    );
  }
);
