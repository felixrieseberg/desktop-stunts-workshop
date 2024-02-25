# Desktop Stunts Workshop

This repository contains the finished example for my desktop
app workshop. There are two directories - a `vanilla` folder
that only uses `electron` and a `forge` folder that makes use
of `electron-forge` to make the cross-platform packaging,
bundling, and updating of our example app easier.

The actual example app is the same in both folders.

## Running the examples

```sh
# Clone repo
git clone https://github.com/felixrieseberg/desktop-stunts-editor-vanilla
cd desktop-stunts-editor-vanilla

# Pick a demo
cd 1-editor-vanilla
# cd 2-editor-forge
# cd 3-clippy

# Install dependencies
npm install

# Run
npm start
```

Let's take a quick look at the files, which are largely identical in both folders:

- `src/main.js` is the entry script and executed by Electron's main process. It creates a new `BrowserWindow`, and with it, a new renderer process. In the `electron-forge` example, it also
  registers handlers for the built-in auto-updater and installer.
- `src/preload.js` is the preload script that's executed inside the renderer process [with slightly more powers than a normal website](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload).
- `src/index.html` is the HTML we're loading in that BrowserWindow.
- `src/renderer.js` is the JavaScript loaded by the HTML file. It uses the API defined in the preload script to do things.

## License

MIT
