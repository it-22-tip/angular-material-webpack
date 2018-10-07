import webpack from 'webpack'
import path from 'path'
import { mainConfig } from './main.config'
import electron from 'electron'
import { spawn } from 'child_process'
// import { electronLog, logStats } from '../consoleLogger'
import {
  /* MainPath, */
  OutputPath
} from './constant'
// import Promise from 'bluebird'

let electronProcess = null
let manualRestart = false

function startMain () {
  return new Promise((resolve) => {
    // mainConfig.entry.main = [path.join(MainPath, 'index.dev.js')].concat(mainConfig.entry.main)
    const compiler = webpack(mainConfig)
    compiler.hooks.watchRun.tapAsync(
      'watch-run-plugins',
      (compilation, done) => {
        done()
      }
    )
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      // logStats('Main', stats)

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}

function startElectron () {
  let env = Object.create(process.env)
  env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
  env.IS_DEVELOPMENT = true
  electronProcess = spawn(`${electron}`, ['--inspect=5858', path.join(OutputPath, 'main.js')], { env: env })

  /* electronProcess.stdout.on('data', data => {
    electronLog(data, 'green')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'yellow')
  }) */
  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

async function mainServer () {
  if (electronProcess !== null) return
  await startMain()
  startElectron()
}

export default mainServer
