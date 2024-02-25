# Desktop Stunts Workshop: Vanilla JavaScript

This is the finished product of the first step of my workshop, "Building Desktop Software & Silly Desktop Stunts". It's meant to showcase the most basic way to use Electron by not using any dependencies besides Electron itself.

To try out this example, run the following commands:

```sh
# Clone repo
git clone https://github.com/felixrieseberg/desktop-stunts-editor-vanilla
cd desktop-stunts-editor-vanilla

# Install dependencies
npm install

# Run
npm start
```

Let's take a quick look at the files:

- `package.json` defines that `npm start` should execute `electron .`, which will take a look at the package.json's `main` script to finally run `electron src/main.js`.
- `src/main.js` is the entry script and executed by Electron's main process. It creates a new `BrowserWindow`, and with it, a new renderer process.
- `src/preload.js` is the preload script that's executed inside the renderer process [with slightly more powers than a normal website](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload).
- `src/index.html` is the HTML we're loading in that BrowserWindow.
- `src/renderer.js` is the JavaScript loaded by the HTML file. It uses the API defined in the preload script to do things.
