const express = require("express");
const Platforms = require("../Schema/platforms.schema");
const app = express.Router();

//------------- post platform ---------
app.post("/", async (req, res) => {
  const { platform, url, user } = req.body;
  try {
    const existingPlatform = await Platforms.findOne({platform, user});
    if (existingPlatform) {
      return res.status(400).send({ message: "Platform already exists for this user!" });
    }
    const newPlatform = await Platforms.create({platform, url, user,});
    return res.status(201).send({
      message: "Platform added successfully",
      platform: newPlatform,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//--------- get platforms --------
app.get("/", async (req, res) => {
  const { user } = req.query;
  try {
    const platforms = await Platforms.find({ user }).sort({ createdAt: -1 })
      .populate("user", "name email");
    res.status(200).send(platforms);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//--------- update platform --------
app.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { url, platform } = req.body;
  try {
    const updatedPlatform = await Platforms.findByIdAndUpdate(
      id,
      { $set: { url, platform } },
      { new: true }
    );

    if (!updatedPlatform) {
      return res.status(404).send({ message: "Platform not found" });
    }

    res.status(200).send({
      message: "Platform updated successfully",
      platform: updatedPlatform,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//--------- delete platform --------
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlatform = await Platforms.findByIdAndDelete(id);

    if (!deletedPlatform) {
      return res.status(404).send({ message: "Platform not found" });
    }

    res.status(200).send({ message: "Platform deleted successfully" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = app;
