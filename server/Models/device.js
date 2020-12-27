const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  deviceId: String,
  platform: String,
});

module.exports = mongoose.model("Device", DeviceSchema);
