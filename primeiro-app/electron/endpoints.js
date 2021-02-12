const { PythonShell } = require("python-shell");
const pyshell = new PythonShell(`${__dirname}/teste.py`);

const getRegisters = (messageFromAngular) => {
  return new Promise((resolve) => {
    pyshell.send(messageFromAngular);
    pyshell.on("message", (message) => resolve(message));

    pyshell.end((err) => {
      if (err) {
        throw err;
      }
    });
  });
};

module.exports = {
  get_registers: getRegisters,
};
