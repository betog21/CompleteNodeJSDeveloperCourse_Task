const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const { ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

//Parse incomming data to json.
app.use(express.json());

//UserRoutes
app.use(userRouter);

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(202).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.send(task);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  try {
    if (!isValidOperation) {
      return res
        .status(400)
        .send({ error: "No properties allowed to update." });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      return res.send(task);
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
