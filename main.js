const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let win

function createWindow() {
	// Creates browser window
	win = new BrowserWindow({width:1500, height:1000});

	// load index.html of app
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol:'file:',
    slashes:true
  }));

  // emitted when window is closed.
  win.on('closed',function(){
    win = null;
  });
}

app.on('ready', createWindow)

app.on('windows-all-closed', function() {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function(){
  if(win===null) {
    createWindow();
  }
})