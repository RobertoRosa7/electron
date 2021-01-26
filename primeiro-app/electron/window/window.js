const { BrowserWindow, Tray } = require("electron");
const menu = require("../menu/menu");

const windowSettings = {
  width: 800,
  height: 600,
  backgroundColor: "#FAFAFA",
  name: "Primeiro App",
  icon: `${__dirname}/../../dist/assets/logo-angular.png`,
  webPreferences: {
    nodeIntegration: true,
  },
};

module.exports = function createDefaultWindow() {
  // new instance of window
  let win = new BrowserWindow(windowSettings);

  // console.log(`file://${__dirname}/dist/assets/favicon.ico`)

  win.loadURL(`file://${__dirname}/../../dist/index.html`);
  // win.loadURL("http://localhost:4200");

  // menu statusbar
  // menu();
  win.setMenu(null)

  // uncomment this line to open devtools
  win.webContents.openDevTools()

  // system tray - mini icon on system tray
  new Tray(`${__dirname}/../../dist/assets/logo-angular.png`);

  // Event when the window is closed
  win.on("closed", () => (win = null));

  // win.setProgressBar(0.5); // set progress bar on icon dock
};
