const { app, BrowserWindow } = require("electron");

let win;

// create a window
function createWindow() {
  // new instance of window
  win = new BrowserWindow({
    width: 1358,
    height: 760,
    backgroundColor: "#FFFFFF",
    icon: `file://${__dirname}/dist/assets/logo-angular.png`,
  });

  console.log(`file://${__dirname}/dist/assets/favicon.ico`)

  win.loadURL(`file://${__dirname}/dist/index.html`);

  // uncomment this line to open devtools
  // win.webContents.openDevTools()

  // Event when the window is closed
  win.on("closed", function () {
    win = null;
  });
}

// create window on electrion initialization
app.on("ready", createWindow);

// Quit when all windows are closed
app.on("window-all-closed", function () {
  // on macOS specific close process
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // on macOS specific close process
  if (win === null) {
    createWindow();
  }
});
