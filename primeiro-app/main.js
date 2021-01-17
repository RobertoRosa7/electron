const { app, BrowserWindow, Notification } = require("electron");
const fs = require("fs");
const root = fs.readdirSync("./");
const S3 = require("aws-sdk/clients/s3");

// console.log(S3); // show all methods and service from nodes
// console.log(root); // print all list dir

// create a window
function createWindow() {
  // new instance of window
  let win = new BrowserWindow({
    width: 1368,
    height: 768,
    backgroundColor: "#FFFFFF",
    icon: `file://${__dirname}/dist/assets/logo-angular.png`,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // console.log(`file://${__dirname}/dist/assets/favicon.ico`)

  win.loadURL(`file://${__dirname}/dist/index.html`);

  // uncomment this line to open devtools
  // win.webContents.openDevTools()

  // Event when the window is closed
  win.on("closed", function () {
    win = null;
  });

  // win.setProgressBar(0.5); // set progress bar on icon dock
}

// create a new notification
function createNotification() {
  const notification = {
    title: "Bem vindo(a) ao Primeiro App",
    body: "Seu aplicativo foi inicializado com sucesso.",
  };
  new Notification(notification).show();
}

// create window on electrion initialization
// app.on("ready", createWindow);
app.whenReady().then(createWindow).then(createNotification);

// Quit when all windows are closed
app.on("window-all-closed", () => {
  // on macOS specific close process
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// BUG - app.setUserTasks is not a function
// app.setUserTasks([
//   {
//     program: process.execPath,
//     arguments: "--new-window",
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: "New Window",
//     description: "Create a new window",
//   }
// ]);

// app.on("activate", function () {
//   // on macOS specific close process
//   if (win === null) {
//     createWindow();
//   }
// });
