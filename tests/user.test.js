const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Kranky",
  email: "kranky@kranky.com",
  password: "PassKranky1010#",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Franky",
      email: "franky@franky.com",
      password: "PassFranky1010#",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Shoul not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: "BadPassword" })
    .expect(500);
});
