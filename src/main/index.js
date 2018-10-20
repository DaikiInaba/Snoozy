import { app, ipcMain, BrowserWindow } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import { scheduleJob } from 'node-schedule'
import notifier from 'node-notifier'
import configureStore from '../shared/store'

const isDevMode = process.execPath.match(/[\\/]electron/)

let job = null
const createReminder = (store) => {
  const { application, todos } = store.getState()

  if (job != null) {
    job.cancel()
  }

  if (application.isSnoozeOn) {
    job = scheduleJob('* * * * *', () => {
      const date = new Date()
      const message = todos.filter(todo => {
        const interval = parseInt(todo.intervalValue)
        switch (todo.intervalUnit) {
          case 'minutes':
            return date.getMinutes() % interval === 0
          case 'hours':
            return data.getMinutes() === 0 &&
                   date.getHours() % interval === 0
          case 'days':
            return date.getMinutes() === 0 &&
                   date.getHours() === 0 &&
                   date.getDate() % interval === 0
            return false
          default:
        }
      }).map(todo => todo.title).join("\n")

      notifier.notify({
        title: 'Todos',
        message
      })
    })
  }
}

const createStore = () => {
  let state = {}

  const store = configureStore(state, 'main')
  store.subscribe(async () => {
    createReminder(store)
  })

  createReminder(store)
}

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    titleBarStyle: 'hidden',
    resizable: false
  })

  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)

  if (isDevMode) {
    enableLiveReload({ strategy: 'react-hmr' })
    installExtension(REACT_DEVELOPER_TOOLS)
    mainWindow.webContents.openDevTools()
  }
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow == null
  })
}

const start = async () => {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    createMainWindow()
  })

  createStore()
  createMainWindow()
}

app.on('ready', () => {
  start()
})
