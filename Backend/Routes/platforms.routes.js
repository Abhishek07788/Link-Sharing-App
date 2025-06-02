const express = require("express");
const Platforms = require("../Schema/platforms.schema");
const app = express.Router();


//------------- bulk post platforms ---------
app.post("/", async (req, res) => {
  const { platforms, user } = req.body;

  try {
    if (!Array.isArray(platforms) || platforms.length > 4) {
      return res.status(400).send({status: false, message: "Invalid request. Maximum 4 platforms allowed."});
    }
    const existingPlatforms = await Platforms.find({ user });

    if (existingPlatforms.length + platforms.length > 4) {
      return res.status(400).send({status: false, message: `Cannot exceed 4 platforms.`});
    }

    // Process each platform
    const results = await Promise.all(platforms.map(async platform => {
      if (platform._id) {
        return Platforms.findByIdAndUpdate(
          platform._id,
          { 
            platform: platform.platform,
            url: platform.url,
            order: platform.order
          },
          { new: true }
        );
      } else {
        return Platforms.create({...platform, user});
      }
    }));

    // Return updated list
    const updatedPlatforms = results.filter(Boolean);

    return res.status(200).send({
      status: true,
      message: "Platforms updated successfully",
      platforms: updatedPlatforms
    });

  } catch (e) {
    console.error("Platform operation error:", e);
    return res.status(500).send({
      status: false,
      message: "Error processing platforms",
      error: e.message
    });
  }
});

// Update GET route to sort by order
app.get("/", async (req, res) => {
  const { user } = req.query;
  try {
    const platforms = await Platforms.find({ user }).sort({ order: 1 });
    res.status(200).send(platforms);
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
