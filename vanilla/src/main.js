const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  dialog,
} = require("electron");
const path = require("path");
const fs = require("fs/promises");

let browserWindow;
let filePath;

function createWindow() {
  browserWindow = new BrowserWindow({
    width: 300,
    height: 480,
    vibrancy: "popover",
    visualEffectState: "active",
    titleBarStyle: "customButtonsOnHover",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    alwaysOnTop: true,
  });

  browserWindow.loadFile(path.join(__dirname, "index.html"));
}

function createMenu() {
  const menu = Menu.buildFromTemplate([
    { role: "appMenu" },
    { role: "fileMenu" },
    { role: "editMenu" },
    { role: "viewMenu" },
    { role: "windowMenu" },
    { role: "helpMenu" },
  ]);

  menu.items[1].submenu.append(
    new MenuItem({
      label: "Open File...",
      accelerator: "CmdOrCtrl+O",
      click: async () => {
        const { filePaths } = await dialog.showOpenDialog({
          properties: ["openFile"],
        });

        if (filePaths.length > 0) {
          loadFile(filePaths[0]);
        }
      },
    }),
  );

  menu.items[1].submenu.append(
    new MenuItem({
      label: "Save File...",
      accelerator: "CmdOrCtrl+S",
      click: async () => {
        const result = await dialog.showSaveDialog({
          defaultPath: filePath,
        });

        if (result.filePath) {
          browserWindow.webContents.send("save-file", result.filePath);
        }
      },
    }),
  );

  Menu.setApplicationMenu(menu);
}

async function loadFile(newFilePath) {
  filePath = newFilePath;
  const contents = await fs.readFile(filePath, "utf-8");

  if (!browserWindow) {
    createWindow();
  }

  browserWindow.webContents.send("load-file", contents);
  app.addRecentDocument(filePath);
}

/**
 * Event handlers
 */

ipcMain.handle("save-file", async (_event, filePath, contents) => {
  await fs.writeFile(filePath, contents);
});

app.on("ready", () => {
  createWindow();
  createMenu();
});

app.on("activate", () => {
  if (!browserWindow || browserWindow.isDestroyed()) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("open-file", (_event, filePath) => {
  loadFile(filePath);
});
