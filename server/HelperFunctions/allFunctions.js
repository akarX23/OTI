const config = require("../config");
const apns = require("apns");
const gcm = require("node-gcm");

const options = {
  keyFile: config.keyFile,
  certFile: config.certFile,
  debug: true,
  gateway: "gateway.sandbox.push.apple.com",
  errorCallback: function (num, err) {
    console.error(err);
  },
};

export const sendIOS = (deviceId, output) => {
  let connection = new apns.Connection(options);

  let notification = new apns.Notification();
  notification.device = new apns.Device(deviceId);
  notification.alert = output.title;

  connection.sendNotification(notification);
};

export const sendAndroid = (deviceIds, output) => {
  let message = new gcm.Message({
    notification: {
      title: output.title,
    },
  });

  let sender = new gcm.sender(config.APIkey);

  sender.send(
    message,
    {
      registrationTokens: deviceIds,
    },
    function (err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(response);
      }
    }
  );
};
