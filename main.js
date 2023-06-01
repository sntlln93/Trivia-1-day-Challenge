const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const createWelcomeWindow = () => {
  const welcomeWindow = new BrowserWindow({
    frame: false,
    fullscreen: true,
    // height: 1080,
    // width: 1080 / 2,
    // x: 0,
    // y: 0,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  welcomeWindow.setAspectRatio(9 / 16);

  if (isDev) {
    // welcomeWindow.webContents.openDevTools();
  } else {
    welcomeWindow.setAlwaysOnTop(true, 'screen');
  }

  welcomeWindow.loadFile('renderer/index.html');
};

app.whenReady().then(() => {
  createWelcomeWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWelcomeWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

/**
 * Writes a file into filesystem
 */
ipcMain.on('ping-good', (event, { name, content }) => {
  const writeStream = fs.createWriteStream(name);
  writeStream.write(content);
  writeStream.end();
});
