const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendMail: (host, sendermail, senderpassword, receivermail, subject, body) => {
    ipcRenderer.send(
      "notify",
      host,
      sendermail,
      senderpassword,
      receivermail,
      subject,
      body
    );
    return "toto" + host + "gogo";
  },
  createUser: () => {
    ipcRenderer.send("createuser");
  },
  insertUser: (user) => {
    ipcRenderer.send("insertuser", user);
  },
  readUser: () => {
    return ipcRenderer.sendSync("readuser");
  },
  readGroups: () => {
    return ipcRenderer.sendSync("readgroups");
  },
  insertGroup: (group) => {
    ipcRenderer.send("insertgroup", group);
  },
});
