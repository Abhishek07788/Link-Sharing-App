const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/user.schema");
const app = express.Router();

const JWT_SECRET = "%$#@!";
const SALT_ROUNDS = 10;

// ------------ (Sign Up / Login) --------------
app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const oldUser = await User.findOne({ username: username.toLowerCase().trim() });

    if (oldUser) {
      const isMatch = await bcrypt.compare(password, oldUser.password);
      if (isMatch) {
        const token = jwt.sign(
          {
            id: oldUser._id,
            username: oldUser.username,
            name: oldUser.name,
          },
          JWT_SECRET,
          { expiresIn: "30d" }
        );

        return res.status(200).send({token, status: true, message: "Login Successful!"});
      } else {
        return res.status(200).send({token: null, status: false, message: "Wrong Password!"});
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await User.create({
        name,
        username: username.toLowerCase().trim(),
        password: hashedPassword,
      });

      const token = jwt.sign(
        {
          id: newUser._id,
          name: newUser.name,
          username: newUser.username,
        },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      return res.status(200).send({token, status: true, message: "Registered Successfully!"});
    }
  } catch (e) {
    res.status(500).send({status: false, message: "Something went wrong", error: e.message});
  }
});

//--------- Get user by username --------
app.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password -__v").lean();

    if (!user) {
      return res.status(404).send({status: false, message: "User not found"});
    }
    res.status(200).send({status: true, user, message: "User fetched successfully"});
  } catch (e) {
    res.status(500).send({status: false, message: "Server error", error: e.message,});
  }
});

module.exports = app;
