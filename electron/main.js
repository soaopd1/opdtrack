const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const http = require('http');

const isDev = process.env.NODE_ENV === 'development';
let mainWindow;
let serverInstance;

function waitForServer(url, retries = 30) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      http.get(url, (res) => {
        resolve();
      }).on('error', () => {
        if (retries-- > 0) {
          setTimeout(attempt, 500);
        } else {
          reject(new Error('Server did not start'));
        }
      });
    };
    attempt();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 860,
    minWidth: 1100,
    minHeight: 700,
    icon: path.join(__dirname, '../assets/icon.ico'),
    backgroundColor: '#0a0e14',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    title: 'traopd1 - VALORANT Tracker',
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/renderer/index.html'));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(async () => {
  // Start the Valorant API server
  try {
    serverInstance = require('../server/valorant');
    // Give it a moment to bind
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (err) {
    console.error('Failed to start API server:', err);
  }

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
