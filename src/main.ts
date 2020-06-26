import {app, BrowserWindow} from 'electron';
import * as path from 'path';
let mainWindow: Electron.BrowserWindow;
/**
 *
 */
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        preload: path.join(__dirname, '../dist/preload.js'),
    },
    width: 800,
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../html/index.html'));
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
app.on('ready', ()=>{
    createWindow();
    // 隐藏菜单栏
    const { Menu } = require('electron');
    Menu.setApplicationMenu(null);
    // hide menu for Mac 
    if (process.platform == 'darwin') {
        app.dock.hide();
    }
})
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

//通知
// const notification = {
//     title: 'Basic Notification',
//     body: 'Short message part'
//   }
  
//   const notificationButton = document.getElementById('basic-noti')
  
//   notificationButton.addEventListener('click', () => {
//     const myNotification = new window.Notification(notification.title, notification)
  
//     myNotification.onclick = () => {
//       console.log('Notification clicked')
//     }
//   })