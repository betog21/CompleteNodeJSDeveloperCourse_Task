const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Kranky",
  email: "kranky@kranky.com",
  password: "PassKranky1010#",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.SECRETWORD),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Bill",
  email: "Bill@bill.com",
  password: "PassBill1010#",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.SECRETWORD),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Initial task on test",
  completed: false,
  owner: userOneId._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second Initial task on test",
  completed: true,
  owner: userOneId._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third Initial task on test",
  completed: true,
  owner: userTwoId._id,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setUpDatabase,
};
