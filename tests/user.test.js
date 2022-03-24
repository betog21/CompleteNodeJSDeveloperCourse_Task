const request = require("supertest");
const app = require("../src/app");

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
