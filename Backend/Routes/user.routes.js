const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/user.schema");
const app = express.Router();

const JWT_SECRET = "%$#@!";
const SALT_ROUNDS = 10;

// ------------ Register New User --------------
app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ 
      username: username.toLowerCase().trim() 
    });

    if (existingUser) {
      return res.status(400).send({
        status: false, 
        message: "Username already exists"
      });
    }

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

    return res.status(201).send({
      token,
      status: true,
      message: "Registration successful!"
    });

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Registration failed",
      error: e.message
    });
  }
});

// ------------ Login User --------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ 
      username: username.toLowerCase().trim() 
    });

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).send({
        status: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).send({
      token,
      status: true,
      message: "Login successful!"
    });

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Login failed",
      error: e.message
    });
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
