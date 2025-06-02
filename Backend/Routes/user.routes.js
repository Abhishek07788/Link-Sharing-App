const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Schema/user.schema");
const CryptoJS = require("crypto-js");
const app = express.Router();


// ------------ (Sign Up) --------------
app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      //decrypt password using cryptoJS -----------------
      const decryptPass = CryptoJS.AES.decrypt(oldUser.password, "%$#@!");
      const loginPassword = decryptPass.toString(CryptoJS.enc.Utf8);

      if (password === loginPassword) {
        // --- jwt ------
        const token = jwt.sign(
          {
            id: oldUser._id,
            username: oldUser.username,
            name: oldUser.name,
          },
          "%$#@!",
          { expiresIn: "30 days" }
        );

        return res.status(200).send({
          token: token,
          status: true,
          message: "Register Successfully!",
        });
      } else {
        return res.status(200).send({
          token: null,
          status: false,
          message: "Wrong Password!!",
        });
      }
    } else {
      const newUser = await User.create({
        name: name,
        username: username.toLowerCase().trim(), 
        password: CryptoJS.AES.encrypt(password, "%$#@!").toString(),
      });

      const token = jwt.sign(
        {
          id: newUser._id, 
          name: newUser.name,
          username: newUser.username,
        },
        "%$#@!",
        { expiresIn: "30 days" }
      );
      return res.status(200).send({
        token: token,
        status: true,
        message: "New Register Successfully!",
      });
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

//--------- get by user name --------
app.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password -__v") .lean(); 
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).send({
      status: true,
      user: user
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Server error",
      error: e.message
    });
  }
});

module.exports = app;
