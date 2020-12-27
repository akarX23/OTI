const express = require("express");
const router = express.Router();
const Device = require("../Models/device");
const { sendAndroid, sendIOS } = require("../HelperFunctions/allFunctions");

router.post("/registerDevice", (req, res) => {
  let body = req.body;

  if (body) {
    Device.findOne({ deviceId: body.deviceId }, (err, device) => {
      if (err) {
        return res.send(500).json({ success: false });
      }

      if (!device) {
        let newDevice = new Device(body);
        newDevice.save((err) => {
          if (!err) {
            return res.send(200).json({ success: true });
          } else {
            return res.send(500).json({ success: false });
          }
        });
      } else {
        return res.send(500).json({ success: false, cloned: true });
      }
    });
  }
});

router.get("/sendToDevices", (req, res) => {
  Device.find((err, devices) => {
    if (!err && devices) {
      let androidDevices = [];
      devices.forEach((device) => {
        if (device.platform === "ios") {
          sendIOS(device.deviceId, req.body);
        } else if (device.platform === "android") {
          androidDevices.push(device.deviceId);
        }
      });
      sendAndroid(androidDevices, req.body);
      return res.send(200).json({ success: true });
    } else {
      return res.send(500).json({ success: false });
    }
  });
});
