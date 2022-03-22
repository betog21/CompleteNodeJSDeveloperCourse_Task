const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const { ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

//Parse incomming data to json.
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.status(202).send(tasks);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (task) {
        res.send(task);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
