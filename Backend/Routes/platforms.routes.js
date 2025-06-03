const express = require("express");
const Platforms = require("../Schema/platforms.schema");
const app = express.Router();
const NUMBER_OF_PLATFORMS = 5;

//----- bulk platform platforms ---------
app.post("/", async (req, res) => {
  const { platforms, user } = req.body;

  try {
    if (!Array.isArray(platforms) || platforms.length > NUMBER_OF_PLATFORMS) {
      return res.status(400).send({
        status: false, 
        message: `Maximum ${NUMBER_OF_PLATFORMS} platforms allowed.`
      });
    }

    // Get user's existing platforms
    const existingPlatforms = await Platforms.find({ user });

    // Check duplicates within submitted platforms
    const duplicatesInNew = platforms.reduce((acc, platform, index) => {
      const duplicates = platforms.filter((p, i) => i !== index && p.platform === platform.platform);
      if (duplicates.length > 0) {
        acc.push(platform.platform);
      }
      return acc;
    }, []);

    // Check duplicates with user's existing platforms
    const duplicatesWithStored = platforms.reduce((acc, newPlatform) => {
      const duplicates = existingPlatforms.filter(existingPlatform => 
        existingPlatform.platform === newPlatform.platform && 
        existingPlatform._id.toString() !== newPlatform._id
      );
      if (duplicates.length > 0) {
        acc.push(newPlatform.platform);
      }
      return acc;
    }, []);

    // If duplicates found, return error with platform names
    if (duplicatesInNew.length > 0 || duplicatesWithStored.length > 0) {
      return res.status(400).send({
        status: false,
        message: `Duplicate platforms found`
      });
    }

    // Check total platforms limit
    const newPlatforms = platforms.filter(p => !p._id);
    if (existingPlatforms.length + newPlatforms.length > NUMBER_OF_PLATFORMS) {
      return res.status(400).send({
        status: false,
        message: `Cannot exceed ${NUMBER_OF_PLATFORMS} platforms.`
      });
    }

    // Process platform updates
    const results = await Promise.all(platforms.map(async platform => {
      if (platform._id) {
        return Platforms.findOneAndUpdate(
          { _id: platform._id, user },
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

// GET all platforms by user
app.get("/", async (req, res) => {
  const { user } = req.query;
  try {
    const platforms = await Platforms.find({ user }).sort({ order: 1 });
    res.status(200).send(platforms);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// ---- delete platform --------
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
