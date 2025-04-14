const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');

// 🔥 Hot reload en dev
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    awaitWriteFinish: true,
  });
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

// 🔥 Ecoute l'événement venant de React
// ipcMain.on('save-client-data', (event, data) => {
//   const filePath = path.join(__dirname, 'clientData.json');

//   try {
//     const existingData = fs.existsSync(filePath)
//       ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
//       : [];
//     existingData.push(data);
//     fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
//     console.log('✅ Données enregistrées avec succès !');
//   } catch (err) {
//     console.error('Erreur lors de l\'enregistrement des données :', err);
//   }
// });


