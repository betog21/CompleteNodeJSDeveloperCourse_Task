const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

//Parse incomming data to json.
app.use(express.json());

//UserRoutes
app.use(userRouter);

//TaskRoutes
app.use(taskRouter);

module.exports = app
