const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    const json = await user.toJSON();
    res.status(201).send({ user: json, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    const json = await user.toJSON();
    res.send({ user: json, token });
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  return res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  try {
    if (!isValidOperation) {
      return res
        .status(400)
        .send({ error: "No properties allowed to update." });
    }

    const { user } = req;
    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    const json = await user.toJSON();
    return res.send({ user: json });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

const upload = multer({
  dest: "avatars",
});

router.post("/user/me/avatar", upload.single("avatar"), (req, res) => {
  try {
    res.send();
  } catch (error) {
    console.log("Error on request avatar.");
    console.error(error);
  }
});

module.exports = router;
