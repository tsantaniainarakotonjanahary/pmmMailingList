const { app, BrowserWindow, ipcMain, Notification } = require("electron");
var Datastore = require("nedb"),
  datastore = new Datastore({ filename: "database.db", autoload: true });

const path = require("path");
const isDev = require("electron-is-dev");

require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on(
  "send",
  (_, host, sendermail, senderpassword, receivermail, subject, body) => {
    send(host, sendermail, senderpassword, receivermail, subject, body);
  }
);

ipcMain.on("insertgroup", (event, group) => {
  datastore.insert(
    {
      type: group.type,
      groupName: group.groupName,
      emails: group.emails,
    },
    function (err, newrec) {}
  );
});

ipcMain.on("insertuser", (event, user) => {
  datastore.insert(
    {
      type: user.type,
      host: user.host,
      sendermail: user.sendermail,
      senderpassword: user.senderpassword,
    },
    function (err, newrec) {}
  );
});

ipcMain.on("readuser", (event, args) => {
  datastore.findOne({ type: "user" }, function (err, docs) {
    if (err) event.returnValue = err.message;
    console.log("----------");
    console.log(docs);
    console.log("----------");
    if (docs) event.returnValue = docs;
  });
});

ipcMain.on("readgroups", (event, args) => {
  datastore.find({ type: "group" }, function (err, docs) {
    event.returnValue = docs;
  });
});

function send(host, sendermail, senderpassword, receivermail, subject, body) {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false,
    auth: {
      user: sendermail,
      pass: senderpassword,
    },
  });

  transporter.sendMail(
    {
      from: sendermail,
      to: receivermail,
      subject: subject,
      html: body,
    },
    function (err, info) {
      if (err)
        new Notification({
          title: "PMM Mailing List",
          body: "Verifier votre adresse et mot de passe",
        }).show();
      else
        new Notification({
          title: "PMM Mailing List",
          body: "Email Envoyé",
        }).show();
    }
  );
}
