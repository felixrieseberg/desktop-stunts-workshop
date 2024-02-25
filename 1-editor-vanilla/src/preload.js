const { contextBridge, ipcRenderer } = require("electron");

/**
 * To facilitate communication between the main and renderer processes, we
 * can use the contextBridge module to expose a limited set of APIs to the
 * renderer process.
 *
 * Here, we're adding a new global variable to the window object called
 * __stunts.
 *
 * This file is loaded in the renderer process before any navigation happens
 * and gets to load a limited set of APIs - but more than the window does.
 * For anything fancy, we can send an inter-process message to the main process!
 */
contextBridge.exposeInMainWorld("__stunts", {
  onLoadFile: (callback) => {
    ipcRenderer.on("load-file", (_event, contents) => callback(contents));
  },
  onSaveFile: (callback) => {
    ipcRenderer.on("save-file", (_event) => callback(filePath));
  },
  saveFile: (filePath, contents) => {
    ipcRenderer.invoke("save-file", filePath, contents);
  },
});
