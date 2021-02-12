// const { PythonShell } = require("python-shell");
// const pyshell = new PythonShell(`${__dirname}/endpoints.py`);
const fs = require("fs");
const path_database = __dirname + "/databases/database_default.json";

const get = (payload) => {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(path_database);
    resolve(JSON.parse(data));
    // resolve(data);
    // pyshell.send(payload);
    // pyshell.on("message", (message) => resolve(message));

    // pyshell.end((err) => {
    //   if (err) {
    //     reject(err);
    //   }
    // });
  });
};

const post = (payload) => {
  return new Promise((resolve, reject) => {
    resolve(data);
    // pyshell.send(payload);
    // pyshell.on("message", (message) => resolve(message));

    // pyshell.end((err) => {
    //   if (err) {
    //     reject(err);
    //   }
    // });
  });
};

module.exports = {
  get,
  post,
};
