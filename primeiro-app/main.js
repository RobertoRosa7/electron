const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const createWindow = require("./electron/window/window");
const createNotification = require("./electron/notification/notification");
const { get_registers } = require("./electron/endpoints");

const fs = require("fs");
const root = fs.readdirSync("./");
const S3 = require("aws-sdk/clients/s3");

// console.log(S3); // show all methods and service from nodes
// console.log(root); // print all list dir

// app.on("ready", createWindow);
app.whenReady().then(createWindow).then(createNotification);

ipcMain.on("ping", (event, messageFromAngular) => {
  console.log("this is a message from Angular: ", messageFromAngular);
  get_registers(messageFromAngular).then((registers) =>
    event.sender.send("pong", registers)
  );
});

// ipcRenderer.send('ping', 'This is a message to Angular')

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
