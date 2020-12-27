const config = {
  production: {
    keyFile: process.env.keyFile,
    certFile: process.env.certFile,
    APIkey: process.env.APIkey,
  },
  default: {
    keyFile: "key.pem",
    certFile: "cert.pem",
    APIkey: "AIzaSyA93dRk5HJm0PWRYw3tMNCGyU8nPUMlzRM",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
