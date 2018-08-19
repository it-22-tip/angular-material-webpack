import webpack from 'webpack'
import WebpackServe from 'webpack-serve'
import config from './dev.config'
async function devServer() : Promise<void> {
  let server
  const compiler = webpack(config)
  const options = {
    compiler: compiler,
    port: 9080,
    logLevel: 'debug',
    hotClient: {
      validTargets: ['web'],
      logLevel: 'debug'
    },
    devMiddleware: {
      logLevel: 'debug'
    }
  }
  server = await WebpackServe({}, options)
  return server
}

export default devServer
