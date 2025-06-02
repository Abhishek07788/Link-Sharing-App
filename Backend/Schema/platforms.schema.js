const mongoose = require("mongoose");

const platformsSchema = new mongoose.Schema({
  platform: { type: String, required: true },      
  url: { type: String, required: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  order: { type: Number, required: true, default: 1}
}, {
  timestamps: true 
});

platformsSchema.index({ user: 1 });

const Platforms = mongoose.model("Platform", platformsSchema);
module.exports = Platforms;