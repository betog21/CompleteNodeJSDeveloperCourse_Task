const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const { ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

//Parse incomming data to json.
app.use(express.json());

//UserRoutes
app.use(userRouter);

//TaskRoutes
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
