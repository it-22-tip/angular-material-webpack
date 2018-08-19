import devServer from './dev.server'

const init = async function f() : Promise<void> {
  try {
    await devServer()
  } catch (error) {
    console.log(error)
  }
}

init()
